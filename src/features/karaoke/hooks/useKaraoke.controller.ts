import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useKaraokeStore } from "../stores";
import audioMp3 from '/assets/audio-2.mp3';

type Props = {
    stopRecording: ()=> void;
    stopRecordingAudio: ()=> void;
    stopRecordingCamera: ()=> void;
}

const useKaraokeController = ({ stopRecording, stopRecordingAudio, stopRecordingCamera }:Props) => {
    const controls = useAnimation();
    const [count, setCount] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const isPlaying = useKaraokeStore(state => state.isPlaying);
    const setIsPlaying = useKaraokeStore(state => state.setIsPlaying);

    const handlePlaying = (value: boolean, resetCounter: boolean)=>{
        const audio = new Audio(audioMp3);
        audio.loop = true;

        if(resetCounter){
            setCount(4);
            setTimeout(() => {
                setIsPlaying(value);
                audio.loop = true;
                audio.play();
    
                const updatePosition = () => {
                    const now = audio.currentTime;
                    setCurrentTime(now);
                
                    if (now > 15) {
                        audio.muted = true;
                        setTimeout(()=>{
                            audio.pause();
                            stopRecording();
                            stopRecordingAudio();
                            stopRecordingCamera();
                            setIsPlaying(false);
                            audio.currentTime = 0;
                            clearInterval(interval); 
                        },1000);
                    }
                };
            
                const interval = setInterval(updatePosition, 100);
            
                audio.onended = () => {
                    clearInterval(interval);
                    setIsPlaying(false);
                    setCurrentTime(0);
                };
            }, 4000);
        }else{
            setIsPlaying(value);
        }
    }

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount((prev) => prev - 1);
            }, 1000);
    
            controls.start({
                scale: [0, 1.2, 1],
                opacity: [0, 1, 0.8],
                transition: { duration: 0.6 },
            });
    
            return () => clearTimeout(timer);
        }
    }, [count, controls]);


    return {
        count,
        controls,
        handlePlaying,
        currentTime,
        isPlaying
    }
}

export { useKaraokeController }