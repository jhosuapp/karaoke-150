import { Bg, Container } from "../../../shared/components"
import { Header } from "../../../shared/layout/header/Header";
import { FormShareUrl } from "../components";

const ShareUrlView = () => {
    return (
        <section>
            <Header />
             <Bg />
            <Container>
                <FormShareUrl />
            </Container>
        </section>
    )
}

export { ShareUrlView }