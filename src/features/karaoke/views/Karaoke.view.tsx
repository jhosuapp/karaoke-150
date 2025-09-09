import { AnimatePresence } from "framer-motion";
import { Subtitles, Permissions, Instructions, Countdown, Camera, Feedback, SuccessCode } from "../components"
import { useAudioController, useCameraController, useKaraokeController, useUnifyStreamsController } from "../hooks";
import { Bg, LoaderSecondary } from "../../../shared/components";

const KaraokeView = () => {
    // Audio hook
    const { 
        requestPermissionsMicrophone, 
        statusMic,
        startRecordingAudio, 
        stopRecordingAudio,
        audioBlob,
        audioStream,
    } = useAudioController();
    // Camera hook
    const {
        requestPermissionsCamera,
        statusCam, 
        startRecordingCamera,
        stopRecordingCamera,
        videoRef, 
        mediaStream
    } = useCameraController();
    // Unify streams hook
    const {
        startRecording,
        stopRecording,
        videoBlob
    } = useUnifyStreamsController({ audioStream, mediaStream });
    // Principal controller
    const { 
        count,
        controls,
        handlePlaying,
        currentTime,
        isPlaying,
        isRecorderFinished,
        responseAudio,
        isLoadVideo,
        loaderText,
        redirectRegister,
        handlePermissions,
        showPermissions
    } = useKaraokeController({ 
        stopRecordingAudio, 
        stopRecordingCamera, 
        stopRecording,
        startRecordingAudio, 
        startRecordingCamera, 
        startRecording,
        audioBlob,
        videoBlob,
    });

    const permissions = statusMic.hasPermissions && statusCam.hasPermissions;

    return (
        <section className="w-full">
            {/* Bg */}
            <Bg key={'bg'} />

            {/* First step flux */}
            <AnimatePresence mode='wait'>
                {/* Instructions */}
                {!showPermissions && (
                    <SuccessCode handlePermissions={ handlePermissions } />
                )}
                {!isPlaying && permissions && count === 0 && !isRecorderFinished &&
                    <Instructions 
                        key={`key${permissions}`}
                        handlePlaying={ handlePlaying } 
                    />
                }
                {/* Permissions camera, mic and screen */}
                {showPermissions && !permissions && !isRecorderFinished &&
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
                        key={ `countdown` }
                        controls={ controls }
                        count={ count }
                    />
                )}
            </AnimatePresence>

            {/* Second step flux */}
            <AnimatePresence mode="wait">
                {/* Camera preview */}
                {videoRef && isPlaying && (
                    <Camera 
                        key={'camera'}
                        videoRef={ videoRef } 
                    />
                )}
                {/* Subittles */}
                {isPlaying && (
                    <Subtitles
                        key={`audio`}
                        currentTime={ currentTime }
                        lyrics={ responseAudio.song.lyrics }
                    />
                )}
                
                {isRecorderFinished && isLoadVideo && (
                    <LoaderSecondary 
                        key={`loader-${isLoadVideo}`}
                        text={ loaderText }
                    />
                )}

                {isRecorderFinished && !isLoadVideo && (
                    <Feedback 
                        key={`feedback-${isLoadVideo}-${isRecorderFinished}`}
                        redirectRegister={ redirectRegister }
                    />
                )}
            </AnimatePresence>
            
        </section>
    )
}

export { KaraokeView }