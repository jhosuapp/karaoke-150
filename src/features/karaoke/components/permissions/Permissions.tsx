import { motion } from 'framer-motion';
import { fadeInMotion, fadeUpMotion } from '../../../../shared/motion/motion';
import { PermissionsKaraoke } from '../../interfaces';

import styles from './permissions.module.css';
import iconAudio from '../../../../config/assets/icon-audio.svg';
import iconCamera from '../../../../config/assets/icon-camera.svg';
import iconScreen from '../../../../config/assets/icon-screen.svg';
import { PermissionsItem } from './PermissionsItem';

type Props = {
    requestPermissionsMicrophone: ()=> void;
    statusMic: PermissionsKaraoke;
}

const Permissions = ({ requestPermissionsMicrophone, statusMic }:Props) => {
    return (
        <motion.section 
            {...fadeInMotion(0, 0)}
            className={ styles.permissions }
        >
            <motion.article 
                {...fadeUpMotion(0.2, 0.2)}
                className={ styles.permissions__content }
            >
                <h2>Dar permisos</h2>
                <PermissionsItem 
                    text='Permisos de audio'
                    icon={ iconAudio }
                    status={ statusMic }
                    requestPermissions={ requestPermissionsMicrophone }
                    />
                <PermissionsItem 
                    text='Permisos de camara'
                    icon={ iconCamera }
                    status={ statusMic }
                    requestPermissions={ requestPermissionsMicrophone }
                />
                <PermissionsItem 
                    text='Permisos de compartir pantalla'
                    icon={ iconScreen }
                    status={ statusMic }
                    requestPermissions={ requestPermissionsMicrophone }
                />
            </motion.article>
        </motion.section>
    )
}

export { Permissions }