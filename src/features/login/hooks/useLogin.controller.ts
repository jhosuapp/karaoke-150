import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';

import { defaultPropsSwalUnexpected } from '../../../shared/constants';
import { useLoginStore } from '../stores';
import { useKaraokeStore } from '../../karaoke/stores';
import { useNavigate } from 'react-router-dom';
import { RANKING_PATH, REGISTER_PATH } from '../../../router/routes.constant';
import { LoginInterface, loginValidation } from '../validations/login.validation';

const useLoginController = () => {
    const setLoginData = useLoginStore( state => state.setLoginData);
    const setIsSendLoginForm = useLoginStore( state => state.setIsSendLoginForm);
    const responseProcessVideo = useKaraokeStore( state => state.responseProcessVideo );
    const navigate = useNavigate();

    // Form config
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setError,
    } = useForm<LoginInterface>({
        mode: 'onBlur',
        resolver: zodResolver(loginValidation),
        defaultValues: {
            phone: '',
            tyc: false,
            pyp: false
        },
    });
    // Async 
    const onSubmit = async (formData: LoginInterface) => {
        try {
            setLoginData(formData);
            if(formData){
                return navigate(REGISTER_PATH);
            }
            
            if(!responseProcessVideo?.response?.url){
                return navigate(RANKING_PATH);
            }
            
            setIsSendLoginForm(true);
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

export { useLoginController };