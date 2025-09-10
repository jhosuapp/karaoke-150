import { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

import styles from './wrapperIcon.module.css';
import { defPath } from '../../../config';

type Props = {
    src?: string;
    className?: string;
    children: ReactNode;
} & MotionProps;

const WrapperIcon = ({ src = `${defPath}/icon-wrapper-update.png`, children, className, ...props }: Props) => {
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