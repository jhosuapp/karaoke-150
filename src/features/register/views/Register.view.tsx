import { Bg, Container } from "../../../shared/components"
import { Header } from "../../../shared/layout/header/Header";
import { Form } from '../components';

const RegisterView = () => {

    return (
        <section>
            <Header />
            <Bg />
            <Container>
                <Form />
            </Container>
        </section>
    )
}

export { RegisterView }