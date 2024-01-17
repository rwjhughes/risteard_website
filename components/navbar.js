import React from "react";
import Link from 'next/link';
import styles from '../styles/Nav.module.css';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router'
import Enter from '@/components/enter.js'

export default function NavigationBar() {
  let router = useRouter();
  let { t } = useTranslation();

  const activeStyle = {
    border: 'rgb(181, 181, 181) inset 1px',
    backgroundColor: router.locale === 'en' ? '#000066' : '#0e442f',
    color: 'rgba(255, 255, 255, 0.5)',
  };

  const activePage = {
    textShadow: 'none',
    borderBottom: '2px solid red',
    color: 'rgba(255, 255, 255, 0.6)',
  };

  const handleMouseEnter = (event) => {
    const colorR = Math.floor(Math.random() * 255);
    const colorG = Math.floor(Math.random() * 255);
    const colorB = Math.floor(Math.random() * 255);
    const randomColor = `rgba(${colorR}, ${colorG}, ${colorB})`;
    const invertedColor = `rgba(${255 - colorR}, ${255 - colorG}, ${255 - colorB})`;

    event.target.style.textShadow = `
      10px -10px 2px ${randomColor},
      -10px 10px 2px ${invertedColor}
    `;
  };

  const handleMouseLeave = (event) => {
    event.target.style.textShadow = "none";
  };

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.container}>
          <li>
            <Link href="/" className={styles.title}
              onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              Risteárd Ó hAodha
            </Link>
          </li>
          <div className={styles.pages}>

            <li>
              <Link href="/projects"
                style={router.pathname === '/projects' ? activePage : {}}
                onMouseEnter={router.pathname === '/projects' ? null : handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {t("common:projects")}
              </Link>
            </li>
            <li>
              <Link href="/agenda"
                style={router.pathname === '/agenda' ? activePage : {}}
                onMouseEnter={router.pathname === '/agenda' ? null : handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {t("common:agenda")}
              </Link>
            </li>
            <li>
              <Link href="/research" target="_blank"
                style={router.pathname === '/research' ? activePage : {}}
                onMouseEnter={router.pathname === '/research' ? null : handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {t("common:research")}
              </Link>
            </li>
            <li>
              <Link href="/about"
                style={router.pathname === '/about' ? activePage : {}}
                onMouseEnter={router.pathname === '/about' ? null : handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {t("common:about")}
              </Link>
            </li>
          </div>
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
        </ul>
      </nav >
      <div className={styles.navSpace}></div></>
  );
}
