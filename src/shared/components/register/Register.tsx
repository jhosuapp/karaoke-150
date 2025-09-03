import { Controller } from "react-hook-form";
import { TextField } from "../textField/TextField";
import { useRegisterController } from "../../hooks";

import styles from './register.module.css';
import { Container } from "../container/Container";

const Register = () => {
    const { 
        control,
        errors,
        handleSubmit,
        onSubmit,
        // isValid,
        // setError,
    } = useRegisterController();

    return (
        <Container>
            <form className={ styles.register } onSubmit={ handleSubmit(onSubmit) }>
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
                            style="primary"
                            feedback={ errors.name?.message }
                            
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}

                            required
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
                            style="primary"
                            feedback={ errors.last_name?.message }
                            
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}

                            required
                        />
                    )}
                />
            </form>
        </Container>
    )
}

export { Register }