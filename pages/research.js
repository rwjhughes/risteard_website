import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from '@/components/navbar.js'
import Footer from '@/components/footer.js'
import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import styles from '../styles/Research.module.css';

const RedirectPage = () => {
    const router = useRouter();
    let { t } = useTranslation();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            window.open("https://researchcatalogue.net/view/1592116/1592117", "_blank");
            router.push("/");
        }, 500);

        return () => clearTimeout(redirectTimer);
    }, []);

    return (
        <div>
            <Head>
                <title>
                    {t("common:research")}
                </title>
                <meta name="description" content="List of upcoming concerts" />
            </Head>
            <Navbar />
            <div className={styles.container}>{t("research:redirecting")}</div>
            <Footer />
        </div>
    );
};


export default RedirectPage;
