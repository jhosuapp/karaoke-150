import { motion } from 'framer-motion';
import { fadeInMotion } from '../../motion';

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
            {...fadeInMotion(0, 1)}
            className={styles.loaderSecondary}
        >
            <picture className={styles.loaderSecondary__bg}>
                <img src={ bg } alt="loader" />
            </picture>
            <div className={styles.loaderSecondary__content}>
                <picture className={styles.loaderSecondary__icon}>
                    <img src={ icon } alt="" />
                    <img src={ cirlce } alt="" />
                </picture>
                <p className={styles.loaderSecondary__text}>{ text }</p>
            </div>
        </motion.section>
    )
}

export { LoaderSecondary }