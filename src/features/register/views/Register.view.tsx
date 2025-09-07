import { AnimatePresence } from "framer-motion";
import { Bg, Container } from "../../../shared/components"
import { Header } from "../../../shared/layout/header/Header";
import { FormRegister } from '../components';
import { useRegisterStore } from "../stores/register.store";
import { ShareVideo } from "../../../shared/components/shareVideo/ShareVideo";

const RegisterView = () => {
    const isSendRegisterForm = useRegisterStore( state => state.isSendRegisterForm);
    const registerData = useRegisterStore( state => state.registerData );

    return (
        <section>
            <Header />
            <Bg />
            <Container>
                <AnimatePresence mode='wait'>
                    {!isSendRegisterForm ? (
                        <ShareVideo userName={ registerData?.name } key={`share-${isSendRegisterForm}`} />
                    ) : (
                        <FormRegister key={`form-${isSendRegisterForm}`} />
                    )}
                </AnimatePresence>
            </Container>
        </section>
    )
}

export { RegisterView }