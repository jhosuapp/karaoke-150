import { MotionProps, motion } from 'framer-motion';
import styles from './bg.module.css';
import { defPath } from '../../../config';

type Props = {
    src?: string;
    isFixed?: boolean;
    className?: string;
    isAbsolute?:boolean;
} & MotionProps;

const Bg = ({ src = `${defPath}/tmp/bg-general-optimized.jpg`, isFixed = false, isAbsolute = false, className, ...props }:Props) => {
    return (
        <motion.picture 
            {...props}
            className={ `${styles.bg} ${isFixed && 'fixed min-h-[100vh]'} ${className}` }
        >
            <img className={`${isFixed && 'min-h-[100vh]'} ${isAbsolute && 'absolute'}`} src={ src } alt="" />
        </motion.picture>
    )
}

export { Bg }