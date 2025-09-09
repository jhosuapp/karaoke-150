import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAnimation } from "framer-motion";

import { useKaraokeStore } from "../stores";
import { useAudioPhytonQuery } from "./useAudioPhyton.query";
import { defaultPropsSwalUnexpected } from "../../../shared/constants";
import { useVideoAndAudioProcessing } from "./useVideoAndAudioProcessing.query";
import { LOGIN_PATH } from "../../../router/routes.constant";

type Props = {
    stopRecording: ()=> void;
    stopRecordingAudio: ()=> void;
    stopRecordingCamera: ()=> void;
    startRecording: (audioElement: HTMLAudioElement)=> void;
    startRecordingAudio: ()=> void;
    startRecordingCamera: ()=> void;
    // Files and items
    audioBlob: Blob;
    videoBlob: Blob;
}

const useKaraokeController = ({ stopRecording, stopRecordingAudio, stopRecordingCamera, startRecording, startRecordingAudio, startRecordingCamera, audioBlob, videoBlob }:Props) => {
    const controls = useAnimation();
    const navigate = useNavigate();
    const [count, setCount] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [isRecorderFinished, setIsRecorderFinished] = useState<boolean>(false);
    const [loaderText, setLoaderText] = useState<string>('Cargando');
    const [isLoadVideo, setIsLoadVideo] = useState<boolean>(false);
    const [showPermissions, setShowPermissions] = useState<boolean>(false);
    const isPlaying = useKaraokeStore(state => state.isPlaying);
    const setIsPlaying = useKaraokeStore(state => state.setIsPlaying);
    const setResponseAudio = useKaraokeStore(state => state.setResponseAudio);
    const setResponseProcessVideo = useKaraokeStore(state => state.setResponseProcessVideo);
    const responseAudio = useKaraokeStore(state => state.responseAudio);
    // Queries
    const audioPythonQuery = useAudioPhytonQuery();
    const { 
        processVideoShotstackMutation, 
        processStatusVideoQuery,
        processAudioPython,
        processVideoDrupalMutation,
        startProcessing
    } = useVideoAndAudioProcessing();

    // Validate video generate
    useEffect(()=>{
        if(processStatusVideoQuery?.data && processStatusVideoQuery?.data?.response?.status === 'done' && processVideoShotstackMutation.isSuccess && processAudioPython.isSuccess && processVideoDrupalMutation.isSuccess){
            setIsLoadVideo(false);
        }else{
            setIsLoadVideo(true);
            if(processVideoDrupalMutation.isPending) return setLoaderText("Subiendo el video")
            if(processAudioPython.isPending) return setLoaderText("Subiendo el audio")
            if(processVideoShotstackMutation.isPending) return setLoaderText("Creación de video en cola")
            if(!processStatusVideoQuery?.data?.response?.url) return setLoaderText("Generando video")
            return setLoaderText("Cargando");
        }

        if(processStatusVideoQuery?.data?.response?.url){
            setResponseProcessVideo(processStatusVideoQuery?.data);
        }
    },[ processStatusVideoQuery, processVideoShotstackMutation, processAudioPython, processVideoDrupalMutation]);

    // Audio and video processing
    useEffect(() => {
        const processAll = async () => {
            try {
                if (isRecorderFinished && videoBlob && audioBlob) {
                    const videoFile = new File([videoBlob], "recording.webm", {
                        type: "video/webm",
                    });
                    
                    const audioFile = new File([audioBlob], "audio.webm", {
                        type: "audio/webm",
                    });
                    
                    await startProcessing(videoFile, audioFile);
                }
            } catch (error) {
                console.error("Error en processAll:", error);
            }
        };
    
        if (isRecorderFinished) {
            processAll();
        }
    }, [isRecorderFinished, videoBlob, audioBlob]);

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

    // Sync audio, video and background audio + create a video with all elements
    const handlePlaying = ()=>{
        if(!responseAudio.song) return;
        const { audio_file_url } = responseAudio.song;
        const audio = new Audio(`${import.meta.env.VITE_API_AUDIO_URL}${audio_file_url}`);
        // audio.loop = true;
        audio.crossOrigin = "anonymous";
        setCount(4);
        setTimeout(()=>{

            startRecordingAudio();
            startRecordingCamera();
            startRecording(audio);
            setIsPlaying(true);
            
            // Ended audio
            audio.addEventListener("ended", () => {
                setIsPlaying(false);
                setCurrentTime(0);
                stopRecording();
                stopRecordingAudio();
                stopRecordingCamera();
                setIsRecorderFinished(true);
            });

            // update
            audio.addEventListener("timeupdate", () => {
                const now = audio.currentTime;
                setCurrentTime(now);
            });  
        },1000);
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


    const redirectRegister = () => {      
        navigate(LOGIN_PATH);
    };

    const handlePermissions = () => {      
        setShowPermissions(true);
    };

    return {
        count,
        controls,
        handlePlaying,
        currentTime,
        isPlaying,
        isRecorderFinished,
        audioPythonQuery,
        responseAudio,
        loaderText,
        isLoadVideo, 
        processStatusVideoQuery,
        processAudioPython,
        redirectRegister,
        showPermissions,
        handlePermissions
    }
}

export { useKaraokeController }