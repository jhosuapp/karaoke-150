import { fadeInMotion } from '../../../../shared/motion';
import { Button, Wrapper } from '../../../../shared/components';

import { ResponseAdminContentInterface } from '../../../../shared/interfaces';
import { useLoaderData } from 'react-router-dom';
import { IMAGES_PATH } from '../../../../router/routes.constant';

type Props = {
    handlePermissions: ()=> void;
}

const SuccessCode = ({ handlePermissions }:Props) => {
    const loaderData:ResponseAdminContentInterface = useLoaderData();
    const code = loaderData?.data?.codigo;


    return (
        <Wrapper
            srcIcon={ `${IMAGES_PATH}${code?.img?.imgurl_raw}` }
            title={code?.title}
            description1={code?.desc}
            iconIsBig
        >
            <div>
                <Button
                    {...fadeInMotion(0.6, 0.6)}
                    className='mt-5'
                    onClick={ handlePermissions } 
                    text={ code?.btn }
                    style="secondary"
                />
            </div>
        </Wrapper>
    )
}

export { SuccessCode }