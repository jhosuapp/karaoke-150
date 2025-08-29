import { AnimatePresence } from "framer-motion";
import { Audio, Permissions, Instructions, Countdown, Camera } from "../components"
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
    } = useCameraController({ isPlaying });

    const permissions = statusMic.hasPermissions && statusCam.hasPermissions;

    return (
        <section className="w-full animate-fadeIn">
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
            </AnimatePresence>
            {videoRef && isPlaying && (
                <Camera 
                    key={'camera'}
                    videoRef={ videoRef } 
                />
            )}
            {count === 0 && (
                <>
                    <Audio
                        key={`audio`}
                        isPlaying={ isPlaying }
                        handlePlaying={ handlePlaying }
                        stopRecording={ stopRecording }
                    />
                </>
            )}
        </section>
    )
}

export { KaraokeView }