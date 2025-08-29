import { useRef, useState } from "react";
import { PermissionsKaraoke } from "../interfaces";

const useScreenCapture = () => {
    const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
    const [statusScreen, setStatusScreen] = useState<PermissionsKaraoke>({ isLoad: false, isError: false, hasPermissions: false });
    const [videoUrl, setVideoUrl] = useState<string>("");
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    const requestPermissionsScreen = async () => {
        setStatusScreen((prev) => ({ ...prev, isLoad: true }));
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                audio: false,
                video: { displaySurface: "monitor" as any }
            });

            setScreenStream(stream);
            setStatusScreen(prev => ({ ...prev, hasPermissions: true, isError: false }));
        } catch (err) {
            setStatusScreen((prev) => ({ ...prev, isError: true, isLoad: false }));
            console.error(err);
        } finally {
            setStatusScreen((prev) => ({ ...prev, isLoad: false }));
        }
    };

    // Paso 2: arrancar grabación cuando tu booleano lo diga
    const startRecordingScreen = () => {
            if (!screenStream) return;
    
            const recorder = new MediaRecorder(screenStream);
            recorderRef.current = recorder;
            chunksRef.current = [];
    
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };
    
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "video/webm" });
                setVideoUrl(URL.createObjectURL(blob));
                chunksRef.current = [];
            };
    
            recorder.start();
            setIsRecording(true);
    };

    const stopRecording = () => {
        if (recorderRef.current && isRecording) {
            recorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const stopCapture = () => {
        stopRecording();
        if (screenStream) {
            screenStream.getTracks().forEach(track => track.stop());
        }
        setScreenStream(null);
    };

    const downloadVideo = () => {
        if (!videoUrl) return;
        const link = document.createElement("a");
        link.style.display = "none";
        link.setAttribute("download", "video.webm");
        link.href = videoUrl;
        document.body.appendChild(link);
        link.click();
        link.remove();
    };

  
    return { 
        statusScreen, 
        screenStream,
        requestPermissionsScreen,
        downloadVideo,
        stopCapture,
        startRecordingScreen,
    };
}

export { useScreenCapture }