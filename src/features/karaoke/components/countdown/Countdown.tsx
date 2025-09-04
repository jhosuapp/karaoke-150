import { AnimatePresence, motion } from "framer-motion";

import { countdownMotion, fadeInMotion } from "../../../../shared/motion";

import styles from './countdown.module.css';

type Props = {
    count: number;
    controls: any;
}

const Countdown = ({ count, controls }:Props) => {

    return (
        <motion.section 
            {...fadeInMotion(0,0)}
            className={ styles.countDown }
        >
            <h4 className={ 'global-title' }>¿Estás preparado?</h4>
            <AnimatePresence mode='wait'>
                <motion.picture
                    key={count}
                    animate={controls}
                    className={ styles.countDown__icon }
                    {...countdownMotion()}
                >
                    <img src={`/assets/icon-counter-update-${count}.png`} alt="" />
                </motion.picture>
            </AnimatePresence>
        </motion.section>
    )
}

export { Countdown }