import { AnimatePresence, motion } from 'framer-motion';
import { fadeInMotion, fadeUpMotion } from '../../../../shared/motion/motion';
import { Button } from '../../../../shared/components';

import styles from './permissions.module.css';
import iconAudio from '../../../../assets/icon-audio.svg';

type Props = {
    requestPermissions: ()=> any;
    isLoad: boolean;
    hasPermission: boolean;
}

const Permissions = ({ requestPermissions, isLoad, hasPermission }:Props) => {
    return (
        <motion.section 
            {...fadeInMotion(0.5)}
            className={ styles.permissions }
            key={ `key${hasPermission}` }
        >
            <motion.article 
                {...fadeUpMotion(0.6, 0.5)}
                className={ styles.permissions__content }
            >
                <h2>Dar permisos</h2>
                <p>Da click en <b>aceptar</b> y luego en <b>permitir</b> para poder participar en el karaoke</p>
                <picture>
                    <img src={ iconAudio } alt="icon audio" />
                </picture>
                <Button 
                    onClick={ requestPermissions }
                    className={ styles.header__ctaMobile }
                    text={ 'Aceptar' }
                    style='primary'
                    isLoad={ isLoad }
                />
            </motion.article>
        </motion.section>
    )
}

export { Permissions }