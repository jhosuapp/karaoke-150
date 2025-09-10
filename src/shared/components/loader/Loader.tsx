import { motion } from 'framer-motion';
import styles from './loader.module.css';
import { fadeInMotion } from '../../motion';
import { defPath } from '../../../config';


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
            <img src={ `${defPath}/icon-spinner.svg` } alt="cargando" />
        </motion.div>
    )
}

export { Loader }