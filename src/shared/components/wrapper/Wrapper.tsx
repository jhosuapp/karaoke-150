import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bg } from '../bg/Bg';

import styles from './wrapper.module.css';
import bg from '/assets/tmp/bg-general.jpg';
import { fadeInMotion } from '../../motion';

type Props = {
    children: ReactNode;
    srcIcon: string;
    title?: string;
    description1?: string;
    description2?: string;
}

const Wrapper = ({ children, srcIcon, title, description1, description2 }:Props) => {
    return (
        <motion.section className={ styles.wrapper }>
            <Bg src={bg} />
            <article  className={ styles.wrapper__content }>
                <motion.picture
                    className={ styles.wrapper__icon }
                    {...fadeInMotion(0.2, 0.2)}
                >
                    <img src={ srcIcon } alt="" />
                </motion.picture>
                <div>
                    <motion.h1 
                        {...fadeInMotion(0.3, 0.3)}
                        className='global-title'
                    >
                        { title }
                    </motion.h1>
                    <br />
                    <motion.p 
                        {...fadeInMotion(0.4, 0.4)}
                        className="global-dsc"
                    >
                        { description1 }
                    </motion.p>
                    {description2 && (
                        <>
                            <br />
                            <motion.p 
                                {...fadeInMotion(0.5, 0.5)}
                                className="global-dsc"
                            >
                                { description2 }
                            </motion.p>
                        </>
                    )}
                </div>
            </article>
            <article className={ styles.wrapper__children }>
                { children }
            </article>
        </motion.section>
    )
}

export { Wrapper }