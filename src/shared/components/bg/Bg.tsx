import styles from './bg.module.css';
import bg from '/assets/tmp/bg-general-optimized.jpg';

type Props = {
    src?: string;
    isFixed?: boolean;
}

const Bg = ({ src = bg, isFixed = false }:Props) => {
    return (
        <picture className={ `${styles.bg} ${isFixed && 'fixed'}` }>
            <img src={ src } alt="" />
        </picture>
    )
}

export { Bg }