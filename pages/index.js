import Enter from '@/components/enter.js';
import ImageSynth from '@/components/imageSynth.js';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';


export default function Home() {
  let router = useRouter();
  let { t } = useTranslation();

  const activeStyle = {
    border: 'rgb(181, 181, 181) inset 1px',
    backgroundColor: router.locale === 'en' ? '#000066' : '#0e442f',
    color: 'rgba(255, 255, 255, 0.5)',
  };

  return (
    <div >
      <Head>
        <title>{('Risteárd Ó hAodha')}</title>
        <meta name="Risteárd Ó hAodha" content="Index" />
      </Head>
      <div className={styles.indexContainer}>
        <div className={styles.indexBox}>
          <div className={styles.indexTitle}>
            Risteárd Ó hAodha
            <div className={styles.locales}>
              {router.locales.map(locale => (
                <li key={locale}>
                  <Link href={router.asPath} className={locale}
                    style={router.locale === locale ? activeStyle : {}}
                    locale={locale}>
                    {locale}
                  </Link>
                </li>
              ))}
            </div>
          </div>
          <div className={styles.indexBody}>
            <div className={styles.info}>
              <div className={styles.infoBody}>
                <li>{t("index:composition")}</li>
                <li>{t("index:piano")}</li>
                <li>{t("index:cello")}</li>
                <li>{t("index:multimedia")}</li>
                <li>{t("index:research")}</li>
                <li>{t("index:coding")}</li>
              </div>
              <div className={styles.location}>{t("index:location")}</div>
            </div>
            <div className={styles.pages}>
              <li>
                <Link href="/research">
                  {t("common:research")}
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  {t("common:projects")}
                </Link>
              </li>
              <li>
                <Link href="/agenda">
                  {t("common:agenda")}
                </Link>
              </li>
              <li>
                <Link href="/about">
                  {t("common:about")}
                </Link>
              </li>
            </div>
          </div>
          <div className={styles.socials}>
            <Link href="https://twitter.com/richiohey" className="tw" target="_blank">
              TW
            </Link>
            <Link href="https://instagram.com/richiohey" className="ig" target="_blank">
              IG
            </Link>
            <Link href="https://youtube.com/user/rwjh2010" className="yt" target="_blank">
              YT
            </Link>
            <Link href="https://soundcloud.com/richiohey" className="sc" target="_blank">
              SC
            </Link>
            <Link href="mailto:richard@hughes.ie" className="email" target="_blank">
              {t("common:email")}
            </Link>
          </div>
        </div>
        <ImageSynth />
      </div>
    </div>
  );
}
