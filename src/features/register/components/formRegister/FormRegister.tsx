import { Controller } from "react-hook-form";
import { motion } from 'framer-motion';

import styles from './formRegister.module.css';
import { useRegisterController } from "../../hooks";
import { Button, CheckboxField, Dropwdown, TextField } from "../../../../shared/components";
import { fadeInMotion } from "../../../../shared/motion";
import { renderDate } from "../../../../shared/utilities";

const FormRegister = () => {
    const { 
        control,
        errors,
        handleSubmit,
        onSubmit,
        // isValid,
    } = useRegisterController();
    // Data date
    const { day, month, year } = renderDate();

    return (
        <form className={ styles.formRegister } onSubmit={ handleSubmit(onSubmit) } noValidate >
            <motion.h1 
                className="global-title"
                {...fadeInMotion(0.2, 0.2)}
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
                        {...fadeInMotion(0.3, 0.3)}
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
                        {...fadeInMotion(0.4, 0.4)}
                    />
                )}
            />

            <motion.div 
                {...fadeInMotion(0.5, 0.5)}
                className="flex gap-2"
            >
                <Controller
                    name="day_birthday"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Dropwdown
                            type="text"
                            name="day_birthday"
                            id="day_birthday"
                            placeholder="Día"
                            removeIcon
                            minLength={1}
                            options={ day }
                            feedback={ errors.day_birthday?.message }
                            
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}

                            required
                        />
                    )}
                />
                <Controller
                    name="month_birthday"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Dropwdown
                            type="text"
                            name="month_birthday"
                            id="month_birthday"
                            placeholder="Mes"
                            removeIcon
                            minLength={1}
                            options={ month }
                            feedback={ errors.month_birthday?.message }
                            
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}

                            required
                        />
                    )}
                />
                <Controller
                    name="year_birthday"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Dropwdown
                            type="text"
                            name="year_birthday"
                            id="year_birthday"
                            placeholder="Año"
                            removeIcon
                            minLength={1}
                            options={ year }
                            feedback={ errors.year_birthday?.message }
                            
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}

                            required
                        />
                    )}
                />
            </motion.div>

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
                        {...fadeInMotion(0.6, 0.6)}
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
                        {...fadeInMotion(0.7, 0.7)}
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
                        {...fadeInMotion(0.8, 0.8)}
                    >
                        <motion.p {...fadeInMotion(0.8,0.8)}>He leído, entendido y acepto los <a href="#" target="_blank">Términos de Uso</a> del sitio web.</motion.p>
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
                        {...fadeInMotion(0.9, 0.9)}
                    >
                        <motion.p {...fadeInMotion(0.9,0.9)} >Declaro que soy mayor de edad y autorizo que mis datos personales sean recolectados y tratados en las condiciones que se explican en el siguiente <a href="#" target="_blank">Aviso de Privacidad y de Cookies.</a></motion.p>
                    </CheckboxField>
                )}
            />

            <Button
                text="Enviar"
                type="submit"
                style="secondary"
                {...fadeInMotion(1, 1)}
            />
        </form>
    )
}

export { FormRegister }