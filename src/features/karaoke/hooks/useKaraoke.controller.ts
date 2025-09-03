import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAnimation } from "framer-motion";

import { useKaraokeStore } from "../stores";
import { useAudioPhytonQuery } from "./useAudioPhyton.query";
import { defaultPropsSwalUnexpected } from "../../../shared/constants";
import { useVideoAndAudioProcessing } from "./useVideoAndAudioProcessing.query";

type Props = {
    stopRecording: ()=> void;
    stopRecordingAudio: ()=> void;
    stopRecordingCamera: ()=> void;
    startRecording: (audioElement: HTMLAudioElement)=> void;
    startRecordingAudio: ()=> void;
    startRecordingCamera: ()=> void;
    // Files and items
    audioBlob: Blob;
}

const useKaraokeController = ({ stopRecording, stopRecordingAudio, stopRecordingCamera, startRecording, startRecordingAudio, startRecordingCamera, audioBlob }:Props) => {
    const controls = useAnimation();
    const [count, setCount] = useState<number>(0);
    const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isRecorderFinished, setIsRecorderFinished] = useState<boolean>(false);
    const [loaderText, setLoaderText] = useState<string>('Cargando');
    const [isLoadVideo, setIsLoadVideo] = useState<boolean>(false);
    const isPlaying = useKaraokeStore(state => state.isPlaying);
    const setIsPlaying = useKaraokeStore(state => state.setIsPlaying);
    const setResponseAudio = useKaraokeStore(state => state.setResponseAudio);
    const responseAudio = useKaraokeStore(state => state.responseAudio);
    // Queries
    const audioPythonQuery = useAudioPhytonQuery();
    const { 
        processVideoShotstackMutation, 
        processStatusVideoQuery,
        processAudioPython
    } = useVideoAndAudioProcessing();

    // Validate video generate
    useEffect(()=>{
        const errorProcessVideo = processStatusVideoQuery.isError || processVideoShotstackMutation.isError;

        if(errorProcessVideo || processAudioPython.isError){
            Swal.fire({
                ...defaultPropsSwalUnexpected,
                title: errorProcessVideo ? 'Error en el procesamiento del video' : 'Error en el procesamiento del audio',
                text: 'Intenta nuevamente más tarde.',
            }).then(()=>{
                window.location.reload();
            });
            return;
        }

        if(processStatusVideoQuery?.data && processStatusVideoQuery?.data?.response?.status === 'done' && processVideoShotstackMutation.isSuccess && processAudioPython.isSuccess){
            setIsLoadVideo(false);
        }else{
            setIsLoadVideo(true);
            if(processAudioPython.isPending){
                return setLoaderText("Subiendo el audio");
            }
            if(processVideoShotstackMutation.isPending){
                return setLoaderText("Subiendo video");
            }
            if(!processStatusVideoQuery?.data?.response?.url){
                return setLoaderText("Generando video");
            }
            setLoaderText("Cargando");
        }
    },[ processStatusVideoQuery, processVideoShotstackMutation, processAudioPython]);

    // Get audio, lyrics and times
    useEffect(()=>{
        if(audioPythonQuery.data){
            setResponseAudio(audioPythonQuery.data);
        }
        if(audioPythonQuery.isError){
            Swal.fire({
                ...defaultPropsSwalUnexpected,
                title: 'Ocurrio un error al obtener el audio',
                text: 'Intenta nuevamente más tarde.',
            }).then(()=>{
                window.location.reload();
            });
        }
    },[audioPythonQuery.data, audioPythonQuery.isError, setResponseAudio]);

    // Generate Video in shotstack
    useEffect(()=>{
        const processAudio = async () => {
            if (!audioBlob) {
                console.error("No hay audio grabado");
                return;
            }

            const audioFile = new File([audioBlob], "recording.webm", {
                type: audioBlob.type || "audio/webm",
            });
            
            await processAudioPython.mutateAsync(audioFile);
        }

        if(isRecorderFinished){
            processAudio();
        }
    },[isRecorderFinished, audioBlob]);

    // Sync audio, video and background audio + create a video with all elements
    const handlePlaying = ()=>{
        if(!responseAudio.song) return;
        const { challenge_start, challenge_end, audio_duration, audio_file_url } = responseAudio.song;
        const audio = new Audio(`${import.meta.env.VITE_API_AUDIO_URL}${audio_file_url}`);
        audio.loop = true;
        audio.crossOrigin = "anonymous";
        setCount(4);
        setTimeout(async () => {
            startRecordingAudio();
            startRecordingCamera();
            startRecording(audio);
            setIsPlaying(true);
            
            const updatePosition = () => {
                const now = audio.currentTime;
                setCurrentTime(now);
                
                if(now >= (audio_duration - 0.05)){
                    audio.loop = false;
                    audio.pause();
                    clearInterval(interval);
                    setIsPlaying(false);
                    setCurrentTime(0);
                    stopRecording();
                    stopRecordingAudio();
                    stopRecordingCamera();
                    setIsRecorderFinished(true);
                }

                if(now > challenge_start && now < challenge_end){
                    setIsMyTurn(true);
                }else{
                    setIsMyTurn(false);
                }
            };
        
            const interval = setInterval(updatePosition, 50);        
        }, 4000);
    }

    // Countdown animation
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
        isMyTurn,
        audioPythonQuery,
        responseAudio,
        loaderText,
        isLoadVideo, 
        processStatusVideoQuery
    }
}

export { useKaraokeController }