// utils/formatFecha.ts
export type FormatoFecha =
  | 'DD/MMM/YY'       // 01/Oct/25
  | 'DD/MMMM/YYYY'    // 01/Octubre/2025
  | 'DD/MM/YYYY'      // 01/10/2025
  | 'DD/MM/YY';       // 01/10/25

const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const formatFecha = (fechaISO: string, formato: FormatoFecha = 'DD/MMM/YY'): string => {
  let date='';
  if (!fechaISO) return date;
  const fecha = new Date(fechaISO);
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mesIndex = fecha.getMonth();
  const mesNumero = String(mesIndex + 1).padStart(2, '0');
  const mesAbrev = meses[mesIndex].slice(0, 3);
  const mesCompleto = meses[mesIndex];
  const añoCompleto = fecha.getFullYear();
  const añoCorto = String(añoCompleto).slice(-2);
  switch (formato) {
    case 'DD/MMM/YY':
      date = `${dia}/${mesAbrev}/${añoCorto}`;
      break
    case 'DD/MMMM/YYYY':
      date = `${dia}/${mesCompleto}/${añoCompleto}`;
      break;
    case 'DD/MM/YYYY':
      date= `${dia}/${mesNumero}/${añoCompleto}`;
      break;
    case 'DD/MM/YY':
      date = `${dia}/${mesNumero}/${añoCorto}`;
      break
    default:
      date = fechaISO;
      break
  }
  return date;
}