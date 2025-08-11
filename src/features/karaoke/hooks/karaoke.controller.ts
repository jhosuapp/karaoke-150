import { useState } from "react";

const karaokeController = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const handlePlaying = (value: boolean)=>{
        setIsPlaying(value);
    }

    const requestPermissions = async () => {
        setIsLoad(true);
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasPermission(true);
        } catch (err) {
            console.error("Error al obtener permisos:", err);
            alert("No se pudieron obtener los permisos necesarios");
        } finally {
            setIsLoad(false);
        }
    };

    return {
        hasPermission,
        requestPermissions,
        isLoad,
        handlePlaying,
        isPlaying
    }
}

export { karaokeController }