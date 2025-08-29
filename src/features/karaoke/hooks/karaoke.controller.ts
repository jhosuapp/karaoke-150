import { useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
    audioStream: MediaStream;
    screenStream: MediaStream;
}

const useKaraokeController = ( { audioStream, screenStream }:Props ) => {
    const controls = useAnimation();
    const [count, setCount] = useState(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = () => {
        if (!screenStream || !audioStream) {
          alert("Debes permitir pantalla y micrófono antes de grabar");
          return;
        }
    
        // 🔥 combinamos aquí
        const combinedStream = new MediaStream([
          ...screenStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);
    
        const recorder = new MediaRecorder(combinedStream);
        recorderRef.current = recorder;
        chunksRef.current = [];
    
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunksRef.current.push(e.data);
        };
    
        recorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          setVideoUrl(URL.createObjectURL(blob));
          chunksRef.current = [];
        };
    
        recorder.start();
    };

    const stopRecording = () => {
        if (recorderRef.current) recorderRef.current.stop();
    };

    const handlePlaying = (value: boolean, resetCounter: boolean)=>{
        if(resetCounter){
            setCount(4);
            setIsPlaying(value);
        }else{
            setIsPlaying(value);
        }
    }

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => {
                setCount((prev) => prev - 1);
            }, 1000);
    
            // animación de aparición
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
        isPlaying,
        handlePlaying,
        startRecording,
        videoUrl,
        stopRecording
    }
}

export { useKaraokeController }