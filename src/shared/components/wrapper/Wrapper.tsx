import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bg } from '../bg/Bg';

import styles from './wrapper.module.css';
import { fadeInMotion } from '../../motion';
import { Container } from '../container/Container';

type Props = {
    children: ReactNode;
    srcIcon: string;
    iconIsBig?: boolean;
    title?: string;
    description1?: string;
    subtitle?: string;
}

const Wrapper = ({ children, srcIcon, title, description1, subtitle, iconIsBig }:Props) => {
    return (
        <motion.section className={ styles.wrapper }>
            <Bg />
            <Container  className={ styles.wrapper__content }>
                <motion.h1 
                    {...fadeInMotion(0.2, 0.2)}
                    className='global-title'
                >
                    { title }
                </motion.h1>
                <motion.picture
                    className={ `${styles.wrapper__icon} ${iconIsBig && styles.wrapper__icon__big}` }
                    {...fadeInMotion(0.3, 0.3)}
                >
                    <img src={ srcIcon } alt="" />
                </motion.picture>
                <div>
                    {subtitle && (
                        <motion.p 
                            {...fadeInMotion(0.4, 0.4)}
                            className="global-dsc global-dsc-b"
                        >
                            { subtitle }
                        </motion.p>
                    )}
                    <motion.p 
                        {...fadeInMotion(0.5, 0.5)}
                        className="global-dsc"
                    >
                        { description1 }
                    </motion.p>
                </div>
            </Container>
            <Container className={ styles.wrapper__children }>
                { children }
            </Container>
        </motion.section>
    )
}

export { Wrapper }