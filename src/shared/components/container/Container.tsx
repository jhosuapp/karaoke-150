import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

import styles from './container.module.css';

type Props = {
    children: ReactNode;
    className?: string;
} & MotionProps;

const Container = ({ children, className, ...props }:Props) => {
    return (
        <motion.section 
            className={ `${styles.container} ${className}` }
            {...props}
        >
            { children }
        </motion.section>
    )
}

export { Container }