import { useState } from "react";
import { PermissionsKaraoke } from "../interfaces";

const useAudioController = () => {
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [statusMic, setStatusMic] = useState<PermissionsKaraoke>({ isLoad: false, isError: false, hasPermissions: false });

    const requestPermissionsMicrophone = async () => {
        setStatusMic((prev) => ({ ...prev, isLoad: true }));
        
        try {
            const newStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(newStream);
            // Recorder
            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    console.log("Chunk de audio", event.data);
                }
            };
            recorder.start();
            // Set states
            setStream(newStream);
            
            setStatusMic((prev) => ({ ...prev, hasPermissions: true }));
        } catch (err) {
            console.error("Error al obtener permisos:", err);
            setStatusMic((prev) => ({ ...prev, isError: true, isLoad: false }));
        } finally {
            setStatusMic((prev) => ({ ...prev, isLoad: false }));
        }
    };

    const stopMic = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
            setStatusMic({ ...statusMic, hasPermissions: false });
        }
    };

    return {
        requestPermissionsMicrophone,
        statusMic,
        stopMic
    }
}

export { useAudioController }