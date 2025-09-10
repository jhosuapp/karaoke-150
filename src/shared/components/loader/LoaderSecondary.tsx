import { AnimatePresence, motion } from 'framer-motion';
import { countdownMotion, fadeInMotion } from '../../motion';

import styles from './loader.module.css';
import { defPath } from '../../../config';

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
                <img src={ `${defPath}/loader-bg.jpg` } alt="loader" />
            </picture>
            <div className={styles.loaderSecondary__content}>
                <AnimatePresence mode="wait">
                    <motion.picture
                        {...countdownMotion()} 
                        className={styles.loaderSecondary__icon}
                        key={`icon-${text}`}
                    >
                        <img key="icon-image" src={ `${defPath}/icon-loader.svg` } alt="" />
                        <img key="circle-image" src={ `${defPath}/loader-circle.png` } alt="" />
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