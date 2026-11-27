import Footer from '@/components/footer.js';
import Navbar from '@/components/navbar.js';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Colun.module.css';

const writings = [
    // {
    //     title: "",
    //     year: "",
    //     subtitleen: "",
    //     subtitlega: "",
    //     href: "",
    //     image: "",
    // },
    {
        title: "Lón Machnaimh",
        year: "2026",
        subtitleen: "Monthly column in the Mayo News",
        subtitlega: "Colún míosúil sa Mayo News",
        href: "/writing/lon-machnaimh",
        image: "/images/lon_machnaimh.jpg",
    },
    {
        title: "Ecognosis",
        year: "2022",
        subtitleen: "Ecological Awareness in Multimedia Composition",
        subtitlega: "Ecological Awareness in Multimedia Composition",
        href: "/research",
        image: "/images/atlantic.gif",
        external: true,
    },
    {
        title: "My relationship to music changes with my relationship to the world",
        year: "2022",
        subtitleen: "The Promise of Music",
        subtitlega: "The Promise of Music",
        href: "https://koncon-pull-prod.b-cdn.net/media/TPOM-prefaceintro.pdf",
        image: "/images/promise.jpg",
        external: true,
    },
];

export default function WritingIndex() {
    const { t } = useTranslation('common');
    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{`${t('writing')} | Risteárd Ó hAodha`}</title>
                <meta name="description" content={t('writing')} />
            </Head>
            <Navbar />
            <h1 className={styles.heading}>{t('writing')}</h1>
            <div className={styles.list}>
                {writings.map((writing) => (
                    <Link
                        key={writing.href}
                        href={writing.href}
                        className={styles.card}
                        target={writing.external ? '_blank' : undefined}
                        rel={writing.external ? 'noreferrer' : undefined}
                    >
                        <div className={styles.thumb}>
                            <Image
                                src={writing.image}
                                alt={writing.title}
                                fill
                                unoptimized={writing.image.endsWith('.gif')}
                                sizes="(max-width: 700px) 92vw, 420px"
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div>
                            <p className={styles.cardTitle}>{writing.title}</p>
                            <p className={styles.cardDate}>{writing.year}</p>
                            <p className={styles.cardDate}>
                                {router.locale === 'en' ? writing.subtitleen : writing.subtitlega}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <Footer />
        </div>
    );
}
