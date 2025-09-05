import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';

import { defaultPropsSwalUnexpected } from '../../../shared/constants';
import { ShareUrlInterface, shareUrlValidation } from '../validations/shareUrl.validation';
import { useState } from 'react';
import { RANKING_PATH } from '../../../router/routes.constant';

const useShareUrlController = () => {
    const navigate = useNavigate();
    const [isFormSend, setIsFormSend] = useState<boolean>(false);

    // Form config
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setError,
    } = useForm<ShareUrlInterface>({
        mode: 'onChange',
        resolver: zodResolver(shareUrlValidation),
        defaultValues: {
            url: '',
        },
    });
    // Async 
    const onSubmit = async (formData: ShareUrlInterface) => {
        try {
            console.log(formData);
            setIsFormSend(true);
        } catch (error:any) {
            Swal.fire(defaultPropsSwalUnexpected);
        }
    };

    const handleRedirect = () => {
        navigate(RANKING_PATH);
    }
    
    return {
        errors,
        control,
        handleSubmit,
        onSubmit,
        isValid,
        setError,
        isFormSend,
        handleRedirect
    };
};

export { useShareUrlController };