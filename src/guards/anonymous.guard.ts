import { LoaderFunction } from "react-router-dom";
import { getAdminContentAction } from "../shared/actions";
import Swal from "sweetalert2";
import { defaultPropsSwalUnexpected } from "../shared/constants";
import { sanitizeResponse } from "../shared/utilities";

let adminContent = null;

const anonymous = (): LoaderFunction => async () => {

    if(!adminContent){
        try {
            const response = await getAdminContentAction();
            adminContent = sanitizeResponse(response);
            return adminContent;
        } catch (error) {
            Swal.fire({
                ...defaultPropsSwalUnexpected,
                title: 'Error al obtener los datos del sitio',
                text: 'Intentálo de nuevo más adelante',
            })
            
            return {
                adminContent: null
            };
        } 
    } else {
        return adminContent;
    }
};
  
export { anonymous };