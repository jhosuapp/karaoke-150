import { motion } from 'framer-motion';
import { fadeInMotion } from '../../../../shared/motion';

import { ImageText } from '../../../../shared/components/imageText/ImageText';
import { AnimatedCounter, WrapperIcon } from '../../../../shared/components';
import { defPath } from '../../../../config';

const ResumePoints = () => {
    return (
        <motion.section
            {...fadeInMotion(0.2,0.2)}
        >
            <ImageText src={ `${defPath}/tmp/welcome-up-title.png` } />
            <motion.div 
                {...fadeInMotion(0.3,0.3)}
                className="my-10"
            >
                <p className='global-subtitle mb-4'>Tu mejor puntaje es</p>
                <WrapperIcon>
                    <AnimatedCounter value={234567} className='global-points' />
                </WrapperIcon>
            </motion.div>
        </motion.section>
    )
}

export { ResumePoints }