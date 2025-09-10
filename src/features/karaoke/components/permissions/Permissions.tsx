import { motion } from 'framer-motion';
import { fadeInMotion, fadeUpMotion } from '../../../../shared/motion/motion';
import { PermissionsKaraoke } from '../../interfaces';
import { PermissionsItem } from './PermissionsItem';
import { defPath } from '../../../../config';

import styles from './permissions.module.css';

type Props = {
    requestPermissionsMicrophone: ()=> void;
    statusMic: PermissionsKaraoke;
    requestPermissionsCamera: ()=> void;
    statusCam: PermissionsKaraoke;
}

const Permissions = ({ requestPermissionsMicrophone, statusMic, requestPermissionsCamera, statusCam }:Props) => {
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
                    icon={ `${defPath}/icon-audio.svg` }
                    status={ statusMic }
                    requestPermissions={ requestPermissionsMicrophone }
                />
                <PermissionsItem 
                    text='Permisos de camara'
                    icon={ `${defPath}/icon-camera.svg` }
                    status={ statusCam }
                    requestPermissions={ requestPermissionsCamera }
                />
            </motion.article>
        </motion.section>
    )
}

export { Permissions }