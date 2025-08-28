import { motion } from 'framer-motion';
import IconSpinner from '../../../config/assets/icon-spinner.svg';
import styles from './loader.module.css';
import { fadeInMotion } from '../../motion';


type Props = {
    key?: string | number;
    className?: string;
}

const Loader = ({ key, className }:Props) => {
    return (
        <motion.div 
            {...fadeInMotion}
            className={ `${styles.loader} ${className}` }
            key={ key }
        >
            <img src={ IconSpinner } alt="cargando" />
        </motion.div>
    )
}

export { Loader }