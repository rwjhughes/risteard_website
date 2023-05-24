import styles from '../styles/Nav.module.css';
import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className={styles.footer}>
            <p>© Risteárd Ó hAodha {currentYear}</p>
        </div>
    );
};
export default Footer;