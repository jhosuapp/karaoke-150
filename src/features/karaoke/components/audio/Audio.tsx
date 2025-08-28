import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';

import styles from './audio.module.css';
import audioMp3 from '../../../../config/assets/audio-2.mp3'
import { lyrics } from "./lyrics";

type Props = {
    isPlaying: boolean;
    handlePlaying: (value: boolean) => void;
    stopRecording: () => void;
}


const Audio = ({ isPlaying, handlePlaying, stopRecording }:Props) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!isPlaying || !audioRef.current) return;

        const audio = audioRef.current;
        audio.play();

        const updatePosition = () => {
            const now = audio.currentTime;
            setCurrentTime(now);

            // lyricsContainerRef.current.scrollTo({
            //     left: scrollPosition,
            //     behavior: 'smooth'
            // });
            if(now > 15){
                audio.pause();
                stopRecording();
                handlePlaying(false);
                audio.currentTime = 0;
                return () => {
                    clearInterval(interval);
                };
            }
        };

        const interval = setInterval(updatePosition, 100);
        
        audio.onended = () => {
            clearInterval(interval);
            handlePlaying(false);
            setCurrentTime(0);
        };

        return () => {
            clearInterval(interval);
        };
    }, [isPlaying]);

    return (
        <section className={styles.audio}>
            <audio
                ref={audioRef}
                src={audioMp3}
                controls={false}
            />
            {/* Contenedor de letras con scroll horizontal */}
            {isPlaying && (
                <div className={styles.lyricsScrollContainer}>
                    {lyrics.map((word, index) => {
                        const isActive = currentTime >= word.time && 
                                        currentTime < word.time + word.duration;
                        if (!isActive) return null;
                        
                        return (

                            <motion.span
                                key={`${word}-${index}-${isActive}`}
                                initial={{ 
                                    opacity: 0, y: 20,
                                    transition: {
                                        duration: 0.25,
                                    }
                                }}
                                animate={{ 
                                    opacity: 1, y: 0, 
                                    transition: {
                                        duration: 0.25,
                                    }
                                }}
                                exit={{ 
                                    opacity: 0, y: -20,
                                    transition: {
                                        duration: 0.25,
                                    }
                                }}
                                className={`
                                    ${styles.lyricWord}
                                    ${word.sing ? styles.lyricWordActive : ''}
                                `}
                            >
                                {word.text}
                            </motion.span>
                        );
                    })}
                </div>
            )}
        </section>
    )
}

export { Audio }