import { useRef, useState } from "react";
import { PermissionsKaraoke } from "../interfaces";

const useCameraController = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [statusCam, setStatusCam] = useState<PermissionsKaraoke>({ isLoad: false, isError: false, hasPermissions: false });
  
    const requestPermissionsCamera = async () => {
        setStatusCam((prev) => ({ ...prev, isLoad: true }));

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }

            setStatusCam(prev => ({ ...prev, hasPermissions: true, isError: false }));
        } catch (err) {
            setStatusCam((prev) => ({ ...prev, isError: true, isLoad: false }));
            console.error(err);
        } finally {
            setStatusCam((prev) => ({ ...prev, isLoad: false }));
        }
    };
  
    return { 
        videoRef, 
        statusCam, 
        requestPermissionsCamera
    };
}

export { useCameraController }