import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useKaraokeStore } from "../stores";
import audioMp3 from '/assets/audio-2.mp3';
import { useAudioQuery } from "./useAudio.query";

type Props = {
    stopRecording: ()=> void;
    stopRecordingAudio: ()=> void;
    stopRecordingCamera: ()=> void;
    startRecording: ()=> void;
    startRecordingAudio: ()=> void;
    startRecordingCamera: ()=> void;
}

const useKaraokeController = ({ stopRecording, stopRecordingAudio, stopRecordingCamera, startRecording, startRecordingAudio, startRecordingCamera }:Props) => {
    const controls = useAnimation();
    const [count, setCount] = useState<number>(0);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isRecorderFinished, setIsRecorderFinished] = useState<boolean>(false);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);
    const isPlaying = useKaraokeStore(state => state.isPlaying);
    const setIsPlaying = useKaraokeStore(state => state.setIsPlaying);
    // Queries
    const audioQuery = useAudioQuery();

    console.log(audioQuery.data);

    const handlePlaying = ()=>{
        const audio = new Audio(audioMp3);
        audio.loop = true;
        setCount(4);
        setTimeout(() => {
            startRecording();
            startRecordingAudio();
            startRecordingCamera();
            setIsPlaying(true);
            audio.play();

            const updatePosition = () => {
                const now = audio.currentTime;
                setCurrentTime(now);

                if(now > 30){
                    audio.loop = false;
                    audio.pause();
                    clearInterval(interval);
                    setIsPlaying(false);
                    setCurrentTime(0);
                    stopRecording();
                    stopRecordingAudio();
                    stopRecordingCamera();
                    setIsRecorderFinished(true);
                    setIsLoad(true);
                    setTimeout(()=>{
                        setIsLoad(false);
                        setShowFeedback(true)
                    },2000);
                }

                if(now > 7 && now < 20){
                    setIsMyTurn(true);
                }else{
                    setIsMyTurn(false);
                }
            };
        
            const interval = setInterval(updatePosition, 500);        
        }, 4000);
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
        isPlaying,
        isRecorderFinished,
        isLoad, 
        isMyTurn,
        showFeedback,
        audioQuery
    }
}

export { useKaraokeController }