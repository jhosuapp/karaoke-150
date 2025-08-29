import { motion, MotionProps } from 'framer-motion';
import styles from './wrapperIcon.module.css';

type Props = {
    src: string;
    style: 'primary' | 'secondary';
} & MotionProps;

const WrapperIcon = ({ src, style, ...props }: Props) => {
    return (
        <motion.div 
            className={ `${styles.WrapperIcon} ${styles[`WrapperIcon--${style}`]}` }
            {...props}
        >
            <div className={ styles.WrapperIcon__content }>
                <img src={ src } alt="" />
            </div>
        </motion.div>
    )
}

export { WrapperIcon }