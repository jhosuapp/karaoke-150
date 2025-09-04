import { useEffect, useState } from 'react';
import { useKaraokeStore } from '../../karaoke/stores';
import { useRegisterStore } from '../stores/register.store';

const useShareVideoController = () => {
    const registerData = useRegisterStore( state => state.registerData );
    const responseProcessVideo = useKaraokeStore( state => state.responseProcessVideo );
    const [isLoad, setIsLoad] = useState<boolean>(false);    
    const [videoFile, setVideoFile] = useState<File | null>(null);

    const shareVideo = async () => {
        setIsLoad(true);
        
        try {
            const res = await fetch(responseProcessVideo?.response?.url);
            const blob = await res.blob();
            const file = new File([blob], "video.mp4", { type: "video/mp4" });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    text: '#Aguila',
                });
            } 
        } catch (err) {
            console.warn("Error al compartir:", err);
            alert("No se pudo compartir directamente. El video se descargará.");
        } finally {
            setIsLoad(false);
        }
    }
    
    useEffect(() => {
        const preloadVideo = async () => {
            if (responseProcessVideo?.response?.url) {
                try {
                    const res = await fetch(responseProcessVideo.response.url);
                    const blob = await res.blob();
                    const file = new File([blob], "video.mp4", { type: "video/mp4" });
                    setVideoFile(file);
                } catch (error) {
                    console.error("Error pre-cargando video:", error);
                }
            }
        };
        
        preloadVideo();
    }, [responseProcessVideo]);

    const sharePreloadedVideo = async () => {
        if (!videoFile) {
            await shareVideo();
            return;
        }

        try {
            if (navigator.share && navigator.canShare({ files: [videoFile] })) {
                await navigator.share({
                    files: [videoFile],
                    text: '#Aguila',
                });
            } 
        } catch (err) {
            console.warn("Error al compartir:", err);
        }
    }
    
    return {
        shareVideo: videoFile ? sharePreloadedVideo : shareVideo,
        registerData,
        responseProcessVideo,
        isLoad,
        isVideoPreloaded: !!videoFile
    };
};

export { useShareVideoController }