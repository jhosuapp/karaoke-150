import { motion } from 'framer-motion';
import { AnimatedCounter, Button, Container, WrapperIcon } from '../../../../shared/components';

import styles from './feedback.module.css';
import { fadeInMotion } from '../../../../shared/motion';
import { Header } from '../../../../shared/layout/header/Header';

type Props = {
    redirectRegister: ()=> void;
}

const Feedback = ({ redirectRegister }:Props) => {
    return (
        <>
            <Header />
            <Container 
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
                            <AnimatedCounter value={345} className='global-points' />
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
                    text='Registrarme'
                    style='secondary'
                    onClick={ redirectRegister }
                />
            </Container>
        </>
    )
}

export { Feedback }