import { SweetAlertOptions } from "sweetalert2";

export const defaultPropsSwalUnexpected:SweetAlertOptions = {
    icon: 'error',
    title: 'Ocurrio un error inesperado',
    text: 'Intenta nuevamente más tarde.',
    confirmButtonText: 'Continuar',
    customClass: {
        confirmButton: 'px-4 py-2 rounded min-w-[200px] bg-primary text-white',
    },
    buttonsStyling: false,
}