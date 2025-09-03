import { useRef, useState } from "react";
import { useKaraokeStore } from "../stores";

type Props = {
    audioStream: MediaStream; 
    mediaStream: MediaStream; 
};

const useUnifyStreamsController = ({ audioStream, mediaStream }: Props) => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const responseAudio = useKaraokeStore(state => state.responseAudio);

    const startRecording = async () => {
        if (!mediaStream || !audioStream) {
            alert("Debes permitir pantalla y micrófono antes de grabar");
            return;
        }

        const audioCtx = new AudioContext();
        await audioCtx.resume();
        const destination = audioCtx.createMediaStreamDestination();

        const micSource = audioCtx.createMediaStreamSource(audioStream);
        micSource.connect(destination);

        const audioElement = new Audio(`${import.meta.env.VITE_API_AUDIO_URL}${responseAudio.song.audio_file_url}`);
        audioElement.crossOrigin = "anonymous";
        audioElement.loop = true;
        await audioElement.play();
    
        const musicSource = audioCtx.createMediaElementSource(audioElement);
    
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 0.3; 
    
        musicSource.connect(gainNode).connect(destination);

        const combinedStream = new MediaStream([
            ...mediaStream.getVideoTracks(),
            ...destination.stream.getAudioTracks(),
        ]);

        const recorder = new MediaRecorder(combinedStream);
        recorderRef.current = recorder;
        chunksRef.current = [];

        recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunksRef.current.push(e.data);
        };

        recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: "video/mp4" });
            setVideoUrl(URL.createObjectURL(blob));
            chunksRef.current = [];
        };

        recorder.start();
    };

    const stopRecording = () => {
        if (recorderRef.current) recorderRef.current.stop();
    };

    return {
        startRecording,
        videoUrl,
        stopRecording,
    };
};

export { useUnifyStreamsController };
