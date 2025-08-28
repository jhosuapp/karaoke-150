import { AnimatePresence } from "framer-motion";
import { Audio, Permissions, Play, Video } from "../components"
import { karaokeController } from "../hooks/karaoke.controller";

const KaraokeView = () => {
    const { 
        requestPermissionsMicrophone, 
        statusMic,
        handlePlaying,
        isPlaying
    } = karaokeController();

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