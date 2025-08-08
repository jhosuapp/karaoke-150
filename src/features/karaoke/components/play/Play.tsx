import { motion } from 'framer-motion';
import styles from './play.module.css';
import iconPlay from '../../../../assets/icon-play.svg';
import { fadeInMotion } from '../../../../shared/motion';

type Props = {
    handlePlaying: (value: boolean)=> void;
    isPlaying: boolean;
}

const Play = ({ handlePlaying, isPlaying }:Props) => {
    return (
        <motion.section 
            {...fadeInMotion(1, 0)}
            key={`play-${isPlaying}`}
            className={ styles.play__container }
        >
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>handlePlaying(true)}
            >
                <img src={iconPlay} alt="icon play" />
            </motion.button>
        </motion.section>
    )
}

export { Play }