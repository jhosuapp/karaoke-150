import { useEffect, useState } from 'react';
import { useKaraokeStore } from '../../features/karaoke/stores';
import { useNavigate } from 'react-router-dom';
import { RANKING_PATH, SHARE_URL_PATH } from '../../router/routes.constant';

const useShareVideoController = () => {
    const navigate = useNavigate();
    const responseProcessVideo = useKaraokeStore( state => state.responseProcessVideo );
    const [videoFile, setVideoFile] = useState<File | null>(null);

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
        try {
            console.log('click');
            if (navigator.share && navigator.canShare({ files: [videoFile] })) {
                await navigator.share({
                    files: [videoFile],
                    text: '#Aguila',
                });
                
                navigate(SHARE_URL_PATH);
            } 
        } catch (err) {
            console.warn("Error al compartir:", err);
        }
    }

    const hanldeNavigate = ()=>{
        navigate(RANKING_PATH);
    }
    
    return {
        shareVideo: sharePreloadedVideo,
        responseProcessVideo,
        hanldeNavigate,
        isVideoPreloaded: !!videoFile
    };
};

export { useShareVideoController }