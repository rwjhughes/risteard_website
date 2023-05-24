import Head from 'next/head';
import useTranslation from 'next-translate/useTranslation';
import Navbar from '@/components/navbar.js'
import Footer from '@/components/footer.js'
import styles from '../styles/About.module.css';


export default function About() {
    let { t } = useTranslation();

    return (
        <div>
            <Head>
                <title>
                    {t("about:title")}
                </title>
                <meta name="description" content="List of projects" />
            </Head>
            <Navbar />
            <div className={styles.body}>
                <div className={styles.bio}>
                    <div>{t("about:text0")}</div>
                    <div className={styles.text}>{t("about:text1")}
                        <a className={styles.link} href="https://roseconnolly.bandcamp.com/album/uisce-agus-bean" target="_blank">Róis</a>,&nbsp;
                        <a className={styles.link} href="https://www.instagram.com/gemmadunleavy_/" target="_blank">Gemma Dunleavy</a>,&nbsp;
                        <a className={styles.link} href="https://seanbeing.com/" target="_blank">Seán Being</a>,&nbsp;
                        <a className={styles.link} href="https://henryearnest.bandcamp.com/" target="_blank">Henry Earnest</a>&nbsp;
                        {t("about:and")}&nbsp;
                        <a className={styles.link} href="https://www.trinityorchestra.com/" target="_blank">Trinity Orchestra</a>
                    </div>

                    <div className={styles.text}>{t("about:text2")}
                        <a className={styles.link} href="https://maze.nu/" target="_blank">MAZE Ensemble</a>,&nbsp;
                        <a className={styles.link} href="https://crashensemble.com/" target="_blank">Crash Ensemble</a>,&nbsp;
                        <a className={styles.link} href="http://michelle-pritchard.com/" target="_blank">Michelle Pritchard</a>,&nbsp;
                        <a className={styles.link} href="https://malachyrobinson.com/" target="_blank">Malachy Robinson</a>&nbsp;
                        {t("about:and")}&nbsp;
                        <a className={styles.link} href="https://www.kirkosensemble.com/" target="_blank">Kirkos Ensemble</a>.
                    </div>

                    <div className={styles.text}>{t("about:text3")}
                        <a className={styles.link} href="https://gaudeamus.nl/" target="_blank">Gaudeamus Festival (NL)</a>,&nbsp;
                        <a className={styles.link} href="https://www.instagram.com/paikka.ga" target="_blank">Paikka (HU)</a>&nbsp;
                        {t("about:text4")}
                    </div>

                    <div className={styles.text}>{t("about:text5")}
                        <a className={styles.link} href="https://kyriakides.com/" target="_blank">Yannis Kyriakides</a>&nbsp;
                        {t("about:and")}&nbsp;
                        <a className={styles.link} href="https://guusjanssen.com/" target="_blank">Guus Janssen</a>.
                        &nbsp;{t("about:se")}
                        <a className={styles.link} href="https://researchcatalogue.net/view/1592116/1592117" target="_blank">Ecological Awareness in Multimedia Composition</a>&nbsp;
                        {t("about:text6")}

                    </div>
                </div>
                <img className={styles.image} src="/images/richi.png" />
            </div>
            <Footer />
        </div>
    );
}
