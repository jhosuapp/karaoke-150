import { Loader } from '../../../../shared/components';
import { PermissionsKaraoke } from '../../interfaces';

import styles from './permissions.module.css';
import iconSuccess from '/assets/icon-check.svg';
import iconError from '/assets/icon-error.svg';

type Props = {
    icon: string;
    requestPermissions: ()=> void;
    status: PermissionsKaraoke;
    text: string;
}

const PermissionsItem = ({ icon, status, text, requestPermissions }:Props) => {

    const hasStatus = status.isError || status.hasPermissions;
    

    return (
        <div className={ styles.permissions__item }>
            <div>
                <picture>
                    <img src={ icon } alt="icon" />
                </picture>
                <p>{ text }</p>
            </div>
            {status.isLoad ? (
                <Loader />
            ) : (
                <button 
                    onClick={  ()=> { !status.hasPermissions && requestPermissions() } }
                >
                    {!hasStatus && 'Aceptar'}
                    { status.hasPermissions && <img src={ iconSuccess } alt="icon success" /> }  
                    { status.isError && <img src={ iconError } alt="icon error" /> }  
                    {status.isError && 'Reintentar'}
                </button>
            )}
        </div>
    )
}

export { PermissionsItem }