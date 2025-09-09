import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';

import { RegisterInterface, registerValidation } from '../validations/register.validation';
import { defaultPropsSwalUnexpected } from '../../../shared/constants';
import { isAlegalAge } from '../../../shared/utilities';
import { useEffect } from 'react';
import { useRegisterStore } from '../stores';
import { useKaraokeStore } from '../../karaoke/stores';
import { useNavigate } from 'react-router-dom';
import { RANKING_PATH } from '../../../router/routes.constant';

const useRegisterController = () => {
    const setRegisterData = useRegisterStore( state => state.setRegisterData);
    const setIsSendRegisterForm = useRegisterStore( state => state.setIsSendRegisterForm);
    const responseProcessVideo = useKaraokeStore( state => state.responseProcessVideo );
    const navigate = useNavigate();

    // Form config
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setError,
        watch,
        setValue,
    } = useForm<RegisterInterface>({
        mode: 'onBlur',
        resolver: zodResolver(registerValidation),
        defaultValues: {
            name: '',
            last_name: '',
            birthday: '',
            day_birthday: '',
            month_birthday: '',
            year_birthday: '',
            gender: '',
            city: '',
            tyc: false,
            pyp: false
        },
    });

    const dayWatch = watch('day_birthday');
    const monthWatch = watch('month_birthday');
    const yearWatch = watch('year_birthday')

    useEffect(()=>{
        if(dayWatch && monthWatch && yearWatch){
            const birthdate = `${dayWatch}-${monthWatch}-${yearWatch}`;
            const isLegal = isAlegalAge(birthdate);
            if(!isLegal){
                setValue('day_birthday', '');
                setValue('month_birthday', '');
                setValue('year_birthday', '');
                setError('day_birthday', { message: 'No puede ser menor de edad' });
                setError('month_birthday', { message: 'No puede ser menor de edad' });
                setError('year_birthday', { message: 'No puede ser menor de edad' });
            }else{
                setValue('birthday', birthdate);
            }
        }
    },[dayWatch, monthWatch, yearWatch]);

    // Async 
    const onSubmit = async (formData: RegisterInterface) => {
        try {
            setRegisterData(formData);
            
            if(!responseProcessVideo?.response?.url){
                navigate(RANKING_PATH);
            }

            setIsSendRegisterForm(true);
        } catch (error:any) {
            console.log(error);
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