import { InputHTMLAttributes } from 'react';
import { motion, MotionProps } from 'framer-motion';

import styles from './textField.module.css';
import DangerIcon from '/assets/icon-error.svg';

type NativeProps = InputHTMLAttributes<HTMLInputElement>;

type CustomProps = {
    feedback?: string;
}

type Props = NativeProps & CustomProps & MotionProps;


const TextField = ({ feedback, style, ...props }:Props) => {
    return (
        <motion.div 
            className={ `global-field ${styles.textField} ${feedback && 'global-error-field'}` }
        >
            <div className='global-field__content'>
                <motion.input 
                    {...props}
                />
                {feedback && <img className='global-field__icon' src={ DangerIcon } alt="" />}
            </div>
            {/* Feedback */}
            {feedback && <span className='global-field__error' role='alert'>{ feedback }</span>}
        </motion.div>
    )
}

export { TextField }