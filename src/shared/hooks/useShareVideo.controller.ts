import { useEffect, useState } from 'react';
import { useKaraokeStore } from '../../features/karaoke/stores';
import { useNavigate } from 'react-router-dom';
import { RANKING_PATH, SHARE_URL_PATH } from '../../router/routes.constant';

const useShareVideoController = () => {
    const navigate = useNavigate();
    const responseProcessVideo = useKaraokeStore( state => state.responseProcessVideo );
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [isLoad, setIsLoad] = useState<boolean>(false);  

    const hanldeNavigate = ()=>{
        navigate(RANKING_PATH);
    }

    const downLoadVideo = async () => {
        const url = responseProcessVideo.response.url;
        const res = await fetch(url);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
      
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        
        navigate(SHARE_URL_PATH);
    };
    
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
                    title: 'Video',
                    url: window.location.href
                });
            } else {
                downLoadVideo();
            }
        } catch (err) {
            downLoadVideo();
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
                
                navigate(SHARE_URL_PATH);
            } else {
                downLoadVideo();
            }
        } catch (err) {
            downLoadVideo();
            console.warn("Error al compartir:", err);
        }
    }
    
    return {
        shareVideo: videoFile ? sharePreloadedVideo : shareVideo,
        responseProcessVideo,
        isLoad,
        isVideoPreloaded: !!videoFile,
        hanldeNavigate
    };
};

export { useShareVideoController }