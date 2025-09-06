import { motion } from 'framer-motion';
import { fadeInMotion } from '../../../../shared/motion';

import welcomeTitle from '/assets/tmp/welcome-up-title.png';
import { ImageText } from '../../../../shared/components/imageText/ImageText';
import { AnimatedCounter, WrapperIcon } from '../../../../shared/components';

const ResumePoints = () => {
    return (
        <motion.section
            {...fadeInMotion(0.2,0.2)}
        >
            <ImageText src={ welcomeTitle } />
            <motion.div 
                {...fadeInMotion(0.3,0.3)}
                className="my-10"
            >
                <p className='global-subtitle mb-4'>Tu mejor puntaje es</p>
                <WrapperIcon>
                    <AnimatedCounter value={234567} className='global-points !text-[#F1D501]' />
                </WrapperIcon>
            </motion.div>
        </motion.section>
    )
}

export { ResumePoints }