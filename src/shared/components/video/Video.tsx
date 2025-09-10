import { motion } from 'framer-motion';
import { defPath } from '../../../config';

import styles from './video.module.css';

type Props = {
    portrait: string;
}

const Video = ({ portrait }:Props) => {
    return (
        <section className={ styles.video }>
            <article className={ styles.video__content }>
                <picture className={ styles.video__portrait }>
                    <img src={ portrait } alt="" />
                </picture>
                <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className={ styles.video__play }
                >
                    <img src={ `${defPath}/icon-play-freeze.png` } alt="" />
                </motion.button>
            </article>
        </section>
    )
}

export { Video }