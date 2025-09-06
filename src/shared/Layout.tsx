import { motion } from 'framer-motion';
import { Outlet } from "react-router-dom";
import { fadeInMotion } from "./motion";

const Layout = ():React.JSX.Element => {
    return (
        <motion.main 
            {...fadeInMotion(0,0)}
            className="w-full bg-[#081E5A] overflow-hidden relative min-h-[100vh]"
        >
            <Outlet />
        </motion.main>
    )
}

export { Layout }