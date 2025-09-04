import { motion } from 'framer-motion';

import logo from '/assets/logo.png';
import styles from './header.module.css';
import { fadeInMotion } from '../../motion';
import { Container } from '../../components';

type Props = {
    isFixed?: boolean;
}

const Header = ({ isFixed }:Props) => {
    return (
        <motion.header 
            {...fadeInMotion(0.05,0.05)}
            className={ `${styles.header} ${isFixed && 'fixed'}` }
        >
            <Container>
                <picture className={ styles.header__logo }>
                    <img src={ logo } alt="" />
                </picture>
            </Container>
        </motion.header>
    )
}

export { Header }