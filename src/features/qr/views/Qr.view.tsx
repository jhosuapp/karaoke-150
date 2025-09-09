import { motion } from 'framer-motion';

import { useLoaderData } from 'react-router-dom';
import { ResponseAdminContentInterface } from '../../../shared/interfaces';
import { Bg, Container, ImageText } from '../../../shared/components';
import { IMAGES_PATH } from '../../../router/routes.constant';

import styles from './qr.module.css';
import { fadeInMotion } from '../../../shared/motion';

const QrView = () => {
    const loaderData:ResponseAdminContentInterface = useLoaderData();
    const qrData = loaderData?.data?.only_mobile;

    return (
        <motion.section className={ styles.qr } {...fadeInMotion(0,0)}>
            <Bg src={ `${IMAGES_PATH}${qrData?.bg?.imgurl_raw}` } isFixed></Bg>
            <Container className={ styles.qr__content }>
                <motion.picture 
                    {...fadeInMotion(0.2, 0.2)}
                    className={ styles.qr__logo }
                >
                    <img src={ `${IMAGES_PATH}${qrData?.logo?.imgurl_raw}` } alt={qrData?.logo?.img_alt} />
                </motion.picture>
                <ImageText 
                    {...fadeInMotion(0.3, 0.3)}
                    src={ `${IMAGES_PATH}${qrData?.title?.imgurl_raw}` } 
                />
                <motion.p 
                    {...fadeInMotion(0.4, 0.4)}
                    className='global-dsc'
                >
                    { qrData?.desc }
                </motion.p>
                {qrData?.qr?.imgurl_raw && (
                    <motion.picture 
                        {...fadeInMotion(0.5, 0.5)}
                        className={ styles.qr__qr }
                    >
                        <img src={ `${IMAGES_PATH}${qrData?.qr?.imgurl_raw }` } alt={qrData?.logo?.img_alt} />
                    </motion.picture>
                )}
            </Container>
        </motion.section>
    )
}

export { QrView }