import React, { useState, useEffect } from 'react';
import styles from '../styles/Enter.module.css';

const Enter = () => {
    const [isEntered, setIsEntered] = useState(false);

    const getRandomRGBColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };
    const [waveColor, setWaveColor] = useState(getRandomRGBColor()); // Initialise random color

    const handleClick = () => {
        setIsEntered(true);
    };

    useEffect(() => {
        if (isEntered === true) return;

        const intervalId = setInterval(() => {
            const newColor = cycleColor(waveColor);
            setWaveColor(newColor);
        }, 2);

        return () => {
            clearInterval(intervalId);
        };
    }, [waveColor, isEntered]);

    const cycleColor = (color) => {
        const colorRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/; // Regex pattern for matching RGB values
        const match = color.match(colorRegex);

        if (!match) {
            return color; // Return the same color if it doesn't match the RGB format
        }

        const r = parseInt(match[1]);
        const g = parseInt(match[2]);
        const b = parseInt(match[3]);

        const randomIndex = Math.floor(Math.random() * 3); // Randomly choose R, G, or B
        const increment = Math.random() < 0.5 ? -1 : 1; // Randomly choose the increment direction

        let newR = r;
        let newG = g;
        let newB = b;

        // Increment the randomly chosen RGB component by one (within 0-255 range)
        switch (randomIndex) {
            case 0:
                newR = Math.max(0, Math.min(255, r + increment));
                break;
            case 1:
                newG = Math.max(0, Math.min(255, g + increment));
                break;
            case 2:
                newB = Math.max(0, Math.min(255, b + increment));
                break;
            default:
                break;
        }

        // Return the updated color in RGB format
        return `rgb(${newR}, ${newG}, ${newB})`;
    };

    return (
        <div className={`${styles.container} ${isEntered === null ? styles.loading : isEntered ? styles.fadeOut : styles.waiting}`}
            onClick={handleClick}
            style={{
                "--wave-color": waveColor
            }}>

            <div className={styles.text}>CLICK TO ENTER</div>
        </div>
    );
};

export default Enter;
