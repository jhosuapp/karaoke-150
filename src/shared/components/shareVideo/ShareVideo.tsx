import { AnimatePresence, motion } from 'framer-motion';

import styles from './shareVideo.module.css';

import bg from '/assets/preview-update.png';
import { useShareVideoController } from '../../hooks';
import { countdownMotion, fadeInMotion } from '../../motion';
import { Button } from '../button/Button';

type Props = {
    userName?: string;
}

const ShareVideo = ({ userName }:Props) => {
    const { 
        shareVideo,
        responseProcessVideo,
        isLoad,
        hanldeNavigate,
        isVideoPreloaded
     } = useShareVideoController();

    return (
        <motion.section
            className={ styles.shareVideo }
            {...fadeInMotion(0.1,0.1)}
        >
            <article>
                <motion.h2 
                    className="global-title"
                    {...fadeInMotion(0.2, 0.2)}
                >
                    { userName ?? 'usuario' }, comparte tu video y dobla tus puntos
                </motion.h2>
                <motion.p 
                    className='global-dsc my-10'
                    {...fadeInMotion(0.3, 0.3)}
                >
                    Publica con el hashtag en TikTok, Instagram o Facebook. <br />
                    Compártenos el link de tu post.
                </motion.p>
                <motion.video 
                    {...fadeInMotion(0.4, 0.4)}
                    className={ styles.shareVideo__video } 
                    src={responseProcessVideo?.response?.url} 
                    poster={ bg }
                    preload="none"
                    controls
                />
                <div className={ styles.shareVideo__ctas }>
                    <AnimatePresence mode='wait'>
                        <Button 
                            {...(isVideoPreloaded ? countdownMotion() : fadeInMotion(0.5, 0.5))}
                            text={isVideoPreloaded ? 'Compartir mi video' : 'Preparando video...'}
                            style='secondary'
                            onClick={ shareVideo }
                            isLoad={ isLoad }
                            disabled={ isVideoPreloaded }
                            key={ `preload-${isVideoPreloaded}` }
                        />
                    </AnimatePresence>
                    <Button
                        {...fadeInMotion(0.6, 0.6)}
                        text='Seguir sin compartir'
                        style='primary'
                        onClick={ hanldeNavigate }
                    />
                </div>
            </article>
        </motion.section>
    )
}

export { ShareVideo }