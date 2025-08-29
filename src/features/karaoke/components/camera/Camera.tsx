import { motion } from 'framer-motion';
import styles from './camera.module.css';
import { fadeInMotion } from '../../../../shared/motion';

type Props = {
    videoRef:  React.RefObject<HTMLVideoElement>;
}

const Camera = ({ videoRef }:Props) => {
    return (
        <motion.div 
            {...fadeInMotion(4,0)}
            className={ styles.camera }
            >
            <motion.video
                {...fadeInMotion(4,0)}
                key={'video'}
                ref={videoRef}
                autoPlay
                muted
                playsInline
            />
        </motion.div>
    )
}

export { Camera }