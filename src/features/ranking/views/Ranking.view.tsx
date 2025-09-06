import { Bg, Container, EnterCode } from "../../../shared/components"
import { Header } from "../../../shared/layout/header/Header"

const RankingView = () => {
    return (
        <section>
            <Header 
                hasItemRight
                text="¡Hola!"
            />
            <Bg />
            <Container>
                <EnterCode
                    text="Jugar de nuevo"
                />
            </Container>
        </section>
    )
}

export { RankingView }