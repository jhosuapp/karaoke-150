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
        stopRecordingAudio,
        downloadAudio,
        audioBlob,
        audioStream
    } = useAudioController();

    const {
        requestPermissionsScreen,
        downloadVideo,
        stopRecordingScreen,
        statusScreen,
        startRecordingScreen,
        screenStream
    } = useScreenCapture();

    const {
        controls, 
        count,
        isPlaying,
        handlePlaying,
        startRecording,
        videoUrl,
        stopRecording
    } = useKaraokeController({ audioStream, screenStream });

    const {
        requestPermissionsCamera,
        videoRef, 
        statusCam, 
    } = useCameraController({ isPlaying });

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
                        stopRecordingScreen={ stopRecordingScreen }
                        stopRecordingAudio={ stopRecordingAudio }
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
            {videoUrl && (
                <div className="relative z-10 bg-red-50">
                    <p className="global-description">video unificado</p>
                    <video className="w-full h-[500px] flex" src={videoUrl} controls />
                </div>
            )}
        </section>
    )
}

export { KaraokeView }