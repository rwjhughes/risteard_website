import ColumnMeta from '@/components/column-meta';
import Footer from '@/components/footer.js';
import Navbar from '@/components/navbar.js';
import { getColumnList } from '@/lib/columns';
import { coverImage, formatColumnMonthYear, plainCaption } from '@/lib/format-date';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/Colun.module.css';
import useTranslation from 'next-translate/useTranslation';

export async function getStaticProps() {
  const columns = await getColumnList();
  return { props: { columns }, revalidate: 60 };
}

export default function ColunIndex({ columns }) {
  const shareImage = columns.map(coverImage).find((image) => image?.ogUrl || image?.url);
  const { t } = useTranslation('common');
  return (
    <div>
      <ColumnMeta
        title="Lón Machnaimh — Risteárd Ó hAodha"
        description={t('column_subtitle')}
        path="/writing/lon-machnaimh"
        image={shareImage}
      />
      <Navbar />
      <div className={styles.container}>
        <Link href="/writing" className={styles.back}>← {t('writing')}</Link>
        <h1 className={styles.heading}>Lón Machnaimh</h1>
        <p className={styles.intro}>{t('column_subtitle')}</p>
        <div className={styles.list}>
          {columns.map((column) => {
            const cover = coverImage(column);
            return (
              <Link
                key={column.slug}
                href={`/writing/lon-machnaimh/${column.slug}`}
                className={cover?.url ? styles.card : styles.cardText}
              >
                {cover?.url ? (
                  <div className={styles.thumb}>
                    <Image
                      src={cover.url}
                      alt={plainCaption(cover.caption) || column.title}
                      fill
                      sizes="(max-width: 700px) 92vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                ) : null}
                <div>
                  <p className={styles.cardTitle}>{column.title}</p>
                  <p className={styles.cardDate}>{formatColumnMonthYear(column.publishedAt, t)}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
