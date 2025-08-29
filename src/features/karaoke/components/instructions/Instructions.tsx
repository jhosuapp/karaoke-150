import { fadeInMotion } from '../../../../shared/motion';
import { Button, Wrapper } from '../../../../shared/components';

import icon from '../../../../config/assets/tmp/micro.png';
import styles from './instructions.module.css';
import { InstructionsCarousel } from './InstructionsCarousel';

type Props = {
    handlePlaying: (value: boolean, resetCounter: boolean)=> void;
    startRecording: ()=> void;
    startRecordingAudio: ()=> void;
    startRecordingCamera: ()=> void;
}

const Instructions = ({ handlePlaying, startRecordingAudio, startRecordingCamera, startRecording }:Props) => {
    return (
        <Wrapper
            srcIcon={ icon }
            title='username. ha llegado el monento de ser una estrella'
            description1='Antes de comenzar, asegúrate de dar los permisos necesarios. Así podrás vivir la experiencia completa y mostrar tu mejor actuación.'
        >
            <div className={ styles.instructions__cta }>
                <Button
                    {...fadeInMotion(0.6, 0.6)}
                    onClick={ ()=> { startRecording(), startRecordingAudio(), startRecordingCamera(), handlePlaying(true, true)} } 
                    text='¿Estás listo? a jugar'
                    style="secondary"
                />
            </div>
            <InstructionsCarousel />
        </Wrapper>
    )
}

export { Instructions }