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
import icon from '/assets/tmp/icon-2.png';
import iconLeft from '/assets/icon-arrow-left-update.svg';
import iconRight from '/assets/icon-arrow-right-update.svg';

const InstructionsCarousel = () => {
    const slides = [1, 2, 3, 4, 5];

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
                        loop
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
                    {slides.map((n) => (
                        <SwiperSlide key={n} className={ styles.InstructionsCarousel__swiper__item }>
                            <picture>
                                <img src={ icon } alt="" />
                            </picture>
                            <p className="global-dsc">
                                Alístate para grabar tu video en un lugar sin ruido. { n }
                            </p>
                        </SwiperSlide>
                    ))}
                    </Swiper>
                    {/* Botones personalizados */}
                    <div className={ styles.InstructionsCarousel__controls }>
                        <button className='custom-prev'>
                            <img src={ iconLeft } alt="" />
                        </button>
                        <button className='custom-next'>
                            <img src={ iconRight } alt="" />
                        </button>
                    </div>
                </Container>
            </motion.section>
        </>
    );
}

export { InstructionsCarousel }