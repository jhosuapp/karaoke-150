import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Swal from 'sweetalert2';

import { defaultPropsSwalUnexpected } from '../../../shared/constants';
// import { useKaraokeStore } from '../../karaoke/stores';
// import { useNavigate } from 'react-router-dom';
import { ShareUrlInterface, shareUrlValidation } from '../validations/shareUrl.validation';

const useShareUrlController = () => {
    // const responseProcessVideo = useKaraokeStore( state => state.responseProcessVideo );
    // const navigate = useNavigate();

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

export { useShareUrlController };