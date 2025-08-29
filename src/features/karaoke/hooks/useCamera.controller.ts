import { useEffect, useRef, useState } from "react";
import { PermissionsKaraoke } from "../interfaces";

type Props = {
    isPlaying: boolean;
}

const useCameraController = ( { isPlaying }:Props ) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [statusCam, setStatusCam] = useState<PermissionsKaraoke>({ isLoad: false, isError: false, hasPermissions: false });

    const requestPermissionsCamera = async () => {
        setStatusCam((prev) => ({ ...prev, isLoad: true }));

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { 
                facingMode: "user"
            }});

            setMediaStream(mediaStream);
            setStatusCam(prev => ({ ...prev, hasPermissions: true, isError: false }));
        } catch (err) {
            setStatusCam((prev) => ({ ...prev, isError: true, isLoad: false }));
            console.error(err);
        } finally {
            setStatusCam((prev) => ({ ...prev, isLoad: false }));
        }
    };

    useEffect(() => {
        if (videoRef.current && mediaStream && isPlaying) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.onloadedmetadata = () => {
                videoRef.current?.play();
            };
        }
    }, [mediaStream, isPlaying]);
  
    return { 
        videoRef, 
        statusCam, 
        requestPermissionsCamera
    };
}

export { useCameraController }