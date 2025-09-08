import { MotionProps, motion } from 'framer-motion';
import styles from './bg.module.css';
import bg from '/assets/tmp/bg-general-optimized.jpg';

type Props = {
    src?: string;
    isFixed?: boolean;
} & MotionProps;

const Bg = ({ src = bg, isFixed = false, ...props }:Props) => {
    return (
        <motion.picture 
            {...props}
            className={ `${styles.bg} ${isFixed && 'fixed min-h-[100vh]'}` }
        >
            <img src={ src } alt="" />
        </motion.picture>
    )
}

export { Bg }