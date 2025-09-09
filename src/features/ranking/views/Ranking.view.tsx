import { Bg, Container, EnterCode, ImageText, WrapperTables } from "../../../shared/components"
import { Header } from "../../../shared/layout/header/Header"

import gameTitle from '/assets/tmp/game-title.png';
import topTitle from '/assets/tmp/top-title.png';
import positionTitle from '/assets/tmp/position-title.png';
import { ResumePoints } from "../components";
import { AnimatePresence } from "framer-motion";


const RankingView = () => {
    return (
        <>
            <Header 
                hasItemRight
                text="¡Hola!"
            />
            <Bg />
            <Container key={'code'}>
                <AnimatePresence mode="wait">

                {/* Resume points */}
                <ResumePoints key={'points'} />
                {/* End Resume points */}

                {/* My position data */}
                <WrapperTables
                    headItems={['Posición', 'Puntaje']}
                    className="py-16"
                    bodyItemTertiary={{ position: '134', score: 1231232 }}
                    key={'position'}
                >
                    <ImageText src={ positionTitle } />
                </WrapperTables>
                {/* End My position data */}

                {/* Enter code */}
                <EnterCode
                    text="Jugar de nuevo"
                    hasTitle
                    key={'code'}
                />
                {/* End Enter code */}

                {/* My games data */}
                <WrapperTables
                    headItems={['Fecha', 'Puntaje']}
                    className="pt-16"
                    bodyItemsSecondary={[
                        { date: '01/jun/25', score: 233123 },
                        { date: '02/jun/25', score: 2433123 },
                        { date: '03/jun/25', score: 2343123 },
                    ]}
                    key={'games'}
                >
                    <ImageText src={ gameTitle } />
                </WrapperTables>
                {/* End My games data */}

                {/* Ranking data */}
                <WrapperTables
                    headItems={['Posición', 'Nombre', 'Puntaje']}
                    className="py-16"
                    bodyItemsPrimary={[
                        { position: '01', name: 'Pepito Pérez', score: 233123 },
                        { position: '02', name: 'Juanita Gómez', score: 120000 },
                        { position: '03', name: 'Dana Cortés', score: 120000 },
                        { position: '04', name: 'Santiago Cortés', score: 120000 },
                        { position: '05', name: 'Deisy Rinta', score: 120000 },
                        { position: '06', name: 'Jhosua Penagos', score: 120000 },
                        { position: '07', name: 'Jhosua Penagos', score: 120000 },
                        { position: '08', name: 'Jhosua Penagos', score: 120000 },
                        { position: '09', name: 'Jhosua Penagos', score: 120000 },
                        { position: '10', name: 'Jhosua Penagos', score: 120000 },
                    ]}
                    key={'ranking'}
                >
                    <ImageText src={ topTitle } />
                </WrapperTables>
                {/* End Ranking data */}
                </AnimatePresence>
            </Container>
        </>
    )
}

export { RankingView }