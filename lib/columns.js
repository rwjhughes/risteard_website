import { getColumnsCollection, mongoConfigured } from './mongodb';

function serializeColumn(doc) {
  return {
    slug: doc.slug,
    title: doc.title,
    standfirst: doc.standfirst || '',
    publishedAt: doc.publishedAt instanceof Date
      ? doc.publishedAt.toISOString()
      : doc.publishedAt || '',
    body: Array.isArray(doc.body) ? doc.body : [],
  };
}

export async function getColumnList() {
  if (!mongoConfigured()) return [];
  const collection = await getColumnsCollection();
  const docs = await collection
    .find({}, {
      projection: {
        title: 1,
        slug: 1,
        standfirst: 1,
        publishedAt: 1,
        body: { $elemMatch: { cover: true } },
      },
    })
    .sort({ publishedAt: -1, title: 1 })
    .toArray();
  return docs.map((doc) => serializeColumn(doc));
}

export async function getColumn(slug) {
  if (!mongoConfigured()) return null;
  const collection = await getColumnsCollection();
  const doc = await collection.findOne({ slug });
  if (!doc) return null;
  return serializeColumn(doc);
}
