
import styles from './button.module.css';
import iconDefault from '../../../assets/icon-arrow.svg';
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

type Props = CustomProps & NativeProps;

const Button = ({ text, style, isLight, className, icon, iconRight, isLoad, ...props }:Props) => {
    const isWhite = isLight;

    return (
        <button 
            className={ `${styles.button} ${styles[`button--${style}`]} ${isWhite ? styles['button--white'] : ''} ${isLoad && styles.button__load} ${className ?? ''}` }
            {...props}
        >
            <img 
                className={ styles.button__icon }
                src={ icon ? icon : iconDefault } 
                alt="icono blotcraft"
            />
            <span>{ isLoad ? 'Cargando' : text }</span>
        </button>
    )
}

export { Button }