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
            <AnimatePresence mode='wait'>
                {/* Instructions */}
                    {!isPlaying && permissions && count === 0 && 
                        <Instructions 
                            key={`key${permissions}`}
                            handlePlaying={ handlePlaying } 
                            startRecording={ startRecording } 
                        />
                    }
                {/* Permissions camera, mic and screen */}
                {!statusMic.hasPermissions &&
                    <Permissions 
                        key={ `key${statusMic.hasPermissions}` }
                        requestPermissionsMicrophone={ requestPermissionsMicrophone } 
                        statusMic={ statusMic } 
                    />
                }
                {/* CountDown */}
                {count > 0 && (
                    <Countdown 
                        key={ `key${count}` }
                        controls={ controls }
                        count={ count }
                    />
                )}
                {/* Audio */}
                {count === 0 && (
                    <Audio
                        key={`audio`}
                        isPlaying={ isPlaying }
                        handlePlaying={ handlePlaying }
                        stopRecording={ stopRecording }
                    />
                )}
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
            </AnimatePresence>
        </section>
    )
}

export { KaraokeView }