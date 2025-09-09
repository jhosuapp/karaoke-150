export const allowOnlyNumbers = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const key = event.key;

    if (
        key === 'Backspace' ||
        key === 'Delete' ||
        key === 'ArrowLeft' ||
        key === 'ArrowRight' ||
        key === 'Tab'
    ) {
        return;
    }

    if (!/^\d$/.test(key)) {
        event.preventDefault();
    }
};