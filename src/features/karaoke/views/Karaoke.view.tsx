import { AnimatePresence, motion } from "framer-motion";
import { Subtitles, Permissions, Instructions, Countdown, Camera, Feedback } from "../components"
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
        videoUrl,
    } = useUnifyStreamsController({ audioStream, mediaStream });
    // Principal controller
    const { 
        count,
        controls,
        handlePlaying,
        currentTime,
        isPlaying,
        isRecorderFinished,
        isMyTurn,
        responseAudio,
        isLoadVideo,
        processStatusVideoQuery,
        loaderText,
        processAudioPython,
        redirectRegister
    } = useKaraokeController({ 
        stopRecordingAudio, 
        stopRecordingCamera, 
        stopRecording,
        startRecordingAudio, 
        startRecordingCamera, 
        startRecording,
        audioBlob
    });

    const permissions = statusMic.hasPermissions && statusCam.hasPermissions;

    return (
        <section className="w-full">
            {/* Bg */}
            <Bg key={'bg'} />

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

                {videoCameraUrl && !isLoadVideo && (
                    <motion.div 
                        key={`preview-${videoCameraUrl}`}
                        className="relative z-10 bg-primary"
                    >
                        <code>
                            {JSON.stringify(processAudioPython.data)}
                        </code>
                        <a download href={audioUrl} className="bg-secondary h-[40px] w-full mt-5 flex items-center justify-center">
                            Descargar audio de usuario completo
                        </a>
                        <audio
                            className="w-full my-5"
                            src={audioUrl}
                            controls
                        />
                        <div className="hidden">
                            <a download href={videoUrl} className="bg-secondary h-[40px] w-full flex items-center justify-center">
                                Descargar video solo
                            </a>
                            <video className="w-full h-[300px] flex" src={videoCameraUrl} controls />
                        </div>
                        <a download href={videoUrl} className="bg-secondary h-[40px] w-full flex items-center justify-center">
                            Descargar video unificado con audio
                        </a>
                        <video className="w-full h-[300px] flex" src={videoUrl} controls />
                        <a download href={processStatusVideoQuery?.data?.response?.url} className="bg-secondary h-[40px] w-full flex items-center justify-center">
                            Descargar video generado por shotstack
                        </a>
                        <video className="w-full h-[300px] flex" src={processStatusVideoQuery?.data?.response?.url} controls />
                    </motion.div>
                )}
            </AnimatePresence>
            
        </section>
    )
}

export { KaraokeView }