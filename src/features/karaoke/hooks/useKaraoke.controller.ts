import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAnimation } from "framer-motion";

import { useKaraokeStore } from "../stores";
import { useAudioQuery } from "./useAudio.query";
import { defaultPropsSwalUnexpected } from "../../../shared/constants";
import { useVideoMutation } from "./useVideo.query";

type Props = {
    stopRecording: ()=> void;
    stopRecordingAudio: ()=> void;
    stopRecordingCamera: ()=> void;
    startRecording: (audioElement: HTMLAudioElement)=> void;
    startRecordingAudio: ()=> void;
    startRecordingCamera: ()=> void;
}

const useKaraokeController = ({ stopRecording, stopRecordingAudio, stopRecordingCamera, startRecording, startRecordingAudio, startRecordingCamera }:Props) => {
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
    const audioQuery = useAudioQuery();
    const { videoMutation, videoQuery } = useVideoMutation();

    // Validate video generate
    useEffect(()=>{
        if(videoQuery?.data && videoQuery?.data?.response?.status === 'done' && videoMutation.isSuccess){
            setIsLoadVideo(false);
        }else{
            setIsLoadVideo(true);
            if(videoMutation.isPending){
                return setLoaderText("Subiendo video");
            }
            if(videoQuery.isFetching || videoQuery.isLoading || videoQuery.isPending || !videoQuery?.data?.response?.url){
                return setLoaderText("Generando video");
            }
            setLoaderText("Cargando");
        }
    },[ videoQuery.data, videoMutation ]);

    // Get audio, lyrics and times
    useEffect(()=>{
        if(audioQuery.data){
            setResponseAudio(audioQuery.data);
        }
        if(audioQuery.isError){
            Swal.fire({
                ...defaultPropsSwalUnexpected,
                title: 'Ocurrio un error al obtener el audio',
                text: 'Intenta nuevamente más tarde.',
            }).then(()=>{
                window.location.reload();
            });
        }
    },[audioQuery.data, audioQuery.isError, setResponseAudio]);

    // Generate Video in shotstack
    useEffect(()=>{
        const arrowFunction = async () => {
            await videoMutation.mutateAsync({
                id: "93716852-d463-4886-a279-386202a9c7c3",
                merge: [
                    {
                        find: "MY_VIDEO",
                        replace: 'https://shotstack-ingest-api-stage-sources.s3.ap-southeast-2.amazonaws.com/oyzkyyfsci/zzz01k48-3n3xr-rekat-a1wn0-y8m6y4/source.mp4'
                    }
                ]
            });
        }

        if(isRecorderFinished){
            arrowFunction();
        }
    },[isRecorderFinished]);

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
        audioQuery,
        responseAudio,
        loaderText,
        isLoadVideo, 
        videoQuery
    }
}

export { useKaraokeController }