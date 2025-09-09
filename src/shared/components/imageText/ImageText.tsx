import { motion, MotionProps } from 'framer-motion';
import styles from './imageText.module.css';

type Props = {
    src: string
} & MotionProps;

const ImageText = ({ src, ...props }:Props) => {
    return (
        <motion.picture 
            className={ styles.imageText }
            {...props}
        >
            <img src={ src } alt="" />
        </motion.picture>
    )
}

export { ImageText }