import { AnimatePresence, motion } from "framer-motion";
import { Subtitles, Permissions, Instructions, Countdown, Camera, Feedback } from "../components"
import { useAudioController, useCameraController, useKaraokeController, useUnifyStreamsController } from "../hooks";
import { Bg, LoaderSecondary } from "../../../shared/components";
import bg from '/assets/tmp/bg-general.jpg';

const KaraokeView = () => {
    // Audio hook
    const { 
        requestPermissionsMicrophone, 
        statusMic,
        startRecordingAudio, 
        stopRecordingAudio,
        // audioBlob,
        audioStream,
        audioUrl
    } = useAudioController();
    // Camera hook
    const {
        requestPermissionsCamera,
        statusCam, 
        startRecordingCamera,
        stopRecordingCamera,
        videoRef, 
        videoCameraUrl,
        mediaStream
    } = useCameraController();
    // Unify streams hook
    const {
        startRecording,
        stopRecording,
        videoUrl
    } = useUnifyStreamsController({ audioStream, mediaStream });
    // Principal controller
    const { 
        count,
        controls,
        handlePlaying,
        currentTime,
        isPlaying,
        isRecorderFinished,
        isLoad,
        isMyTurn,
        showFeedback,
        responseAudio
    } = useKaraokeController({ 
        stopRecordingAudio, 
        stopRecordingCamera, 
        stopRecording,
        startRecordingAudio, 
        startRecordingCamera, 
        startRecording
    });

    const permissions = statusMic.hasPermissions && statusCam.hasPermissions;

    return (
        <section className="w-full animate-fadeIn">
            {/* Bg */}
            <Bg key={'bg'} src={ bg } />
            
            {/* First step flux */}
            <AnimatePresence mode='wait'>
                    {/* Instructions */}
                    {!isPlaying && permissions && count === 0 && !isRecorderFinished &&
                        <Instructions 
                            key={`key${permissions}`}
                            handlePlaying={ handlePlaying } 
                        />
                    }
                    {/* Permissions camera, mic and screen */}
                    {!permissions && !isRecorderFinished &&
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
                        isMyTurn={ isMyTurn }
                        lyrics={ responseAudio.song.lyrics }
                    />
                )}
                {isRecorderFinished && isLoad && (
                    <LoaderSecondary 
                        key={`loader-${isLoad}-${isRecorderFinished}`}
                    />
                )}

                {isRecorderFinished && showFeedback && (
                    <Feedback 
                        key={`feedback-${showFeedback}-${isRecorderFinished}`}
                    />
                )}

                {videoCameraUrl && !isLoad && (
                    <motion.div 
                        key={`preview-${videoCameraUrl}`}
                        className="relative z-10 bg-primary"
                    >
                        <a download href={audioUrl} className="bg-secondary h-[40px] w-full mt-5 flex items-center justify-center">
                            Descargar audio de usuario completo
                        </a>
                        <audio
                            className="w-full my-5"
                            src={audioUrl}
                            controls
                        />
                        <a download href={videoUrl} className="bg-secondary h-[40px] w-full flex items-center justify-center">
                            Descargar video unificado con audio
                        </a>
                        <video className="w-full h-[300px] flex" src={videoUrl} controls />
                        <a download href={videoUrl} className="bg-secondary h-[40px] w-full flex items-center justify-center">
                            Descargar video solo
                        </a>
                        <video className="w-full h-[300px] flex" src={videoCameraUrl} controls />
                    </motion.div>
                )}
            </AnimatePresence>
            
        </section>
    )
}

export { KaraokeView }