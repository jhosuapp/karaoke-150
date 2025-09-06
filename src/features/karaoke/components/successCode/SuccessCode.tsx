import { fadeInMotion } from '../../../../shared/motion';
import { Button, Wrapper } from '../../../../shared/components';

import icon from '/assets/icon-success-code.png';

type Props = {
    handlePermissions: ()=> void;
}

const SuccessCode = ({ handlePermissions }:Props) => {
    return (
        <Wrapper
            srcIcon={ icon }
            title='tu código es correcto'
            description1='🌟 ¡Prepárate para ser la estrella!Rompe todos los récords cantando a todo pulmón. 🎤🔥'
        >
            <div>
                <Button
                    {...fadeInMotion(0.6, 0.6)}
                    className='mt-20'
                    onClick={ handlePermissions } 
                    text='Jugar'
                    style="secondary"
                />
            </div>
        </Wrapper>
    )
}

export { SuccessCode }