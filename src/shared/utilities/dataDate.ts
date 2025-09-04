
//List months, days and years
interface Option {
    value: string;
    name: string;
}

export const renderDate = ()=> {
    const today = new Date();
    const currentYear = today.getFullYear();
    const minYear = currentYear - 100;  
    const maxYear = currentYear - 18;  
  
    // Función para formatear números menores a 10 con "0" al inicio
    function formatNumber(num: number): string {
      return num < 10 ? "0" + num : num.toString();
    }
  
    // Years
    const years: Option[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      years.push({ value: y.toString(), name: y.toString() });
    }
  
    // Months
    const months: Option[] = [];
    for (let m = 1; m <= 12; m++) {
      months.push({ value: formatNumber(m), name: formatNumber(m) });
    }
  
    // Days
    const days: Option[] = [];
    for (let d = 1; d <= 31; d++) {
      days.push({ value: formatNumber(d), name: formatNumber(d) });
    }
  
    return {
        day: days,
        month: months,
        year: years
    };
}

export const isAlegalAge = (birthdateDinamic:string) => {
    const [day, month, year] = birthdateDinamic.split("-").map(Number);

    const birthdate = new Date(year, month - 1, day);

    const currentDate = new Date();

    let edad = currentDate.getFullYear() - birthdate.getFullYear();

    const thisYear = new Date(currentDate.getFullYear(), month - 1, day);
    if (currentDate < thisYear) {
        edad--;
    }
    
    return edad >= 18;
}