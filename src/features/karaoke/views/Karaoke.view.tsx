import { AnimatePresence } from "framer-motion";
import { Audio, Permissions, Instructions, Countdown, Camera } from "../components"
import { useAudioController, useCameraController, useKaraokeController, useScreenCapture } from "../hooks";
import { Bg } from "../../../shared/components";
import bg from '../../../config/assets/tmp/ice-bg.jpg';

const KaraokeView = () => {
    // Audio hook
    const { 
        requestPermissionsMicrophone, 
        statusMic,
        startRecordingAudio, 
        stopRecording,
        downloadAudio,
        audioBlob
    } = useAudioController();

    const {
        controls, 
        count,
        isPlaying,
        handlePlaying
    } = useKaraokeController();

    const {
        requestPermissionsCamera,
        videoRef, 
        statusCam, 
    } = useCameraController({ isPlaying });

    const {
        requestPermissionsScreen,
        downloadVideo,
        stopCapture,
        statusScreen,
        startRecordingScreen
    } = useScreenCapture();

    const permissions = statusMic.hasPermissions && statusCam.hasPermissions && statusScreen.hasPermissions;

    return (
        <section className="w-full animate-fadeIn">
            <Bg src={ bg } />
            <AnimatePresence mode='wait'>
                {/* Instructions */}
                {!isPlaying && permissions && count === 0 && 
                    <Instructions 
                        key={`key${permissions}`}
                        handlePlaying={ handlePlaying } 
                        startRecordingAudio={ startRecordingAudio } 
                        startRecordingScreen={ startRecordingScreen } 
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
                        requestPermissionsScreen={ requestPermissionsScreen }
                        statusScreen={ statusScreen }
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
            {isPlaying && count === 0 && (
                <>
                    <Audio
                        key={`audio`}
                        isPlaying={ isPlaying }
                        handlePlaying={ handlePlaying }
                        stopRecording={ stopRecording }
                        stopCapture={ stopCapture }
                    />
                </>
            )}

            {audioBlob && (
                <div className="relative z-10">
                    <button className="bg-red-50 h-[40px] w-full mt-5 flex items-center justify-center" onClick={downloadVideo}>
                        Descargar video
                    </button>
                    <button className="bg-red-50 h-[40px] w-full mt-5 flex items-center justify-center" onClick={downloadAudio}>
                        Descargar audio
                    </button>
                </div>
            )}
        </section>
    )
}

export { KaraokeView }