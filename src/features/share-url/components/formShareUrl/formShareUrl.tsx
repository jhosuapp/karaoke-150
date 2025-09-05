import { Controller } from "react-hook-form";
import { motion } from 'framer-motion';

import styles from './formShareUrl.module.css';
import { Button, TextField } from "../../../../shared/components";
import { fadeInMotion } from "../../../../shared/motion";
import { useShareUrlController } from "../../hooks";
import { ModalConfirm } from "../modalConfirm/ModalConfirm";

const FormShareUrl = () => {
    const { 
        control,
        errors,
        handleSubmit,
        onSubmit,
        isFormSend,
        handleRedirect
    } = useShareUrlController();

    return (
        <>
            {isFormSend && <ModalConfirm handleRedirect={ handleRedirect } />}
            <form className={ styles.formShareUrl } onSubmit={ handleSubmit(onSubmit) } noValidate >
                <motion.h1 
                    className="global-title"
                    {...fadeInMotion(0.2, 0.2)}
                >
                    Compartenos la url de tu video
                </motion.h1>
                <Controller
                    name="url"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            type="text"
                            name="url"
                            id="url"
                            placeholder="Pega aquí tu URL"
                            minLength={1}
                            feedback={ errors.url?.message }
                            
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}

                            required
                            delay={{ initial: 0.3, exit: 0.3 }}
                        />
                    )}
                />

                <Button
                    text="Enviar"
                    type="submit"
                    style="secondary"
                    {...fadeInMotion(0.4, 0.4)}
                />
            </form>
        </>
    )
}

export { FormShareUrl }