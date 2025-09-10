import { motion } from 'framer-motion';
import { Bg, Carousel, Container, EnterCode, ImageText, Video, WrapperTables } from "../../../shared/components"
import { Header } from "../../../shared/layout/header/Header"
import { fadeInMotion } from "../../../shared/motion";

import title from '/assets/tmp/title-home.png';
import { useLoaderData } from 'react-router-dom';
import { ResponseAdminContentInterface } from '../../../shared/interfaces';
import { IMAGES_PATH } from '../../../router/routes.constant';


const HomeView = () => {
    const loaderData:ResponseAdminContentInterface = useLoaderData();
    const banner = loaderData?.data?.banner;
    const awards = loaderData?.data?.premios;
    const ranking = loaderData?.data?.ranking;

    return (
        <>
            <Header 
                hasItemRight
                text="Login"
                hasRedirect
            />
            
            <Bg 
                className='min-h-svh'
                src={ `${IMAGES_PATH}${banner?.banner?.imgurl_raw}` } 
                isAbsolute
            />

            <Container 
                {...fadeInMotion(0.1,0.1)}
                className="my-1 !min-h-[calc(90svh-45px)] flex flex-col justify-between"
            >
                <motion.article 
                    {...fadeInMotion(0.2,0.2)}
                    className="w-[90%] mx-auto block mt-5 mb-10"
                >
                    <ImageText src={ title } />
                </motion.article>
                <motion.article 
                    {...fadeInMotion(0.3,0.3)}
                    className="w-[90%] mx-auto block mt-5 mb-10"
                >
                    <p className="global-dsc mb-4">{ banner?.desc }</p>
                    {/* Enter code */}
                    <EnterCode
                        text={ banner?.button }
                        placeholder={ banner?.label_field }
                        key={'code'}
                    />
                    {/* End Enter code */}
                </motion.article>
            </Container>

            <Container 
                {...fadeInMotion(0.4,0.4)}
                className="!w-full !max-w-full"
            >
                <Video portrait={ `${IMAGES_PATH}${banner?.portada?.imgurl_raw}` } />
            </Container>

            <Container>
                {/* Awards */}
                {awards?.act === "1" && (
                    <Carousel 
                        title={ awards?.title }
                        description={ awards?.desc }
                        key={'carousel'}
                        slidesData={ awards?.items }
                        isFull
                    />
                )}
                {/* End awards */}

                {/* Ranking data */}
                <WrapperTables
                    headItems={['Posición', 'Nombre', 'Puntaje']}
                    className="pb-16 pt-0"
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
                    <h2 className="global-title">{ ranking?.title }</h2>
                    <p className="global-dsc mt-5 mb-6">{ ranking?.desc }</p>
                </WrapperTables>
                {/* End Ranking data */}
            </Container>
        </>
    )
}

export { HomeView }