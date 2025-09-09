export const cleanHTML = (input: string): string => {
    if (!input) return "";
    // Eliminar etiquetas HTML y espacios innecesarios
    return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
};