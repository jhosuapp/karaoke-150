import styles from './imageText.module.css';

type Props = {
    src: string
} 

const ImageText = ({ src }:Props) => {
    return (
        <picture className={ styles.imageText }>
            <img src={ src } alt="" />
        </picture>
    )
}

export { ImageText }