import { useEffect, useRef, useState } from "react";
import { PermissionsKaraoke } from "../interfaces";

type Props = {
    isPlaying: boolean;
};

const useCameraController = ({ isPlaying }: Props) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [statusCam, setStatusCam] = useState<PermissionsKaraoke>({ isLoad: false, isError: false, hasPermissions: false, });
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [videoCameraUrl, setVideoCameraUrl] = useState<string>("");

    const requestPermissionsCamera = async () => {
        setStatusCam((prev) => ({ ...prev, isLoad: true }));

        try {
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false, // 🔊 Si también quieres grabar el audio del micrófono
            });

            setMediaStream(newStream);
            setStatusCam((prev) => ({
                ...prev,
                hasPermissions: true,
                isError: false,
            }));
        } catch (err) {
            setStatusCam((prev) => ({
                ...prev,
                isError: true,
                isLoad: false,
            }));
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

    const startRecordingCamera = () => {
        if (!mediaStream) return;

        const recorder = new MediaRecorder(mediaStream, { mimeType: "video/webm" });
        recorderRef.current = recorder;
        chunksRef.current = [];

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunksRef.current.push(e.data);
            }
        };

        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "video/webm" });
            setVideoCameraUrl(URL.createObjectURL(blob));
            chunksRef.current = [];
        };

        recorder.start();
    };

    const stopRecordingCamera = () => {
        if (recorderRef.current) {
            recorderRef.current.stop();
        }
    };

    const downloadRecordingCamera = () => {
        if (!videoCameraUrl) return;
        const a = document.createElement("a");
        a.href = videoCameraUrl;
        a.download = "camera-recording.webm";
        a.click();
    };

    return {
        videoRef,
        statusCam,
        requestPermissionsCamera,
        startRecordingCamera,
        stopRecordingCamera,
        downloadRecordingCamera,
        videoCameraUrl,
        mediaStream
    };
};

export { useCameraController };
