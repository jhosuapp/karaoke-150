import { motion } from 'framer-motion';
import styles from './camera.module.css';

import { fadeInScaleMotion } from '../../../../shared/motion';
import { defPath } from '../../../../config';

type Props = {
    videoRef:  React.RefObject<HTMLVideoElement>;
}

const Camera = ({ videoRef }:Props) => {
    return (
        <>
            <motion.div 
                {...fadeInScaleMotion(3.9, 0)}
                className={ styles.camera__microphone }
            >
                <img src={ `${defPath}/microphone.png` } alt="Micro aguila" />
            </motion.div>
            <motion.div 
                {...fadeInScaleMotion(3.9, 0)}
                className={ `${styles.camera__microphone} ${styles.camera__microphone__secondary}` }
            >
                <img src={ `${defPath}/microphone.png` } alt="Micro aguila" />
            </motion.div>
            <motion.div
                {...fadeInScaleMotion(3.6, 0)}
                className={ styles.camera }
            >
                <motion.picture 
                    {...fadeInScaleMotion(3.8, 0)}
                    className={ styles.camera__logo }
                >
                    <img src={ `${defPath}/logo.png` } alt="Logo aguila light" />
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