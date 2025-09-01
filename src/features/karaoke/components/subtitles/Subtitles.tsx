import { motion } from 'framer-motion';
import { useKaraokeStore } from '../../stores';
import { lyrics } from "./lyrics";

import styles from './subtitles.module.css';

type Props = {
    currentTime: number;
    handlePlaying: (value: boolean, resetCounter: boolean) => void;
}


const Subtitles = ({ currentTime }:Props) => {
    const isPlaying = useKaraokeStore(state => state.isPlaying);

    return (
        <section className={styles.subtitles}>
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
                                    global-title
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

export { Subtitles }