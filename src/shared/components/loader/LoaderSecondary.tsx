import { AnimatePresence, motion } from 'framer-motion';
import { countdownMotion, fadeInMotion } from '../../motion';

import styles from './loader.module.css';
import bg from '/assets/loader-bg.jpg';
import icon from '/assets/icon-loader.svg';
import cirlce from '/assets/loader-circle.png';

type Props = {
    text?: string;
}

const LoaderSecondary = ( { text = "cargando" }:Props ) => {
    return (
        <motion.section 
            {...fadeInMotion(0, 0)}
            className={styles.loaderSecondary}
        >
            <picture className={styles.loaderSecondary__bg}>
                <img src={ bg } alt="loader" />
            </picture>
            <div className={styles.loaderSecondary__content}>
                <AnimatePresence mode="wait">
                    <motion.picture
                        {...countdownMotion()} 
                        className={styles.loaderSecondary__icon}
                        key={`icon-${text}`}
                    >
                        <img src={ icon } alt="" />
                        <img src={ cirlce } alt="" />
                    </motion.picture>
                    <motion.p 
                        {...countdownMotion()} 
                        className={styles.loaderSecondary__text}
                        key={`text-${text}`}
                    >
                        { text }
                    </motion.p>
                </AnimatePresence>
            </div>
        </motion.section>
    )
}

export { LoaderSecondary }