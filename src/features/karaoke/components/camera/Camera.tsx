import { motion } from 'framer-motion';
import styles from './camera.module.css';
import { fadeInMotion } from '../../../../shared/motion';
import { Bg } from '../../../../shared/components';

import logo from '/assets/logo.png';
import bg from '/assets/bg-karaoke.jpg';

type Props = {
    videoRef:  React.RefObject<HTMLVideoElement>;
}

const Camera = ({ videoRef }:Props) => {
    return (
        <>
            <Bg isFixed src={ bg } />
            <motion.div
                {...fadeInMotion(0,0)}
                className={ styles.camera }
            >
                <motion.picture 
                    {...fadeInMotion(0,0)}
                    className={ styles.camera__logo }
                >
                    <img src={ logo } alt="Logo aguila light" />
                </motion.picture>
                <video
                    key={'video'}
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                />
            </motion.div>
        </>
    )
}

export { Camera }