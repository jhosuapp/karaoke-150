import { motion } from 'framer-motion';
import { fadeInMotion } from '../../motion';
import { Container } from '../../components';

import logo from '/assets/logo.png';
import icon from '/assets/icon-login-update.png';
import styles from './header.module.css';


type Props = {
    isFixed?: boolean;
    hasItemRight?: boolean;
    text?: string;
}

const Header = ({ isFixed, hasItemRight = false, text }:Props) => {
    return (
        <motion.header 
            {...fadeInMotion(0.05,0.05)}
            className={ `${styles.header} ${isFixed && 'fixed'}` }
        >
            <Container className={ styles.header__content }>
                <picture className={ styles.header__logo }>
                    <img src={ logo } alt="" />
                </picture>
                {hasItemRight && (
                    <div>
                        <button className={ styles.header__action }>
                            <img src={ icon } alt="" />
                            <p className='global-dsc'>{ text }</p>
                        </button>
                    </div>
                )}
            </Container>
        </motion.header>
    )
}

export { Header }