import { InputHTMLAttributes, ReactNode } from "react";
import { motion, MotionProps } from 'framer-motion';

import styles from './checkboxField.module.css';
import DangerIcon from '/assets/icon-error.svg';
import { fadeInMotion } from "../../motion";

type NativeProps = InputHTMLAttributes<HTMLInputElement>;

type CustomProps = {
    feedback?: string;
    label?: string;
    children: ReactNode;
    delay: { initial: number, exit: number };
}

type Props = NativeProps & CustomProps & MotionProps;


const CheckboxField = ({ feedback, label, children, delay, ...props }:Props) => {
    return (
        <motion.div 
            {...fadeInMotion(delay.initial, delay.exit)}
            className={ `${styles.checkboxField} ${feedback && styles.checkboxFieldError}` }
        >
            <div className={ styles.checkboxFieldContent }>
                <motion.input 
                    type="checkbox"
                    {...props}
                />
                <label
                    htmlFor={ props.name }   
                >
                    { children }
                </label>
                {feedback && (
                    <div className={ styles.checkboxField__icons }>
                        <img src={ DangerIcon } alt="" />
                    </div>
                )}
            </div>
            {/* Feedback */}
            {/* {feedback && <span className='global-error' role='alert'>{ feedback }</span>} */}
        </motion.div>
    )
}

export { CheckboxField }