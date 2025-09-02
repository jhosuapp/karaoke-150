import { motion } from 'framer-motion';
import { lyrics } from "./lyrics";

import styles from './subtitles.module.css';
import { fadeInMotion } from '../../../../shared/motion';

type Props = {
    currentTime: number;
}


const Subtitles = ({ currentTime }:Props) => {

    return (
        <motion.section 
            {...fadeInMotion(0.1, 0.1)}
            className={styles.subtitles}
        >
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
                                global-title global-title-s
                                ${styles.lyricWord}
                                ${word.sing ? styles.lyricWordActive : ''}
                            `}
                        >
                            {word.text}
                        </motion.span>
                    );
                })}
            </div>
        </motion.section>
    )
}

export { Subtitles }