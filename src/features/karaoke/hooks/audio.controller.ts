import { useRef, useState } from "react";
import { PermissionsKaraoke } from "../interfaces";

const useAudioController = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [statusMic, setStatusMic] = useState<PermissionsKaraoke>({ isLoad: false, isError: false, hasPermissions: false });
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    

    const requestPermissionsMicrophone = async () => {
        setStatusMic((prev) => ({ ...prev, isLoad: true }));
        
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    channelCount: 1,
                    sampleRate: 16000,
                    sampleSize: 16,
                    echoCancellation: true,
                    noiseSuppression: true
                } 
            });
            
            setStream(newStream);
            setStatusMic(prev => ({ ...prev, hasPermissions: true, isError: false }));
        } catch (err) {
            console.error("Error al obtener permisos:", err);
            setStatusMic((prev) => ({ ...prev, isError: true, isLoad: false }));
        } finally {
            setStatusMic((prev) => ({ ...prev, isLoad: false }));
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const startRecording = async () => {
        const mediaRecorder = new MediaRecorder(stream);
    
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };
    
        mediaRecorder.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            setAudioBlob(blob);
            audioChunksRef.current = [];
        };
    
        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;
        setIsRecording(true);
    };
    

    return {
        requestPermissionsMicrophone,
        statusMic,
        startRecording,
        stopRecording,
        audioBlob
    }
}

export { useAudioController }