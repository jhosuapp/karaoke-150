import { AnimatePresence } from "framer-motion";
import { Permissions, Video } from "../components"
import { karaokeController } from "../hooks/karaoke.controller";

const KaraokeView = () => {
    const { requestPermissions, isLoad, hasPermission } = karaokeController();

    return (
        <section className="animate-fadeIn">
            <AnimatePresence
                mode='wait'
                onExitComplete={() => {
                    console.log("Animación de salida finalizada");
                }}
            >
                {!hasPermission &&
                    <Permissions requestPermissions={ requestPermissions } isLoad={ isLoad } hasPermission={ hasPermission } />
                }
            </AnimatePresence>
            <Video />
        </section>
    )
}

export { KaraokeView }