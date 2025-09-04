import { InputHTMLAttributes } from 'react';
import {  motion, MotionProps } from 'framer-motion';

import styles from './dropdown.module.css';
import DangerIcon from '/assets/icon-error.svg';

type NativeProps = InputHTMLAttributes<HTMLSelectElement>;

type CustomProps = {
    feedback?: string;
    placeholder: string;
    options: { value: string, name: string }[]
}

type Props = NativeProps & CustomProps & MotionProps;


const Dropwdown = ({ feedback, style, placeholder, options, ...props }:Props) => {
    return (
        <motion.div 
            className={ `global-field ${styles.dropwdown} ${feedback && 'global-error-field'}` }
        >
            <div className='global-field__content'>
                <motion.select 
                    {...props}
                >
                    <option value="" disabled selected>{ placeholder }</option>
                    {options.map(({value, name})=>(
                        <option key={value} value={value}>{name}</option>
                    ))}
                </motion.select>
                {feedback && <img className='global-field__icon' src={ DangerIcon } alt="" />}
            </div>
            {/* Feedback */}
            {feedback && <span className='global-field__error' role='alert'>{ feedback }</span>}
        </motion.div>
    )
}

export { Dropwdown }