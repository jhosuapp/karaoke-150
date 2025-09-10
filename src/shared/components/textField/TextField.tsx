import { InputHTMLAttributes } from 'react';
import { motion, MotionProps } from 'framer-motion';

import styles from './textField.module.css';
import { fadeInMotion } from '../../motion';
import { defPath } from '../../../config';

type NativeProps = InputHTMLAttributes<HTMLInputElement>;

type CustomProps = {
    feedback?: string;
    delay: { initial: number, exit: number };
}

type Props = NativeProps & CustomProps & MotionProps;


const TextField = ({ feedback, style, delay, ...props }:Props) => {
    return (
        <motion.div 
            {...fadeInMotion(delay.initial, delay.exit)}
            className={ `global-field ${styles.textField} ${feedback && 'global-error-field'}` }
        >
            <div className='global-field__content'>
                <motion.input 
                    {...props}
                />
                {feedback && <img className='global-field__icon' src={ `${defPath}/icon-error.svg` } alt="" />}
            </div>
            {/* Feedback */}
            {feedback && <span className='global-field__error' role='alert'>{ feedback }</span>}
        </motion.div>
    )
}

export { TextField }