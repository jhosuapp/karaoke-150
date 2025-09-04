import { motion, MotionProps } from 'framer-motion';
import styles from './button.module.css';
import { ButtonHTMLAttributes } from 'react';
import { Loader } from '../loader/Loader';

type NativeProps = ButtonHTMLAttributes<HTMLButtonElement>;

type CustomProps = {
    text?: string;
    style?: 'primary' | 'secondary' | 'tiktok';
    className?: string;
    iconLeft?: string;
    iconRight?: string;
    isLoad?: boolean;
}

type Props = CustomProps & NativeProps & MotionProps;

const Button = ({ text, style, className, iconLeft, iconRight, isLoad, disabled, ...props }:Props) => {
    return (
        <motion.button 
            className={ `${styles.button} ${styles[`button--${style}`]} ${isLoad && styles.button__load} ${disabled == false && styles.button__disabled} ${className ?? ''}` }
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {iconLeft && (
                <img className={ styles.button__icon } src={ iconLeft } alt="Icon left" />
            )}
            <span>{ isLoad ? 'Cargando' : text }</span>
            {isLoad && (
                <Loader />
            )}
        </motion.button>
    )
}

export { Button }