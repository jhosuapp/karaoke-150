// import { motion } from 'framer-motion';
// import styles from './instructions.module.css';
// import { fadeInMotion } from '../../../../shared/motion';
import { Button, Wrapper } from '../../../../shared/components';

import icon from '../../../../config/assets/tmp/icon-micro.png';

type Props = {
    handlePlaying: (value: boolean)=> void;
}

const Instructions = ({ handlePlaying }:Props) => {
    return (
        <Wrapper
            srcIcon={ icon }
            title='username. ha llegado el monento de ser una estrella'
            description1='Antes de comenzar, asegúrate de dar los permisos necesarios. Así podrás vivir la experiencia completa y mostrar tu mejor actuación.'
        >
            <Button
                onClick={ ()=> handlePlaying(true) } 
                text='¿Estás listo? a jugar'
                style="secondary"
            />
        </Wrapper>
    )
}

export { Instructions }


{/* <motion.section 
{...fadeInMotion(0.25, 0)}
key={`play-${isPlaying}`}
className={ styles.play__container }
>
<motion.button
    whileHover={{ scale: 1.1 }}
    
    onClick={()=>handlePlaying(true)}
>
    <img src={iconPlay} alt="icon play" />
</motion.button>
</motion.section> */}