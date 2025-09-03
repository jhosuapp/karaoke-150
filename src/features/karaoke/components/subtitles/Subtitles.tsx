import { AnimatePresence, motion } from 'framer-motion';
import { fadeInMotion } from '../../../../shared/motion';

import styles from './subtitles.module.css';
import beer from '/assets/beer.png';
import text from '/assets/text-turn.png';
import { Lyric } from '../../interfaces';

type Props = {
    currentTime: number;
    isMyTurn: boolean;
    lyrics: Lyric[];
}


const Subtitles = ({ currentTime, isMyTurn, lyrics }:Props) => {

    return (
        <motion.section 
            {...fadeInMotion(0.1, 0.1)}
            className={styles.subtitles}
        >
            <AnimatePresence mode='wait'>
                {isMyTurn ? (
                    <motion.div 
                        {...fadeInMotion(0.1, 0.1)}
                        className={styles.turn}
                        key={`turn-${isMyTurn}`}
                    >
                        <motion.picture 
                            className={styles.turn__beer}
                            initial={{ x: -100, rotate: -45, opacity: 0 }}
                            animate={{ x: 0, rotate: -15, opacity: 1 }}
                            exit={{ x: -100, rotate: -45, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <img src={ beer } alt="Cerveza Aguila" />
                        </motion.picture>
                        <motion.picture 
                            className={styles.turn__text}
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.5, ease: "backOut" }}
                        >
                            <img src={ text } alt="Cerveza Aguila" />
                        </motion.picture>
                        <motion.picture 
                            className={styles.turn__beer}
                            initial={{ x: 100, rotate: 45, opacity: 0 }}
                            animate={{ x: 0, rotate: 15, opacity: 1 }}
                            exit={{ x: 100, rotate: 45, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <img src={ beer } alt="Cerveza Aguila" />
                        </motion.picture>
                    </motion.div>
                ) : (
                    <motion.div 
                        {...fadeInMotion(0.1, 0.1)}
                        className={styles.lyricsScrollContainer}
                        key={`subitles-${isMyTurn}`}
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
                )}
            </AnimatePresence>
        </motion.section>
    )
}

export { Subtitles }