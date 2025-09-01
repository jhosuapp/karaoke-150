import { AnimatePresence } from "framer-motion";
import { Subtitles, Permissions, Instructions, Countdown, Camera } from "../components"
import { useAudioController, useCameraController, useKaraokeController, useUnifyStreamsController } from "../hooks";
import { Bg } from "../../../shared/components";
import bg from '/assets/tmp/bg-general.png';
import audioMp3 from '/assets/audio-2.mp3';

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
        videoCameraUrl,
        mediaStream
    } = useCameraController();
    // Unify streams hook
    const {
        startRecording,
        stopRecording,
        videoUrl
    } = useUnifyStreamsController({ audioStream, mediaStream, customAudioUrl: audioMp3 });
    // Principal controller
    const { 
        count,
        controls,
        handlePlaying,
        currentTime,
        isPlaying
    } = useKaraokeController({ 
        stopRecordingAudio, 
        stopRecordingCamera, 
        stopRecording,
        startRecordingAudio, 
        startRecordingCamera, 
        startRecording
    });

    const permissions = statusMic.hasPermissions && statusCam.hasPermissions;

    console.log(audioBlob, videoUrl, videoCameraUrl);

    return (
        <section className="w-full animate-fadeIn">
            <Bg src={ bg } />
            <AnimatePresence mode='wait'>
                {/* Instructions */}
                {!isPlaying && permissions && count === 0 && 
                    <Instructions 
                        key={`key${permissions}`}
                        handlePlaying={ handlePlaying } 
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
                        key={ `countdown` }
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
                <Subtitles
                    key={`audio`}
                    currentTime={ currentTime }
                />
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