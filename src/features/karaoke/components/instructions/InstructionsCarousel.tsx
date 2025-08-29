import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y, EffectFade } from 'swiper/modules';
import { WrapperIcon } from '../../../../shared/components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/effect-fade";

import styles from './instructions.module.css';
import bg from '../../../../config/assets/tmp/bg-steps-update.png';
import icon from '../../../../config/assets/tmp/icon-inst.png';
import iconLeft from '../../../../config/assets/icon-arrow-left.svg';
import iconRight from '../../../../config/assets/icon-arrow-right.svg';
import iconMicro from '../../../../config/assets/tmp/micro.png';
import { fadeInMotion } from '../../../../shared/motion';

const InstructionsCarousel = () => {
    const slides = [1, 2, 3, 4, 5];

    return (
        <>
            <motion.section 
                {...fadeInMotion(0.7, 0.7)}
                className={ styles.InstructionsCarousel }
            >
                <motion.picture 
                    {...fadeInMotion(0.8, 0.8)}
                    className={ styles.InstructionsCarousel__bg }
                >
                    <img src={ bg } alt="" />
                </motion.picture>
                <motion.article 
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
                            <WrapperIcon style={'secondary'} src={ icon } />
                            <p className="global-dsc global-dsc--secondary">
                                Habilita los permisos de tu cámara y micrófono {n}
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
                </motion.article>
            </motion.section>
            <motion.section 
                {...fadeInMotion(1, 1)}
                className={ styles.InstructionsCarousel__divider }
            >
                <img src={ iconMicro } alt="" />
            </motion.section>
        </>
    );
}

export { InstructionsCarousel }