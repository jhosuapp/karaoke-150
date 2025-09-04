import { motion } from 'framer-motion';

import { Outlet } from "react-router-dom";
import { Header } from "./layout/header/Header";
import { fadeInMotion } from './motion';

const PrivateLayout = ():React.JSX.Element => {
    return (
        <motion.main 
            {...fadeInMotion(0,0)}
            className="w-full bg-[#081E5A] overflow-hidden relative min-h-[100vh]"
        >
            <Header />
            <Outlet />
        </motion.main>
    )
}

export { PrivateLayout }