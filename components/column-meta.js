import { plainCaption } from '@/lib/format-date';
import Head from 'next/head';

export const SITE_URL = 'https://risteard.ie';
const SITE_NAME = 'Risteárd Ó hAodha';

function jsonLdScript(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export default function ColumnMeta({ title, description, path, image, publishedAt }) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image?.ogUrl || image?.url || '';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': publishedAt ? 'Article' : 'CollectionPage',
    headline: title,
    name: title,
    description,
    inLanguage: publishedAt ? 'ga' : undefined,
    url,
    mainEntityOfPage: url,
    author: publishedAt
      ? { '@type': 'Person', name: SITE_NAME, url: SITE_URL }
      : undefined,
    publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
    datePublished: publishedAt || undefined,
    image: imageUrl ? [imageUrl] : undefined,
  };

  return (
    <Head>
      <title>{title}</title>
      <meta key="description" name="description" content={description} />
      <link key="canonical" rel="canonical" href={url} />
      <meta key="og:type" property="og:type" content={publishedAt ? 'article' : 'website'} />
      <meta key="og:locale" property="og:locale" content="ga_IE" />
      <meta key="og:site_name" property="og:site_name" content={SITE_NAME} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:url" property="og:url" content={url} />
      {imageUrl ? <meta key="og:image" property="og:image" content={imageUrl} /> : null}
      {image?.ogWidth ? (
        <meta key="og:image:width" property="og:image:width" content={String(image.ogWidth)} />
      ) : null}
      {image?.ogHeight ? (
        <meta key="og:image:height" property="og:image:height" content={String(image.ogHeight)} />
      ) : null}
      {image?.caption ? <meta key="og:image:alt" property="og:image:alt" content={plainCaption(image.caption)} /> : null}
      {imageUrl ? <meta key="og:image:type" property="og:image:type" content="image/jpeg" /> : null}
      {publishedAt ? (
        <meta key="article:published_time" property="article:published_time" content={publishedAt} />
      ) : null}
      <meta
        key="twitter:card"
        name="twitter:card"
        content={imageUrl ? 'summary_large_image' : 'summary'}
      />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      {imageUrl ? <meta key="twitter:image" name="twitter:image" content={imageUrl} /> : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
    </Head>
  );
}
