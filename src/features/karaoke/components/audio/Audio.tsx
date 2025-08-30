import { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';

import styles from './audio.module.css';
import audioMp3 from '../../../../config/assets/audio-2.mp3'
import { lyrics } from "./lyrics";

type Props = {
    isPlaying: boolean;
    handlePlaying: (value: boolean, resetCounter: boolean) => void;
    stopRecording: () => void;
    stopRecordingAudio: () => void;
    stopRecordingCamera: () => void;
}


const Audio = ({ isPlaying, handlePlaying, stopRecording, stopRecordingAudio, stopRecordingCamera }:Props) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (!isPlaying) return;
    
        if (!audioRef.current) {
            audioRef.current = new window.Audio(audioMp3);
            audioRef.current.loop = false;
        }
    
        const audio = audioRef.current;
        audio.play();
    
        const updatePosition = () => {
            const now = audio.currentTime;
            setCurrentTime(now);
    
            if (now > 15) {
                audio.pause();
                audio.currentTime = 0;
    
                stopRecording();
                stopRecordingAudio();
                stopRecordingCamera();
                handlePlaying(false, false);
    
                clearInterval(interval);
            }
        };
    
        const interval = setInterval(updatePosition, 100);
    
        audio.onended = () => {
            clearInterval(interval);
            handlePlaying(false, false);
            setCurrentTime(0);
        };
    
        return () => {
            clearInterval(interval);
            // opcional: resetear audio si se desmonta
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, [isPlaying]);

    return (
        <section className={styles.audio}>
            <audio
                ref={audioRef}
                src={audioMp3}
                playsInline
                preload="auto"
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

export { Audio }