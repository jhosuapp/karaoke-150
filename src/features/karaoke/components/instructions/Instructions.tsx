import { fadeInMotion } from '../../../../shared/motion';
import { Button, Wrapper } from '../../../../shared/components';

import icon from '/assets/tmp/icon-1.png';
import styles from './instructions.module.css';
import { InstructionsCarousel } from './InstructionsCarousel';

type Props = {
    handlePlaying: (value: boolean, resetCounter: boolean)=> void;
    startRecording: ()=> void;
    startRecordingAudio: ()=> void;
    startRecordingCamera: ()=> void;
}

const Instructions = ({ handlePlaying, startRecordingAudio, startRecordingCamera, startRecording }:Props) => {

    const handleStartRecording = () => {
        setTimeout(() => {
            startRecording(); 
            startRecordingAudio(); 
            startRecordingCamera();
        }, 4000);
        handlePlaying(true, true);
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
                    onClick={ handleStartRecording } 
                    text='¿Estás listo? a jugar'
                    style="secondary"
                />
            </div>
            <InstructionsCarousel />
        </Wrapper>
    )
}

export { Instructions }