import styles from './bg.module.css';
import bg from '/assets/tmp/bg-general.jpg';

type Props = {
    src?: string;
}

const Bg = ({ src = bg }:Props) => {
    return (
        <picture className={ styles.bg }>
            <img src={ src } alt="" />
        </picture>
    )
}

export { Bg }