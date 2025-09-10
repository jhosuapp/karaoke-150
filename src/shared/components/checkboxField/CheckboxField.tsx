import { InputHTMLAttributes, ReactNode } from "react";
import { motion, MotionProps } from 'framer-motion';

import styles from './checkboxField.module.css';
import { fadeInMotion } from "../../motion";
import { defPath } from "../../../config";

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
                    style={{ 
                        ["--bg-img" as any]: `url(${defPath}/icon-checkbox.svg)` 
                    }}
                    {...props}
                />
                <label
                    htmlFor={ props.name }   
                >
                    { children }
                </label>
                {feedback && (
                    <div className={ styles.checkboxField__icons }>
                        <img src={ `${defPath}/icon-error.svg` } alt="" />
                    </div>
                )}
            </div>
            {/* Feedback */}
            {/* {feedback && <span className='global-error' role='alert'>{ feedback }</span>} */}
        </motion.div>
    )
}

export { CheckboxField }