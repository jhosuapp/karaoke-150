import { AnimatePresence, motion } from 'framer-motion';
import { fadeInMotion, fadeInScaleMotion } from '../../../../shared/motion';

import styles from './subtitles.module.css';
import { Lyric } from '../../interfaces';

type Props = {
    currentTime: number;
    lyrics: Lyric[];
}


const Subtitles = ({ currentTime, lyrics }:Props) => {

    return (
        <motion.section 
            {...fadeInScaleMotion(3.7, 0)}
            className={styles.subtitles}
        >
            <AnimatePresence mode='wait'>                
                <motion.div 
                    {...fadeInMotion(0.1, 0.1)}
                    className={styles.lyricsScrollContainer}
                    key={`subitles-subtitles`}
                >
                    {lyrics.map((word, index) => {
                        const isActive = currentTime >= word.start && 
                                        currentTime < word.start + word.duration;
                        if (!isActive) return null;
                        
                        return (

                            <motion.span
                                key={`${word.start}-${index}-${isActive}`}
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
                                `}
                            >
                                {word.text}
                            </motion.span>
                        );
                    })}
                </motion.div>
            </AnimatePresence>
        </motion.section>
    )
}

export { Subtitles }