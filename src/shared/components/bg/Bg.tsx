import styles from './bg.module.css';

type Props = {
    src: string;
}

const Bg = ({ src }:Props) => {
    return (
        <picture className={ styles.bg }>
            <img src={ src } alt="" />
        </picture>
    )
}

export { Bg }