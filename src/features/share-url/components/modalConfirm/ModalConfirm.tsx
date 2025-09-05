import { motion } from 'framer-motion';

import { Button, Container } from '../../../../shared/components';
import styles from './modalConfirm.module.css';
import { fadeInMotion } from '../../../../shared/motion';

type Props = {
    handleRedirect: ()=> void;
}

const ModalConfirm = ({ handleRedirect }:Props) => {
    return (
        <motion.section 
            {...fadeInMotion(0,0)}
            className={ styles.modalConfirm }
        >
            <article className={ styles.modalConfirm__bg }>
            </article>
            <Container className={ styles.modalConfirm__content }>
                <h3 className='global-title'>tu video se compartió exitosamente</h3>
                <p className="global-dsc my-10">
                    ¡Ahora tienes el doble de puntos!
                </p>
                <p className="global-dsc">
                    Si quieres volver a intentarlo, debes ingresar un nuevo código. Así que 
                </p>
                <p className="global-dsc">
                    ¡Vamos con toda!
                </p>
                <Button
                    style="secondary"
                    text='Continuar'
                    className='mt-7'
                    onClick={ handleRedirect }
                />
            </Container>
        </motion.section>
    )
}

export { ModalConfirm }