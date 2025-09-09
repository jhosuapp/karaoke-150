import { motion } from 'framer-motion';
import { Bg, Carousel, Container, EnterCode, Video, WrapperTables } from "../../../shared/components"
import { ImageText } from "../../../shared/components/imageText/ImageText";
import { Header } from "../../../shared/layout/header/Header"
import { fadeInMotion } from "../../../shared/motion";

import portrait from '/assets/tmp/portrait-video.jpg';
import title from '/assets/tmp/title-home.png';
import { useLoaderData } from 'react-router-dom';
import { ResponseAdminContentInterface } from '../../../shared/interfaces';


const slidesData = [
    {
        asset: '/assets/tmp/award-1.png',
        description: 'Compra tu Águila Light y encuentra el código bajo la tapa.'
    },
    {
        asset: '/assets/tmp/award-1.png',
        description: 'Compra tu Águila Light y encuentra el código bajo la tapa.'
    },
    {
        asset: '/assets/tmp/award-1.png',
        description: 'Compra tu Águila Light y encuentra el código bajo la tapa.'
    },
    {
        asset: '/assets/tmp/award-1.png',
        description: 'Compra tu Águila Light y encuentra el código bajo la tapa.'
    },
]

const HomeView = () => {
    const loaderData:ResponseAdminContentInterface = useLoaderData();
    const banner = loaderData?.data?.banner;
    const awards = loaderData?.data?.premios;

    return (
        <>
            <Header 
                hasItemRight
                text="Login"
                hasRedirect
            />
            <Bg />

            <Container 
                {...fadeInMotion(0.1,0.1)}
                className="my-10"
            >
                <ImageText src={ title } />
            </Container>

            <Container 
                {...fadeInMotion(0.2,0.2)}
                className="!w-full"
            >
                <motion.article 
                    {...fadeInMotion(0.3,0.3)}
                    className="w-full mt-10"
                >
                    <Video portrait={ portrait } />
                </motion.article>
                <motion.article 
                    {...fadeInMotion(0.4,0.4)}
                    className="w-[90%] mx-auto block mt-5 mb-10"
                >
                    <p className="global-dsc">{ banner?.desc }</p>
                </motion.article>
            </Container>

            <Container>
                {/* Enter code */}
                <EnterCode
                    text={ banner?.button }
                    placeholder={ banner?.label_field }
                    key={'code'}
                />
                {/* End Enter code */}

                {/* Awards */}
                <Carousel 
                    title="los premios"
                    description={ awards?.desc }
                    key={'carousel'}
                    slidesData={ slidesData }
                    isFull
                />
                {/* End awards */}

                {/* Ranking data */}
                <WrapperTables
                    headItems={['Posición', 'Nombre', 'Puntaje']}
                    className="pb-16 pt-8"
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
                    <h2 className="global-title">Ranking</h2>
                    <p className="global-dsc mt-5 mb-6">Ellos ya la están rompiendo ¿Qué esperas para sumarte a este top?</p>
                </WrapperTables>
                {/* End Ranking data */}
            </Container>
        </>
    )
}

export { HomeView }