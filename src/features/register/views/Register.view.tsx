import { motion } from 'framer-motion';
import { Bg, Container } from "../../../shared/components"
import { Form } from '../components';
import { fadeInMotion } from '../../../shared/motion';

const RegisterView = () => {

    return (
        <motion.section
            {...fadeInMotion(0,0)}
        >
            <Bg />
            <Container>
                <Form />
            </Container>
        </motion.section>
    )
}

export { RegisterView }