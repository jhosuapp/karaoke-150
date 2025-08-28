import { AnimatePresence } from "framer-motion";
import { Audio, Permissions, Instructions } from "../components"
import { useAudioController } from "../hooks";
import { Bg, Button } from "../../../shared/components";
import bg from '../../../config/assets/tmp/ice-bg.jpg';

const KaraokeView = () => {
    // Audio hook
    const { 
        requestPermissionsMicrophone, 
        statusMic,
        // startRecording, 
        stopRecording,
        audioUrl,
        isPlaying,
        handlePlaying
    } = useAudioController();

    const permissions = statusMic.hasPermissions;

    return (
        <section className="animate-fadeIn">
            <Bg src={ bg } />
            {/* Button play */}
            <AnimatePresence mode='wait'>
                {!isPlaying && permissions && 
                    <Instructions handlePlaying={ handlePlaying } />
                }
            </AnimatePresence>
            {/* Permissions camera, mic and screen */}
            <AnimatePresence mode='wait'>
                {!statusMic.hasPermissions &&
                    <Permissions 
                        requestPermissionsMicrophone={ requestPermissionsMicrophone } 
                        statusMic={ statusMic } 
                    />
                }
            </AnimatePresence>
            {/* Audio */}
            <Audio
                isPlaying={ isPlaying }
                handlePlaying={ handlePlaying }
                stopRecording={ stopRecording }
            />
            {audioUrl && (
                <div className="fixed z-[999999] top-0 w-full left-0 flex items-center justify-center p-5 bg-white">
                    <Button
                        onClick={ ()=> { 
                            if (!audioUrl) return;
                            const link = document.createElement("a");
                            link.href = audioUrl;
                            link.download = "grabacion.webm"; 
                            link.click();
                        }}
                        text="Descargar audio"
                        style='primary'
                    />
                </div>
            )}
        </section>
    )
}

export { KaraokeView }