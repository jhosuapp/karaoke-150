import { motion, MotionProps } from 'framer-motion';
import styles from './button.module.css';
import { ButtonHTMLAttributes } from 'react';

type NativeProps = ButtonHTMLAttributes<HTMLButtonElement>;

type CustomProps = {
    text?: string;
    style?: 'primary' | 'secondary';
    isLight?: boolean;
    className?: string;
    icon?: string;
    iconRight?: string;
    isLoad?: boolean;
}

type Props = CustomProps & NativeProps & MotionProps;

const Button = ({ text, style, isLight, className, icon, iconRight, isLoad, ...props }:Props) => {
    const isWhite = isLight;

    return (
        <motion.button 
            className={ `${styles.button} ${styles[`button--${style}`]} ${isWhite ? styles['button--white'] : ''} ${isLoad && styles.button__load} ${className ?? ''}` }
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {/* <img 
                className={ styles.button__icon }
                src={ icon ? icon : iconDefault } 
                alt="icono blotcraft"
            /> */}
            <span>{ isLoad ? 'Cargando' : text }</span>
        </motion.button>
    )
}

export { Button }