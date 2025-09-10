import { InputHTMLAttributes } from 'react';
import {  motion, MotionProps } from 'framer-motion';

import styles from './dropdown.module.css';
import { fadeInMotion } from '../../motion';
import { defPath } from '../../../config';

type NativeProps = InputHTMLAttributes<HTMLSelectElement>;

type CustomProps = {
    feedback?: string;
    placeholder: string;
    removeIcon?: boolean;
    options: { value: string, name: string }[];
    delay: { initial: number, exit: number };
}

type Props = NativeProps & CustomProps & MotionProps;

const Dropwdown = ({ feedback, style, placeholder, options, removeIcon = false, delay, ...props }:Props) => {
    return (
        <motion.div 
            className={ `global-field ${styles.dropwdown} ${feedback && 'global-error-field'}` }
            {...fadeInMotion(delay.initial, delay.exit)}
        >
            <div className='global-field__content'>
                <motion.select 
                    {...props}
                    style={{ 
                        ["--bg-img-dropdown" as any]: `url(${defPath}/icon-dropdown.svg)` 
                    }}
                >
                    <option value="" disabled selected>{ placeholder }</option>
                    {options.map(({value, name})=>(
                        <option key={value} value={value}>{name}</option>
                    ))}
                </motion.select>
                {feedback && !removeIcon && <img className='global-field__icon' src={ `${defPath}/icon-error.svg` } alt="" />}
            </div>
            {/* Feedback */}
            {feedback && <span className='global-field__error' role='alert'>{ feedback }</span>}
        </motion.div>
    )
}

export { Dropwdown }