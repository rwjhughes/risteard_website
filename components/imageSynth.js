import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Image.module.css';
import * as Tone from 'tone'

const ImageSynthPage = () => {

    const makeSynth = () => {
        //TONE.JS SYNTH//
        //effects chain
        const inmix = new Tone.Gain(0.9);
        const outmix = new Tone.Gain(0.9);
        const panner = new Tone.Panner(0);
        const reverb = new Tone.Reverb({
            wet: .33,
            decay: 15,
        });
        const delay = new Tone.PingPongDelay({
            time: 0.1,
            feedback: 0.1,
            wet: 0.2,
        });
        const lowpass = new Tone.Filter(3000, "lowpass");
        const highpass = new Tone.Filter(150, "highpass");
        // inmix => panner => reverb => delay
        // => lowpass filter => highpass filter => stereo width => outmix
        inmix.connect(panner);
        panner.connect(reverb);
        reverb.connect(delay);
        delay.connect(lowpass);
        lowpass.connect(highpass);
        highpass.connect(outmix);
        outmix.toDestination();


        //synth
        const synth = new Tone.MonoSynth({
            oscillator: {
                type: "square"
            },
            envelope: {
                attack: 0.06,
                sustain: 0.06,
                release: 0.06
            }
        }).connect(inmix);

        return {
            synth,
            panner,
            reverb,
            delay,
            lowpass,
            highpass,
        }
    }

    const [audioDevices, setAudioDevices] = useState(null)

    useEffect(() => {
        if (!audioDevices) { setAudioDevices(makeSynth()) };
    }, []);

    const [hoveredSquares, setHoveredSquares] = useState([]);

    // hover => play random note of 10edo scale
    const handleSquareHover = (squareIndex) => {
        if (hoveredSquares.includes(squareIndex)) {
        } else {
            const i = 80 * Math.pow(2, (Math.floor(Math.random() * 50)) / 10);
            audioDevices.synth.triggerAttackRelease(i, 0.18);
            setHoveredSquares((prevHoveredSquares) => [...prevHoveredSquares, squareIndex]);
        }
    };

    const [mouseUpHappened, setMouseUpHappened] = useState(false);

    return (
        <div className={styles.container}>
            <div className={styles.overlay} rel="preload">
                {[...Array(400)].map((_, index) => (
                    <div
                        key={index}
                        id={index}
                        className={`${styles.square} ${hoveredSquares.includes(index) ? styles.transparent : ''} `}
                        style={{
                            top: `${Math.floor(index / 20) * 5}vh`,
                            left: `${(index % 20) * 5}vw`,
                        }}
                        onMouseEnter={() => handleSquareHover(index)}
                        onMouseDown={() => handleSquareHover(index)}
                    />
                ))}
            </div>
            <div className={styles.bottomLayer}>
                <Image src="/images/water.jpg" alt="bottom-image" layout="fill" objectFit="cover" />
            </div>
        </div>
    );
};


export default ImageSynthPage;
