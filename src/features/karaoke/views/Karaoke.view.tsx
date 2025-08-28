import { AnimatePresence } from "framer-motion";
import { Audio, Permissions, Instructions, Countdown } from "../components"
import { useAudioController, useCameraController, useKaraokeController } from "../hooks";
import { Bg } from "../../../shared/components";
import bg from '../../../config/assets/tmp/ice-bg.jpg';

const KaraokeView = () => {
    // Audio hook
    const { 
        requestPermissionsMicrophone, 
        statusMic,
        startRecording, 
        stopRecording,
    } = useAudioController();

    const {
        controls, 
        count,
        isPlaying,
        handlePlaying
    } = useKaraokeController();

    const {
        videoRef, 
        statusCam, 
        requestPermissionsCamera
    } = useCameraController();

    const permissions = statusMic.hasPermissions && statusCam.hasPermissions;

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
                {!permissions &&
                    <Permissions 
                        key={ `key${permissions}` }
                        requestPermissionsMicrophone={ requestPermissionsMicrophone } 
                        statusMic={ statusMic } 
                        requestPermissionsCamera={ requestPermissionsCamera } 
                        statusCam={ statusCam } 
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
                {videoRef && (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="rounded-2xl shadow-lg w-4/5 max-w-lg bg-red-50 relative z-10"
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

export { KaraokeView }