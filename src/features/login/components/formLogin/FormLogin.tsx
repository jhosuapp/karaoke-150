import { Controller } from "react-hook-form";
import { motion } from 'framer-motion';

import styles from './formLogin.module.css';
import { Button, CheckboxField, TextField } from "../../../../shared/components";
import { fadeInMotion } from "../../../../shared/motion";
import { useLoginController } from "../../hooks";
import { allowOnlyNumbers } from "../../../../shared/utilities";

const FormLogin = () => {
    const { 
        control,
        errors,
        handleSubmit,
        onSubmit,
    } = useLoginController();

    return (
        <form className={ styles.formLogin } onSubmit={ handleSubmit(onSubmit) } noValidate >
            <motion.h1 
                className="global-title"
                {...fadeInMotion(0.2, 0.2)}
            >
                Ingresa tu número telefónico
            </motion.h1>
            <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Número telefónico"
                        minLength={10}
                        maxLength={10}
                        feedback={ errors.phone?.message }
                        onKeyDown={ allowOnlyNumbers }
                        
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}

                        required
                        delay={{ initial: 0.3, exit: 0.3 }}
                    />
                )}
            />

            <Controller
                name="tyc"
                control={control}
                render={({ field: { onChange, onBlur } }) => (
                    <CheckboxField
                        name="tyc"
                        id="tyc"
                        onChange={onChange}
                        onBlur={onBlur}
                        className="mt-5"

                        feedback={ errors.tyc?.message }
                        delay={{ initial: 0.4, exit: 0.4 }}
                    >
                        <p className="mt-5">He leído, entendido y acepto los <a href="#" target="_blank">Términos de Uso</a> del sitio web.</p>
                    </CheckboxField>
                )}
            />

            <Controller
                name="pyp"
                control={control}
                render={({ field: { onChange, onBlur } }) => (
                    <CheckboxField
                        name="pyp"
                        id="pyp"
                        onChange={onChange}
                        onBlur={onBlur}

                        feedback={ errors.pyp?.message }
                        delay={{ initial: 0.5, exit: 0.5 }}
                    >
                        <p>Declaro que soy mayor de edad y autorizo que mis datos personales sean recolectados y tratados en las condiciones que se explican en el siguiente <a href="#" target="_blank">Aviso de Privacidad y de Cookies.</a></p>
                    </CheckboxField>
                )}
            />

            <Button
                text="Enviar"
                type="submit"
                style="secondary"
                {...fadeInMotion(0.6, 0.6)}
            />
        </form>
    )
}

export { FormLogin }