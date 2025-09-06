import { useEnterCodeController } from '../../hooks/useEnterCode.controller';
import { Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { TextField } from '../textField/TextField';
import { Button } from '../button/Button';
import { fadeInMotion } from '../../motion';
import { ImageText } from '../imageText/ImageText';

import imageText from '/assets/tmp/code-title.png';
import styles from './enterCode.module.css';

type Props = {
    text: string;
    hasTitle?: boolean;
}

const EnterCode = ({ text, hasTitle }:Props) => {

    const { 
        control,
        errors,
        handleSubmit, 
        onSubmit 
    } = useEnterCodeController();

    return (
        <motion.form 
            className={ styles.enterCode } onSubmit={ handleSubmit(onSubmit) } noValidate 
            {...fadeInMotion(0.05, 0.05)}
        >
            {hasTitle && 
                <motion.div
                    className='mb-2'
                    {...fadeInMotion(0.1, 0.1)}
                >
                    <ImageText src={ imageText } />
                </motion.div>
            }
            <Controller
                name="code"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        type="text"
                        name="url"
                        id="url"
                        placeholder="Escribe tu código aquí"
                        minLength={1}
                        feedback={ errors.code?.message }
                        
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}

                        required
                        className='text-center'
                        delay={{ initial: 0.2, exit: 0.2 }}
                    />
                )}
            />

            <Button
                text={ text }
                type="submit"
                style="secondary"
                {...fadeInMotion(0.3, 0.3)}
            />
        </motion.form>
    )
}

export { EnterCode }