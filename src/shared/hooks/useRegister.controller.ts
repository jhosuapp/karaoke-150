import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterInterface, registerValidation } from '../validations/register.validation';
import { defaultPropsSwalUnexpected } from '../constants';

const useRegisterController = () => {
    // Form config
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setError,
    } = useForm<RegisterInterface>({
        mode: 'onChange',
        resolver: zodResolver(registerValidation),
        defaultValues: {
            name: '',
            last_name: '',
            birthday: '',
            gender: '',
            city: '',
            tyc: false,
            pyp: false
        },
    });

    // Async 
    const onSubmit = async (formData: RegisterInterface) => {
        try {
            console.log(formData);
            
        } catch (error:any) {
            Swal.fire(defaultPropsSwalUnexpected);
        }
    };
    
    return {
        errors,
        control,
        handleSubmit,
        onSubmit,
        isValid,
        setError,
    };
};

export { useRegisterController };