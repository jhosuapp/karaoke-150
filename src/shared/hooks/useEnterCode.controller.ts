import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';
import { EnterCodeInterface, enterCodeValidation } from '../validations';
import { defaultPropsSwalUnexpected } from '../constants';
import { KARAOKE_PATH } from '../../router/routes.constant';


const useEnterCodeController = () => {
    const navigate = useNavigate();
    const [isFormSend, setIsFormSend] = useState<boolean>(false);

    // Form config
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setError,
    } = useForm<EnterCodeInterface>({
        mode: 'onChange',
        resolver: zodResolver(enterCodeValidation),
        defaultValues: {
            code: '',
        },
    });
    // Async 
    const onSubmit = async (formData: EnterCodeInterface) => {
        try {
            console.log(formData);
            setIsFormSend(true);
            navigate(KARAOKE_PATH);
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
        isFormSend,
    };
};

export { useEnterCodeController };