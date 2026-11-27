import { load } from 'cheerio';

const FADAS = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' };
const HEADER = /^(title|slug|date|standfirst)\s*:\s*(.*)$/i;
const META = /^(caption|paragraph|cover)\s*:\s*(.*)$/i;
const HEADING_LINE = /^heading\s*:\s*(.*)$/i;

export function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[áéíóú]/g, (char) => FADAS[char])
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseColumnDate(value) {
  const trimmed = value.trim();
  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) {
    return validDate(Number(iso[1]), Number(iso[2]), Number(iso[3]));
  }
  const dmy = trimmed.match(/^(\d{1,2})[./](\d{1,2})[./](\d{4})$/);
  if (dmy) {
    return validDate(Number(dmy[3]), Number(dmy[2]), Number(dmy[1]));
  }
  return null;
}

function validDate(year, month, day) {
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year
    || date.getUTCMonth() !== month - 1
    || date.getUTCDate() !== day
  ) {
    return null;
  }
  return date;
}

function headerField(line) {
  const match = line.match(HEADER);
  if (!match) return null;
  return { field: match[1].toLowerCase(), value: match[2].trim() };
}

function metaField(line) {
  const match = line.match(META);
  if (!match) return null;
  const key = match[1].toLowerCase();
  if (key === 'paragraph' || key === 'cover') {
    const value = match[2].trim().toLowerCase();
    if (value !== 'true' && value !== 'false') return null;
    return { field: key, value: value === 'true' };
  }
  return { field: 'caption', value: match[2].trim() };
}

function cleanParagraph(value) {
  const collapsed = value
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return collapsed.replace(/([^\n])\n(?!\n)/g, '$1  \n');
}

function wrapMarker(marker, value) {
  const core = value.trim();
  if (!core) return value;
  const lead = value.match(/^\s*/)[0];
  const trail = value.match(/\s*$/)[0];
  return `${lead}${marker}${core}${marker}${trail}`;
}

function nodeToMarkdown($, node) {
  if (node.type === 'text') return (node.data || '').replace(/\u00a0/g, ' ');
  if (node.type !== 'tag') return '';
  const name = node.name.toLowerCase();
  if (name === 'br') return '\n';
  if (name === 'img') return '';
  const inner = elementToMarkdown($, $(node));
  if (name === 'strong' || name === 'b') return wrapMarker('**', inner);
  if (name === 'em' || name === 'i') return wrapMarker('*', inner);
  if (name === 'a') {
    const href = $(node).attr('href') || '';
    const label = inner.trim();
    if (!label) return '';
    if (!/^(https?:|mailto:)/i.test(href)) return inner;
    return `[${label}](${href})`;
  }
  return inner;
}

function elementToMarkdown($, el) {
  let out = '';
  el.contents().each((_, node) => {
    out += nodeToMarkdown($, node);
  });
  return out;
}

function plainLines(el) {
  const html = el.html() || '';
  return html
    .split(/<br\s*\/?>/i)
    .map((part) => load(`<div>${part}</div>`)('div').text().replace(/\u00a0/g, ' ').trim())
    .filter(Boolean);
}

function plainLinesFromNodes($, nodes) {
  let raw = '';
  nodes.forEach((node) => {
    if (node.type === 'text') raw += node.data || '';
    else if (node.type === 'tag' && node.name === 'br') raw += '\n';
    else if (node.type === 'tag') raw += $(node).text();
  });
  return raw
    .replace(/\u00a0/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function parseColumnHtml(html) {
  const $ = load(html);
  const fields = { title: '', slug: '', standfirst: '', date: '' };
  const blocks = [];
  let headerOpen = true;
  let pendingHeading = '';

  const consumeHeader = (lines) => {
    if (!headerOpen || !lines.length || !lines.every((line) => headerField(line))) return false;
    lines.forEach((line) => {
      const header = headerField(line);
      fields[header.field] = header.value;
    });
    return true;
  };

  const attachMeta = (lines, markdown) => {
    const last = blocks[blocks.length - 1];
    if (!last || last.type !== 'image') return false;
    if (!lines.length || !lines.every((line) => metaField(line))) return false;
    const formatted = String(markdown || '')
      .replace(/\u00a0/g, ' ')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    lines.forEach((line, index) => {
      const meta = metaField(line);
      if (meta.field !== 'caption') {
        last[meta.field] = meta.value;
        return;
      }
      const formattedMeta = formatted[index] ? metaField(formatted[index]) : null;
      last.caption = formattedMeta ? formattedMeta.value : meta.value;
    });
    return true;
  };

  const pushText = (lines, markdown, isHeading) => {
    if (!lines.length && !markdown) return;
    if (consumeHeader(lines)) return;
    headerOpen = false;
    if (attachMeta(lines, markdown)) return;
    const text = cleanParagraph(markdown);
    if (!text) return;
    if (!isHeading && lines.length === 1) {
      const headingLine = lines[0].match(HEADING_LINE);
      if (headingLine && headingLine[1].trim()) {
        holdHeading(headingLine[1].trim());
        return;
      }
    }
    if (isHeading) holdHeading(text);
    else pushBody(text);
  };

  const holdHeading = (heading) => {
    if (pendingHeading) blocks.push({ type: 'paragraph', heading: pendingHeading });
    pendingHeading = heading;
  };

  const pushBody = (text) => {
    const block = pendingHeading
      ? { type: 'paragraph', heading: pendingHeading, text }
      : { type: 'paragraph', text };
    pendingHeading = '';
    blocks.push(block);
  };

  const handleImage = (element) => {
    headerOpen = false;
    const src = $(element).attr('src') || '';
    const match = src.match(/^pending:(\d+)$/);
    if (!match) return;
    blocks.push({
      type: 'image',
      index: Number(match[1]),
      caption: '',
      paragraph: true,
    });
  };

  const handleTextElement = (el, isHeading) => {
    const lines = plainLines(el);
    if (!lines.length) return;
    pushText(lines, elementToMarkdown($, el), isHeading);
  };

  const handleMixed = (el, isHeading) => {
    const runs = [];
    let textNodes = [];
    const flushText = () => {
      if (!textNodes.length) return;
      const nodes = textNodes;
      textNodes = [];
      const markdown = nodes.map((node) => nodeToMarkdown($, node)).join('');
      const lines = plainLinesFromNodes($, nodes);
      if (lines.length || cleanParagraph(markdown)) {
        runs.push({ kind: 'text', lines, markdown });
      }
    };

    el.contents().each((_, node) => {
      const containsImage = node.type === 'tag' && (node.name === 'img' || $(node).find('img').length);
      if (!containsImage) {
        textNodes.push(node);
        return;
      }
      flushText();
      if (node.name === 'img') runs.push({ kind: 'image', node });
      else $(node).find('img').each((__, img) => runs.push({ kind: 'image', node: img }));
    });
    flushText();

    const headingFor = (index) => index === 0 && runs.length === 1 && runs[0].kind === 'text' && isHeading;
    runs.forEach((run, index) => {
      if (run.kind === 'image') handleImage(run.node);
      else pushText(run.lines, run.markdown, headingFor(index));
    });
  };

  const walkElement = (element) => {
    if (!element || element.type !== 'tag') return;
    const name = element.name.toLowerCase();
    const el = $(element);

    if (name === 'img') {
      handleImage(element);
      return;
    }

    if (name === 'ul' || name === 'ol') {
      headerOpen = false;
      const items = [];
      el.children('li').each((_, li) => {
        const text = cleanParagraph(elementToMarkdown($, $(li)));
        if (!text) return;
        items.push(name === 'ol' ? `${items.length + 1}. ${text}` : `- ${text}`);
      });
      if (items.length) pushBody(items.join('\n'));
      return;
    }

    if (name === 'table') {
      headerOpen = false;
      el.find('tr').each((_, tr) => {
        const cells = [];
        $(tr).children('th, td').each((__, cell) => {
          const text = cleanParagraph(elementToMarkdown($, $(cell)));
          if (text) cells.push(text);
        });
        if (cells.length) pushBody(cells.join(' — '));
      });
      return;
    }

    if (name === 'p' || /^h[1-6]$/.test(name) || name === 'blockquote' || name === 'div') {
      const isHeading = /^h[1-6]$/.test(name);
      if (el.find('img').length) handleMixed(el, isHeading);
      else handleTextElement(el, isHeading);
      return;
    }

    el.children().each((_, child) => walkElement(child));
  };

  $('body').children().each((_, child) => walkElement(child));
  if (pendingHeading) blocks.push({ type: 'paragraph', heading: pendingHeading });

  return { fields, blocks };
}
