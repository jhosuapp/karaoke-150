import { useState } from "react";

const karaokeController = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const requestPermissions = async () => {
        setIsLoad(true);
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasPermission(true);
            
            // Configurar reconocimiento de voz (si está disponible)
            if ('webkitSpeechRecognition' in window) {
                // recognitionRef.current = new window.webkitSpeechRecognition();
                // recognitionRef.current.continuous = false;
                // recognitionRef.current.interimResults = false;
                // recognitionRef.current.lang = 'es-ES';
                
                // recognitionRef.current.onresult = (event) => {
                // const transcript = event.results[0][0].transcript;
                // setUserInput(transcript);
                // checkUserInput(transcript);
                // };
            }
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
        isLoad
    }
}

export { karaokeController }