import { motion } from "framer-motion";

import styles from './countdown.module.css';
import { fadeInMotion } from "../../../../shared/motion";

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
            <motion.span
                key={count}
                animate={controls}
                className={ styles.countDown__text }
            >
                {count}
            </motion.span>
        </motion.section>
    )
}

export { Countdown }