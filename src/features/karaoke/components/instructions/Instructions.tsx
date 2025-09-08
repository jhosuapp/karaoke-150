import { fadeInMotion } from '../../../../shared/motion';
import { Button, Carousel, Container, Wrapper } from '../../../../shared/components';

import icon from '/assets/tmp/icon-1.png';
import styles from './instructions.module.css';
import { useState } from 'react';

type Props = {
    handlePlaying: ()=> void;
}


const slidesData = [
    {
        asset: '/assets/tmp/icon-instructions-1.png',
        description: 'Alístate para grabar tu video en un lugar sin ruido.'
    },
    {
        asset: '/assets/tmp/icon-instructions-2.png',
        description: 'Acepta los permisos de audio y video.'
    },
    {
        asset: '/assets/tmp/icon-instructions-3.png',
        description: 'Canta cuando te lo indiquemos y sigue bien la letra.'
    },
    {
        asset: '/assets/tmp/icon-instructions-4.png',
        description: 'Comparte tu video y duplica tus puntos'
    },
]

const Instructions = ({ handlePlaying }:Props) => {
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
                    slidesData={ slidesData }
                />
            </Container>
        </Wrapper>
    )
}

export { Instructions }