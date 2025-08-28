import { AnimatePresence } from "framer-motion";
import { Audio, Permissions, Play, Video } from "../components"
import { useAudioController, useKaraokeController } from "../hooks";

const KaraokeView = () => {
    // Audio hook
    const { 
        requestPermissionsMicrophone, 
        statusMic,
    } = useAudioController();
    // General hook
    const {
        isPlaying,
        handlePlaying
    } = useKaraokeController();

    return (
        <section className="animate-fadeIn">
            <AnimatePresence mode='wait'>
                {!isPlaying && 
                    <Play handlePlaying={ handlePlaying } isPlaying={ isPlaying } />
                }
            </AnimatePresence>
            <AnimatePresence mode='wait'>
                {!statusMic.hasPermissions &&
                    <Permissions 
                        requestPermissionsMicrophone={ requestPermissionsMicrophone } 
                        statusMic={ statusMic } 
                    />
                }
            </AnimatePresence>
            <Video />
            <Audio
                isPlaying={ isPlaying }
                handlePlaying={ handlePlaying }
            />
        </section>
    )
}

export { KaraokeView }