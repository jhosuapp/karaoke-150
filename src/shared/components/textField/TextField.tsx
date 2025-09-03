import { InputHTMLAttributes, ReactNode } from 'react';
import {  motion } from 'framer-motion';

import styles from './textField.module.css';
import DangerIcon from '/assets/icon-check.svg';

type NativeProps = InputHTMLAttributes<HTMLInputElement>;

type CustomProps = {
    feedback?: string;
    style?: 'primary' | 'secondary';
    children?: ReactNode;
    childrenIsIcon?: boolean;
}

type Props = NativeProps & CustomProps;


const TextField = ({ children, childrenIsIcon, feedback, style, ...props }:Props) => {
    return (
        <motion.div 
            className={ `${styles.textField} ${styles[`textField--${style}`]} ${feedback && styles.textFieldError}` }
        >
            <div className={ styles.textFieldContent }>
                <input 
                    {...props}
                />
                {feedback && !children && (
                    <div className={ styles.textField__icons }>
                        <img src={ DangerIcon } alt="" />
                    </div>
                )}
                {childrenIsIcon ? (
                    <div className={ styles.textField__icons }>
                        {feedback && <img src={ DangerIcon } alt="" />}
                        { children }
                    </div>
                ) : (
                    children
                )}
            </div>
            {/* Feedback */}
            {feedback && <span className={ styles.textField__feedback } role='alert'>{ feedback }</span>}
        </motion.div>
    )
}

export { TextField }