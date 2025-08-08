import { AnimatePresence } from "framer-motion";
import { Permissions, Play, Video } from "../components"
import { karaokeController } from "../hooks/karaoke.controller";

const KaraokeView = () => {
    const { 
        requestPermissions, 
        isLoad, 
        hasPermission,
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
                {!hasPermission &&
                <Permissions requestPermissions={ requestPermissions } isLoad={ isLoad } hasPermission={ hasPermission } />
                }
            </AnimatePresence>
            <Video />
        </section>
    )
}

export { KaraokeView }