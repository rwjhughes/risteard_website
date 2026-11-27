export function coverImage(column) {
  return column.body?.find((block) => block.type === 'image' && block.cover) || null;
}

export function plainCaption(value) {
  if (!value) return '';
  return value.replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1');
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatColumnDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

export function formatColumnMonthYear(iso, t) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return `${t(MONTHS[date.getUTCMonth()])} ${date.getUTCFullYear()}`;
}
