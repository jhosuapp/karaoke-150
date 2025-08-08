import styles from './video.module.css';

const Video = () => {
    return (
        <section className={ styles.video }>
            <iframe 
                src="https://www.youtube.com/embed/YhUPi6-MQNE?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&mute=1&playlist=YhUPi6-MQNE" 
                allow="autoplay; fullscreen"
            />
        </section>
    )
}

export { Video }