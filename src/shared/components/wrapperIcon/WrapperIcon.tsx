import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

import styles from './wrapperIcon.module.css';
import iconDefault from '/assets/icon-wrapper-update.png';

type Props = {
    src?: string;
    className?: string;
    children: ReactNode;
} & MotionProps;

const WrapperIcon = ({ src = iconDefault, children, className, ...props }: Props) => {
    return (
        <motion.div 
            className={ `${styles.wrapperIcon} ${className}` }
            {...props}
        >
            <img className={ styles.wrapperIcon__bg } src={ src } alt="" />
            <div className={ styles.wrapperIcon__content }>
                { children }
            </div>
        </motion.div>
    )
}

export { WrapperIcon }