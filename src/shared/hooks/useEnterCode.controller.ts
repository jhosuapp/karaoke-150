import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { EnterCodeInterface, enterCodeValidation } from '../validations';
import { KARAOKE_PATH } from '../../router/routes.constant';
import { useEnterCodeMutation } from './useEnterCode.query';


const useEnterCodeController = () => {
    const navigate = useNavigate();
    const mutation = useEnterCodeMutation();

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
            const response = await mutation.mutateAsync(formData);

            if(response){
                navigate(KARAOKE_PATH);
            }
        } catch (error:any) {
            navigate(KARAOKE_PATH);
            // Swal.fire(defaultPropsSwalUnexpected);
        }
    };

    return {
        errors,
        control,
        handleSubmit,
        onSubmit,
        isValid,
        setError,
        mutation
    };
};

export { useEnterCodeController };