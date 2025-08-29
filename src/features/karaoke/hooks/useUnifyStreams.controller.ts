import { useRef, useState } from "react";

type Props = {
    audioStream: MediaStream; // micrófono
    mediaStream: MediaStream; // cámara o pantalla
    customAudioUrl?: string;  // música o audio custom (mp3, wav, etc.)
};

const useUnifyStreamsController = ({ audioStream, mediaStream, customAudioUrl }: Props) => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        if (!mediaStream || !audioStream) {
            alert("Debes permitir pantalla y micrófono antes de grabar");
            return;
        }

        // 🎵 Creamos un contexto de audio
        const audioCtx = new AudioContext();
        const destination = audioCtx.createMediaStreamDestination();

        // 📌 1. Conectamos el micrófono
        const micSource = audioCtx.createMediaStreamSource(audioStream);
        micSource.connect(destination);

        // 📌 2. Si hay audio custom, lo cargamos
        if (customAudioUrl) {
            const audioElement = new Audio(customAudioUrl);
            audioElement.loop = true; // opcional
            await audioElement.play();

            const musicSource = audioCtx.createMediaElementSource(audioElement);
            musicSource.connect(destination);
        }

        // 🔥 combinamos video + audios
        const combinedStream = new MediaStream([
            ...mediaStream.getVideoTracks(),
            ...destination.stream.getAudioTracks(),
        ]);

        // 🎥 grabamos
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

    return {
        startRecording,
        videoUrl,
        stopRecording,
    };
};

export { useUnifyStreamsController };
