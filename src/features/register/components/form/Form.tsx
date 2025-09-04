import { Controller } from "react-hook-form";
import { motion } from 'framer-motion';

import styles from './form.module.css';
import { useRegisterController } from "../../hooks";
import { Button, CheckboxField, Dropwdown, TextField } from "../../../../shared/components";
import { fadeInMotion } from "../../../../shared/motion";

const Form = () => {
    const { 
        control,
        errors,
        handleSubmit,
        onSubmit,
        // isValid,
        // setError,
    } = useRegisterController();

    return (
        <motion.form 
            className={ styles.form } onSubmit={ handleSubmit(onSubmit) } noValidate
            {...fadeInMotion(0,0)}
        >
            <motion.h1 
                className="global-title"
                {...fadeInMotion(0.05, 0.05)}
            >
                Ingresa tus datos
            </motion.h1>
            <Controller
                name="name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nombre"
                        minLength={1}
                        maxLength={50}
                        feedback={ errors.name?.message }
                        
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}

                        required
                        {...fadeInMotion(0.1, 0.1)}
                    />
                )}
            />
            <Controller
                name="last_name"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        type="text"
                        name="last_name"
                        id="last_name"
                        placeholder="Apellidos"
                        minLength={1}
                        maxLength={50}
                        feedback={ errors.last_name?.message }
                        
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}

                        required
                        {...fadeInMotion(0.15, 0.15)}
                    />
                )}
            />

            <Controller
                name="gender"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Dropwdown
                        type="text"
                        name="gender"
                        id="gender"
                        placeholder="Género"
                        minLength={1}
                        options={[{ value: "Femenino", name: "Femenino" }, { value: "Masculino", name: "Masculino" }]}
                        feedback={ errors.gender?.message }
                        
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}

                        required
                        {...fadeInMotion(0.2, 0.2)}
                    />
                )}
            />

            <Controller
                name="city"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Dropwdown
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Ciudad"
                        minLength={1}
                        options={[{ value: "Bogotá", name: "Bogotá" }, { value: "Medellín", name: "Medellín" }]}
                        feedback={ errors.city?.message }
                        
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}

                        required
                        {...fadeInMotion(0.25, 0.25)}
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

                        feedback={ errors.tyc?.message }
                        {...fadeInMotion(0.3, 0.3)}
                    >
                        <p>He leído, entendido y acepto los <a href="#" target="_blank">Términos de Uso</a> del sitio web.</p>
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
                        {...fadeInMotion(0.35, 0.35)}
                    >
                        <p>Declaro que soy mayor de edad y autorizo que mis datos personales sean recolectados y tratados en las condiciones que se explican en el siguiente <a href="#" target="_blank">Aviso de Privacidad y de Cookies.</a></p>
                    </CheckboxField>
                )}
            />

            <Button
                text="Enviar"
                type="submit"
                style="secondary"
                {...fadeInMotion(0.4, 0.4)}
            />
        </motion.form>
    )
}

export { Form }