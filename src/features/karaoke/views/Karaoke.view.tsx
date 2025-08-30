import { AnimatePresence } from "framer-motion";
import { Audio, Permissions, Instructions, Countdown, Camera } from "../components"
import { useAudioController, useCameraController, useKaraokeController, useUnifyStreamsController } from "../hooks";
import { Bg } from "../../../shared/components";
import bg from '../../../config/assets/tmp/ice-bg.jpg';
import audioMp3 from '../../../config/assets/audio-2.mp3';

const KaraokeView = () => {
    // Principal controller
    const { 
        count,
        controls,
        isPlaying,
        handlePlaying,
     } = useKaraokeController();
    // Audio hook
    const { 
        requestPermissionsMicrophone, 
        statusMic,
        startRecordingAudio, 
        stopRecordingAudio,
        downloadAudio,
        audioBlob,
        audioStream,
    } = useAudioController();
    // Camera hook
    const {
        requestPermissionsCamera,
        statusCam, 
        startRecordingCamera,
        stopRecordingCamera,
        downloadRecordingCamera,
        videoRef, 
        videoCameraUrl,
        mediaStream
    } = useCameraController({ isPlaying });
    // Unify streams hook
    const {
        startRecording,
        stopRecording,
        videoUrl
    } = useUnifyStreamsController({ audioStream, mediaStream, customAudioUrl: audioMp3 });


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
                        startRecordingAudio={ startRecordingAudio } 
                        startRecordingCamera={ startRecordingCamera }
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

            {isPlaying && (
                <Audio
                    key={`audio`}
                    isPlaying={ isPlaying }
                    handlePlaying={ handlePlaying }
                    stopRecording={ stopRecording }
                    stopRecordingAudio={ stopRecordingAudio }
                    stopRecordingCamera={ stopRecordingCamera }
                />
            )}

            {audioBlob && (
                <div className="relative z-10">
                    <button className="bg-red-50 h-[40px] w-full mt-5 flex items-center justify-center" onClick={downloadRecordingCamera}>
                        Descargar video camara
                    </button>
                    <button className="bg-red-50 h-[40px] w-full mt-5 flex items-center justify-center" onClick={downloadAudio}>
                        Descargar audio
                    </button>
                </div>
            )}
            {videoCameraUrl && (
                <div className="relative z-10 bg-red-50">
                    <a download href={videoUrl} className="bg-red-50 h-[40px] w-full mt-5 flex items-center justify-center">
                        Descargar video unificado con audio
                    </a>
                    <video className="w-full h-[500px] flex" src={videoUrl} controls />
                </div>
            )}
        </section>
    )
}

export { KaraokeView }