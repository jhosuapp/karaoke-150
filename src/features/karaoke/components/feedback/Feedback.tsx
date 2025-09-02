import { motion } from 'framer-motion';
import { Button, WrapperIcon } from '../../../../shared/components';

import styles from './feedback.module.css';
import icon from '/assets/icon-tik-tok.jpg';
import { fadeInMotion } from '../../../../shared/motion';

const Feedback = () => {
    return (
        <motion.section 
            {...fadeInMotion(0,0)}
            className={ styles.feedback }
        >
            <article>
                <motion.h4 
                    {...fadeInMotion(0.1,0.1)}
                    className='global-title'
                >
                    ¡Lo hiciste muy bien!
                </motion.h4>
                <motion.div 
                    {...fadeInMotion(0.2,0.2)}
                    className="my-10"
                >
                    <p className='global-subtitle'>Tu posición es</p>
                    <WrapperIcon>
                        <p className='global-points'>345</p>
                    </WrapperIcon>
                </motion.div>
                <motion.div
                    {...fadeInMotion(0.3,0.3)}
                >
                    <p className='global-dsc'>Regístrate, completa tus datos y conecta tu cuenta de TikTok.</p>
                    <br />
                    <p className='global-dsc'>👉 Comparte tu video y duplica tus puntos.</p>
                </motion.div>
            </article>
            <Button
                {...fadeInMotion(0.5, 0.5)}
                text='INICIA SESIÓN CON TIKTOK'
                style='tiktok'
                iconLeft={ icon }
            />
        </motion.section>
    )
}

export { Feedback }