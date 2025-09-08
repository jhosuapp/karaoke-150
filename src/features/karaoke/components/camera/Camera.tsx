import { motion } from 'framer-motion';
import styles from './camera.module.css';
import { Bg } from '../../../../shared/components';

import logo from '/assets/logo.png';
import bg from '/assets/bg-karaoke.jpg';
import microphone from '/assets/microphone.png';
import { fadeInMotion, fadeInScaleMotion } from '../../../../shared/motion';

type Props = {
    videoRef:  React.RefObject<HTMLVideoElement>;
}

const Camera = ({ videoRef }:Props) => {
    return (
        <>
            <Bg {...fadeInMotion(3.5, 0)} isFixed src={ bg } key={'bg-camera'} />
            <motion.picture 
                {...fadeInScaleMotion(3.9, 0)}
                className={ styles.camera__microphone }
            >
                <img src={ microphone } alt="Micro aguila" />
            </motion.picture>
            <motion.div
                {...fadeInScaleMotion(3.6, 0)}
                className={ styles.camera }
            >
                <motion.picture 
                    {...fadeInScaleMotion(3.8, 0)}
                    className={ styles.camera__logo }
                >
                    <img src={ logo } alt="Logo aguila light" />
                </motion.picture>
                <motion.video
                    {...fadeInScaleMotion(3.6, 0)}
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