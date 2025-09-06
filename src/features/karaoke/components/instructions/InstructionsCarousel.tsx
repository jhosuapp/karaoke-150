import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

import { fadeInMotion } from '../../../../shared/motion';
import { Container } from '../../../../shared/components';

import styles from './instructions.module.css';
import iconLeft from '/assets/icon-arrow-left-update.svg';
import iconRight from '/assets/icon-arrow-right-update.svg';

const slidesData = [
    {
        asset: '/assets/tmp/icon-instructions-1.png',
        description: 'Alístate para grabar tu video en un lugar sin ruido.'
    },
    {
        asset: '/assets/tmp/icon-instructions-2.png',
        description: 'Acepta los permisos de audio y video.'
    },
    {
        asset: '/assets/tmp/icon-instructions-3.png',
        description: 'Canta cuando te lo indiquemos y sigue bien la letra.'
    },
    {
        asset: '/assets/tmp/icon-instructions-4.png',
        description: 'Comparte tu video y duplica tus puntos'
    },
]

const InstructionsCarousel = () => {

    return (
        <>
            <motion.section 
                {...fadeInMotion(0.7, 0.7)}
                className={ styles.InstructionsCarousel }
            >
                <Container 
                    {...fadeInMotion(0.9, 0.9)}
                    className={ styles.InstructionsCarousel__content }
                >
                    <h2 className='global-title global-title--secondary'>Instructivo</h2>
                    <Swiper
                        className={ styles.InstructionsCarousel__swiper }
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
                    {slidesData.map((item, i) => (
                        <SwiperSlide key={i} className={ styles.InstructionsCarousel__swiper__item }>
                            <picture>
                                <img src={ item.asset } alt="" />
                            </picture>
                            <p className="global-dsc">
                                {item.description}
                            </p>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                    {/* Botones personalizados */}
                    <div className={ styles.InstructionsCarousel__controls }>
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className='custom-prev'
                        >
                            <img src={ iconLeft } alt="" />
                        </motion.button>
                        <motion.button 
                            whileTap={{ scale: 0.95 }}
                            className='custom-next'
                        >
                            <img src={ iconRight } alt="" />
                        </motion.button>
                    </div>
                </Container>
            </motion.section>
        </>
    );
}

export { InstructionsCarousel }