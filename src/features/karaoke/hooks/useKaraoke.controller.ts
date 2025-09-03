import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useKaraokeStore } from "../stores";
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
    const setResponseAudio = useKaraokeStore(state => state.setResponseAudio);
    const responseAudio = useKaraokeStore(state => state.responseAudio);
    // Queries
    const audioQuery = useAudioQuery();

    useEffect(()=>{
        if(audioQuery.data){
            setResponseAudio(audioQuery.data);
        }
    },[audioQuery.data, setResponseAudio]);

    const handlePlaying = ()=>{
        if(!responseAudio.song) return;
        const { challenge_start, challenge_end, audio_duration, audio_file_url } = responseAudio.song;
        const audio = new Audio(`${import.meta.env.VITE_API_AUDIO_URL}${audio_file_url}`);
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
                
                if(now >= (audio_duration - 0.1)){
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

                if(now > challenge_start && now < challenge_end){
                    setIsMyTurn(true);
                }else{
                    setIsMyTurn(false);
                }
            };
        
            const interval = setInterval(updatePosition, 100);        
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
        audioQuery,
        responseAudio
    }
}

export { useKaraokeController }