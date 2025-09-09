import { fadeInMotion } from '../../../../shared/motion';
import { Button, Carousel, Container, Wrapper } from '../../../../shared/components';

import icon from '/assets/tmp/icon-1.png';
import styles from './instructions.module.css';
import { useState } from 'react';
import { ResponseAdminContentInterface } from '../../../../shared/interfaces';
import { useLoaderData } from 'react-router-dom';

type Props = {
    handlePlaying: ()=> void;
}

const Instructions = ({ handlePlaying }:Props) => {
    const loaderData:ResponseAdminContentInterface = useLoaderData();
    const instructions = loaderData?.data?.instrucciones;
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handleClickPlaying = ()=> {
        setIsPlaying(true);
        handlePlaying();
    }

    return (
        <Wrapper
            srcIcon={ icon }
            title='Ha llegado el momento de ser una estrella'
            description1='Antes de empezar: busca un lugar tranquilo y activo los permisos para disfrutar la experiencia completa.'
        >
            <div className={ styles.instructions__cta }>
                <Button
                    {...fadeInMotion(0.6, 0.6)}
                    className='mt-20'
                    onClick={ handleClickPlaying } 
                    text='¿Estás listo? a jugar'
                    style="secondary"
                    disabled={ !isPlaying }
                />
            </div>
            <Container>
                <Carousel
                    title='instructivo'
                    slidesData={ instructions?.items }
                />
            </Container>
        </Wrapper>
    )
}

export { Instructions }