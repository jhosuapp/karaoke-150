import { fadeInMotion } from '../../../../shared/motion';
import { Button, Carousel, Container, Wrapper } from '../../../../shared/components';

import styles from './instructions.module.css';
import { memo, useState } from 'react';
import { ResponseAdminContentInterface } from '../../../../shared/interfaces';
import { useLoaderData } from 'react-router-dom';
import { IMAGES_PATH } from '../../../../router/routes.constant';

type Props = {
    handlePlaying: ()=> void;
}

const Instructions = memo(({ handlePlaying }:Props) => {
    const loaderData:ResponseAdminContentInterface = useLoaderData();
    const instructions = loaderData?.data?.instrucciones;
    console.log(instructions);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handleClickPlaying = ()=> {
        setIsPlaying(true);
        handlePlaying();
    }

    return (
        <Wrapper
            srcIcon={ `${IMAGES_PATH}${instructions?.img?.imgurl_raw}` }
            title={instructions?.tit}
            description1={ instructions?.desc }
        >
            <div className={ styles.instructions__cta }>
                <Button
                    {...fadeInMotion(0.6, 0.6)}
                    className='mt-4'
                    onClick={ handleClickPlaying } 
                    text={instructions?.btn}
                    style="secondary"
                    disabled={ !isPlaying }
                />
            </div>
            <Container>
                <Carousel
                    title={instructions?.tit2}
                    slidesData={ instructions?.items }
                />
            </Container>
        </Wrapper>
    )
})

export { Instructions }