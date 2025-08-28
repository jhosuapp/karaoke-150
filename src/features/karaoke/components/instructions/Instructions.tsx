import { fadeInMotion } from '../../../../shared/motion';
import { Button, Wrapper } from '../../../../shared/components';

import icon from '../../../../config/assets/tmp/icon-micro.png';

type Props = {
    handlePlaying: (value: boolean, resetCounter: boolean)=> void;
    startRecording: ()=> void;
}

const Instructions = ({ handlePlaying, startRecording }:Props) => {
    return (
        <Wrapper
            srcIcon={ icon }
            title='username. ha llegado el monento de ser una estrella'
            description1='Antes de comenzar, asegúrate de dar los permisos necesarios. Así podrás vivir la experiencia completa y mostrar tu mejor actuación.'
        >
            <Button
                {...fadeInMotion(1, 1)}
                onClick={ ()=> { startRecording(), handlePlaying(true, true)} } 
                text='¿Estás listo? a jugar'
                style="secondary"
            />
        </Wrapper>
    )
}

export { Instructions }