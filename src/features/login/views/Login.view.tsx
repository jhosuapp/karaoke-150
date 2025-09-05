import { AnimatePresence } from "framer-motion";
import { Bg, Container } from "../../../shared/components"
import { Header } from "../../../shared/layout/header/Header";
import { FormLogin } from '../components';
import { useLoginStore } from "../stores/login.store";
import { ShareVideo } from "../../../shared/components/shareVideo/ShareVideo";

const LoginView = () => {
    const isSendLoginForm = useLoginStore( state => state.isSendLoginForm);
    
    return (
        <section>
            <Header />
            <Bg />
            <Container>
                <AnimatePresence mode='wait'>
                    {isSendLoginForm ? (
                        <ShareVideo userName={ 'John doe' } key={`share-${isSendLoginForm}`} />
                    ) : (
                        <FormLogin key={`form-${isSendLoginForm}`} />
                    )}
                </AnimatePresence>
            </Container>
        </section>
    )
}

export { LoginView }