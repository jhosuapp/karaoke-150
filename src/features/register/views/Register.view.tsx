import { AnimatePresence } from "framer-motion";
import { Bg, Container } from "../../../shared/components"
import { Header } from "../../../shared/layout/header/Header";
import { FormRegister, ShareVideo } from '../components';
import { useRegisterStore } from "../stores/register.store";

const RegisterView = () => {
    const isSendRegisterForm = useRegisterStore( state => state.isSendRegisterForm);

    return (
        <section>
            <Header />
            <Bg />
            <Container>
                <AnimatePresence mode='wait'>
                    {isSendRegisterForm ? (
                        <ShareVideo key={`share-${isSendRegisterForm}`} />
                    ) : (
                        <FormRegister key={`form-${isSendRegisterForm}`} />
                    )}
                </AnimatePresence>
            </Container>
        </section>
    )
}

export { RegisterView }