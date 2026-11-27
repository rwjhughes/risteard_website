import ColumnBody from '@/components/column-body';
import ColumnMeta from '@/components/column-meta';
import Footer from '@/components/footer.js';
import Navbar from '@/components/navbar.js';
import { getColumn, getColumnList } from '@/lib/columns';
import { coverImage, formatColumnDate } from '@/lib/format-date';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import styles from '../../../styles/Colun.module.css';

export async function getStaticPaths() {
  try {
    const columns = await getColumnList();
    return {
      paths: columns.map((column) => ({ params: { columnSlug: column.slug } })),
      fallback: 'blocking',
    };
  } catch (error) {
    console.error(error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  const column = await getColumn(params.columnSlug);
  if (!column) return { notFound: true, revalidate: 60 };
  return { props: { column }, revalidate: 60 };
}

export default function ColumnPage({ column }) {
  const { t } = useTranslation('common');

  return (
    <div>
      <ColumnMeta
        title={`${column.title} — Lón Machnaimh`}
        description={column.standfirst}
        path={`/writing/lon-machnaimh/${column.slug}`}
        image={coverImage(column)}
        publishedAt={column.publishedAt}
      />
      <Navbar />
      <article className={styles.article} lang="ga">
        <Link href="/writing/lon-machnaimh" className={styles.back}>← Lón Machnaimh</Link>
        <h1 className={styles.title}>{column.title}</h1>
        <p className={styles.date}>{formatColumnDate(column.publishedAt)}</p>
        {column.standfirst ? <p className={styles.standfirst}>{column.standfirst}</p> : null}
        <ColumnBody body={column.body} />
      </article>
      <Footer />
    </div>
  );
}
