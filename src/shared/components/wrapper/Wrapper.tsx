import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bg } from '../bg/Bg';

import styles from './wrapper.module.css';
import bg from '../../../config/assets/tmp/ice-bg.jpg';
import ice from '../../../config/assets/tmp/ice.png';
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
            <motion.picture 
                {...fadeInMotion(0.15,0.15)}
                className={ styles.wrapper__ice }
            >
                <img src={ ice } alt="" />
            </motion.picture>
            <Bg src={bg} />
            <article  className={ styles.wrapper__content }>
                <motion.picture 
                    {...fadeInMotion(0.25, 0.25)}
                    className={ styles.wrapper__icon }
                >
                    <img src={ srcIcon } alt="" />
                </motion.picture>
                <div>
                    <motion.h1 
                        {...fadeInMotion(0.5, 0.5)}
                        className='global-title'
                    >
                        { title }
                    </motion.h1>
                    <br />
                    <motion.p 
                        {...fadeInMotion(0.75, 0.75)}
                        className="global-dsc"
                    >
                        { description1 }
                    </motion.p>
                    {description2 && (
                        <>
                            <br />
                            <motion.p 
                                {...fadeInMotion(1, 1)}
                                className="global-dsc"
                            >
                                { description2 }
                            </motion.p>
                        </>
                    )}
                </div>
                { children }
            </article>
        </motion.section>
    )
}

export { Wrapper }