import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import sharp from 'sharp';
import { MongoClient } from 'mongodb';
import { put } from '@vercel/blob';
import { parseColumnDate, parseColumnHtml, slugify } from './parse-column-html.mjs';

const usage = `Usage: npm run import-column -- [--dry-run] path/to/column.docx

The Google Doc starts with these lines, then the column:

  title: Cuan Mó
  slug: cuan-mo
  date: 2026-11-01
  standfirst: Abairt amháin do Google agus do na meáin shóisialta.

slug is optional. date can also be 01/11/2026.
Lines under an image can be:

  caption: Roonagh, 2024
  cover: true
  paragraph: false

cover: true uses the image on the index. paragraph: false keeps it out of the article. If cover is omitted, the first image is the cover. paragraph defaults to true. Italics in the caption are kept. The caption is also the image alt text, without the italics.

A Heading style, or a line on its own, becomes the paragraph heading:

  heading: Condae Mhaigh Eo

Download the Doc as Microsoft Word (.docx).
.env.local needs MONGODB_URI and BLOB_READ_WRITE_TOKEN.
MONGODB_DB defaults to risteard. Columns are stored in the columns collection.
--dry-run prints the document and does not upload or write.`;


const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const filePath = args.find((arg) => !arg.startsWith('--'));

if (!filePath) {
  console.error(usage);
  process.exit(1);
}

const resolved = path.resolve(filePath);
if (!fs.existsSync(resolved)) {
  console.error(`File not found: ${resolved}`);
  process.exit(1);
}

const images = [];
let nextImage = 0;
const result = await mammoth.convertToHtml({ path: resolved }, {
  convertImage: mammoth.images.imgElement(async (image) => {
    const index = nextImage;
    nextImage += 1;
    const buffer = Buffer.from(await image.read());
    images[index] = { buffer, contentType: image.contentType };
    return { src: `pending:${index}` };
  }),
});

result.messages.forEach((message) => {
  console.error(`docx: ${message.message}`);
});

const { fields, blocks } = parseColumnHtml(result.value);
const missing = [];
if (!fields.title) missing.push('title');
if (!fields.standfirst) missing.push('standfirst');
if (!fields.date) missing.push('date');
if (missing.length) {
  console.error(`Missing ${missing.join(', ')} at the top of the document.`);
  process.exit(1);
}

const publishedAt = parseColumnDate(fields.date);
if (!publishedAt) {
  console.error(`Could not read date "${fields.date}". Use 2026-11-01 or 01/11/2026.`);
  process.exit(1);
}

const slug = slugify(fields.slug || fields.title);
if (!slug) {
  console.error('Slug is empty after removing spaces and fadas.');
  process.exit(1);
}

const warnings = [];
if (!fields.slug) warnings.push(`Slug generated from the title: ${slug}`);
else if (slugify(fields.slug) !== fields.slug.trim()) warnings.push(`Slug saved as ${slug}`);

blocks.forEach((block) => {
  if (block.type === 'image' && !images[block.index]) {
    console.error(`Image ${block.index + 1} was missing from the document.`);
    process.exit(1);
  }
});

async function prepareImage(buffer, label) {
  try {
    const pipeline = sharp(buffer, { failOn: 'none' }).rotate();
    const display = await pipeline
      .clone()
      .resize({ width: 2400, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();
    const og = await pipeline
      .clone()
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer();
    const displayMeta = await sharp(display).metadata();
    const ogMeta = await sharp(og).metadata();
    return {
      display,
      og,
      width: displayMeta.width,
      height: displayMeta.height,
      ogWidth: ogMeta.width,
      ogHeight: ogMeta.height,
    };
  } catch (error) {
    throw new Error(`Could not read ${label}. Use a JPEG or PNG in the document. ${error.message}`);
  }
}

async function uploadImage(name, buffer) {
  const blob = await put(`colun/${slug}/${name}.jpg`, buffer, {
    access: 'public',
    contentType: 'image/jpeg',
    addRandomSuffix: false,
    allowOverwrite: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}

if (!dryRun && (!process.env.MONGODB_URI || !process.env.BLOB_READ_WRITE_TOKEN)) {
  console.error('Add MONGODB_URI and BLOB_READ_WRITE_TOKEN to .env.local before importing.');
  process.exit(1);
}

let coverMarked = false;
let imageNumber = 0;
const body = [];

for (const block of blocks) {
  if (block.type === 'paragraph') {
    body.push(block);
    continue;
  }

  imageNumber += 1;
  const label = `image ${imageNumber}`;
  const prepared = await prepareImage(images[block.index].buffer, label);
  const name = String(imageNumber).padStart(2, '0');
  const url = dryRun ? `dry-run://${slug}/${name}.jpg` : await uploadImage(name, prepared.display);
  const isCover = typeof block.cover === 'boolean' ? block.cover : !coverMarked;
  const image = {
    type: 'image',
    url,
    width: prepared.width,
    height: prepared.height,
    cover: isCover,
    paragraph: block.paragraph !== false,
  };
  if (block.caption) image.caption = block.caption;
  if (isCover && !coverMarked) {
    image.ogUrl = dryRun ? `dry-run://${slug}/og.jpg` : await uploadImage('og', prepared.og);
    image.ogWidth = prepared.ogWidth;
    image.ogHeight = prepared.ogHeight;
    coverMarked = true;
  }
  body.push(image);
}

const doc = {
  slug,
  title: fields.title,
  standfirst: fields.standfirst,
  publishedAt,
  body,
  updatedAt: new Date(),
};

warnings.forEach((warning) => console.error(warning));

if (dryRun) {
  console.log(JSON.stringify(doc, null, 2));
  process.exit(0);
}

const client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
try {
  await client.connect();
  const dbName = process.env.MONGODB_DB || 'risteard_website';
  const collection = client.db(dbName).collection('columns');
  await collection.createIndex({ slug: 1 }, { unique: true });
  await collection.createIndex({ publishedAt: -1 });
  await collection.updateOne(
    { slug },
    {
      $set: doc,
      $setOnInsert: { createdAt: new Date() },
      $unset: { cover: '', description: '' },
    },
    { upsert: true },
  );
  console.log(`Imported ${slug}`);
  console.log(`https://risteard.ie/colun/${slug}`);
} finally {
  await client.close();
}
