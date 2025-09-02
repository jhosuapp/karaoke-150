import { motion, MotionProps } from 'framer-motion';
import styles from './button.module.css';
import { ButtonHTMLAttributes } from 'react';

type NativeProps = ButtonHTMLAttributes<HTMLButtonElement>;

type CustomProps = {
    text?: string;
    style?: 'primary' | 'secondary' | 'tiktok';
    isLight?: boolean;
    className?: string;
    iconLeft?: string;
    iconRight?: string;
    isLoad?: boolean;
}

type Props = CustomProps & NativeProps & MotionProps;

const Button = ({ text, style, isLight, className, iconLeft, iconRight, isLoad, ...props }:Props) => {
    const isWhite = isLight;

    return (
        <motion.button 
            className={ `${styles.button} ${styles[`button--${style}`]} ${isWhite ? styles['button--white'] : ''} ${isLoad && styles.button__load} ${className ?? ''}` }
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {iconLeft && (
                <img className={ styles.button__icon } src={ iconLeft } alt="Icon left" />
            )}
            <span>{ isLoad ? 'Cargando' : text }</span>
        </motion.button>
    )
}

export { Button }