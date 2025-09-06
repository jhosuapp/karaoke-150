import { useEnterCodeController } from '../../hooks/useEnterCode.controller';
import { Controller } from 'react-hook-form';
import { TextField } from '../textField/TextField';
import { Button } from '../button/Button';
import { fadeInMotion } from '../../motion';

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
        <form className={ styles.enterCode } onSubmit={ handleSubmit(onSubmit) } noValidate >
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
                        delay={{ initial: 0.1, exit: 0.1 }}
                    />
                )}
            />

            <Button
                text={ text }
                type="submit"
                style="secondary"
                {...fadeInMotion(0.2, 0.2)}
            />
        </form>
    )
}

export { EnterCode }