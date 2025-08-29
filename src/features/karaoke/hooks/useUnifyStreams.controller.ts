import { useRef, useState } from "react";

type Props = {
    audioStream: MediaStream;
    mediaStream: MediaStream;
}

const useUnifyStreamsController = ( { audioStream, mediaStream }:Props ) => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const recorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = () => {
        if (!mediaStream || !audioStream) {
            alert("Debes permitir camára y micrófono antes de grabar");
            return;
        }
    
        // 🔥 combinamos aquí
        const combinedStream = new MediaStream([
            ...mediaStream.getVideoTracks(),
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

    return {
        startRecording,
        videoUrl,
        stopRecording
    }
}

export { useUnifyStreamsController }