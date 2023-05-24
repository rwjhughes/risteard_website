import React, { useState, useEffect } from 'react';
import styles from '../styles/Enter.module.css';

const Enter = () => {
    const [isEntered, setIsEntered] = useState(null);
    const [waveColor, setWaveColor] = useState('purple'); // Initialize wave color as purple

    const handleClick = () => {
        setIsEntered(true);
        localStorage.setItem('hasEntered', 'true');
    };

    useEffect(() => {
        const hasEntered = localStorage.getItem('hasEntered');
        setIsEntered(hasEntered === 'true');
        if (hasEntered === 'true') return;

        const randomColor = getRandomColor();
        setWaveColor(randomColor);

        const intervalId = setInterval(() => {
            const randomColor = getRandomColor();
            setWaveColor(randomColor);
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <div className={`${styles.container} ${isEntered === null ? styles.loading : isEntered ? styles.fadeOut : styles.waiting}`}
            onClick={handleClick}
        // style={{ background: `linear-gradient(to right, blue, blue 20%, ${waveColor} 49%, ${waveColor} 51%, blue 80%)` }}
        >
            <div className={styles.text}>Click to Enter</div>
        </div>
    );
};

export default Enter;
