import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

import styles from './carousel.module.css';
import { fadeInMotion } from '../../motion';
import { ItemAdmincontent } from '../../interfaces';
import { IMAGES_PATH } from '../../../router/routes.constant';
import { defPath } from '../../../config';



type Props = {
    title: string;
    description?: string;
    slidesData: ItemAdmincontent[];
    isFull?: boolean;
}

const Carousel = ({title, description, slidesData, isFull = false}:Props) => {

    return (
        <>
            <motion.section 
                {...fadeInMotion(0.7, 0.7)}
                className={ `${styles.carousel} ${isFull && styles.carouselFull}` }
            >
                <motion.article
                    {...fadeInMotion(0.9, 0.9)}
                    className={ styles.carousel__content }
                >
                    <h2 className='global-title global-title--secondary'>{ title }</h2>
                    {description && <p className='global-dsc mt-5'>{ description }</p>}
                    <Swiper
                        className={ styles.carousel__swiper }
                        modules={[Navigation, Pagination, Keyboard, A11y, EffectFade]}
                        keyboard={{ enabled: true }}
                        spaceBetween={16}
                        slidesPerView={1}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        speed={1000}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                    >
                    {slidesData && slidesData?.map((item, i) => (
                        <SwiperSlide key={i} className={ styles.carousel__swiper__item }>
                            <picture>
                                <img src={`${IMAGES_PATH}${item?.img?.imgurl_raw}`} alt={ item?.img?.img_alt } />
                            </picture>
                            <p className="global-dsc">
                                {item?.desc}
                            </p>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                    {/* Botones personalizados */}
                    <div className={ styles.carousel__controls }>
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className='custom-prev'
                        >
                            <img src={ `${defPath}/icon-arrow-left.png` } alt="" />
                        </motion.button>
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className='custom-next'
                        >
                            <img src={ `${defPath}/icon-arrow-right.png` } alt="" />
                        </motion.button>
                    </div>
                </motion.article>
            </motion.section>
        </>
    );
}

export { Carousel }