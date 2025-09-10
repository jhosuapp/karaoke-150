import { AnimatePresence, motion } from "framer-motion";

import { countdownMotion, fadeInScaleMotion } from "../../../../shared/motion";

import styles from './countdown.module.css';
import { defPath } from "../../../../config";

type Props = {
    count: number;
    controls: any;
}

const Countdown = ({ count, controls }:Props) => {

    return (
        <motion.section 
            {...fadeInScaleMotion()}
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
                    <img src={`${defPath}/icon-countdown-${count}.png`} alt="countdown" />
                </motion.picture>
            </AnimatePresence>
        </motion.section>
    )
}

export { Countdown }