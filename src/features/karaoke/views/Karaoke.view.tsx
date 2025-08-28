import { AnimatePresence } from "framer-motion";
import { Audio, Permissions, Instructions, Countdown } from "../components"
import { useAudioController, useKaraokeController } from "../hooks";
import { Bg, Button } from "../../../shared/components";
import bg from '../../../config/assets/tmp/ice-bg.jpg';

const KaraokeView = () => {
    // Audio hook
    const { 
        requestPermissionsMicrophone, 
        statusMic,
        startRecording, 
        stopRecording,
        audioUrl,
    } = useAudioController();

    const {
        controls, 
        count,
        isPlaying,
        handlePlaying
    } = useKaraokeController();

    const permissions = statusMic.hasPermissions;

    return (
        <section className="animate-fadeIn">
            <Bg src={ bg } />
            {/* Instructions */}
            <AnimatePresence mode='wait'>
                {!isPlaying && permissions && count === 0 && 
                    <Instructions handlePlaying={ handlePlaying } startRecording={ startRecording } />
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
            {/* CountDown */}
            <AnimatePresence mode='wait'>
                {count > 0 && (
                    <Countdown 
                        controls={ controls }
                        count={ count }
                    />
                )}
            </AnimatePresence>
            {/* Audio */}
            <AnimatePresence mode='wait'>
                {count === 0 && (
                    <Audio
                        isPlaying={ isPlaying }
                        handlePlaying={ handlePlaying }
                        stopRecording={ stopRecording }
                    />
                )}
            </AnimatePresence>
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