import { InputHTMLAttributes, ReactNode } from "react";
import { motion, MotionProps } from 'framer-motion';

import styles from './checkboxField.module.css';
import DangerIcon from '/assets/icon-error.svg';

type NativeProps = InputHTMLAttributes<HTMLInputElement>;

type CustomProps = {
    feedback?: string;
    label?: string;
    children: ReactNode;
}

type Props = NativeProps & CustomProps & MotionProps;


const CheckboxField = ({ feedback, label, children, ...props }:Props) => {
    return (
        <motion.div 
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