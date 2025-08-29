
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#002D6E',
                secondary: '#FFEB00',
                tertiary: '#028EC8',
                cuartary: '#001E5A',
                neutral: {
                black: '#202020',
                white: '#FAFAFA',
                },
                feedback: {
                    error: {
                        'dark-01': '#C9201D',
                        'dark-02': '#FF6F71',
                        'dark-03': '#FFE3E7',
                    },
                    success: {
                        'dark-01': '#29D36B',
                    },
                },
            },
            fontSize: {
                title: '32px',
                titleb: '38px',
                button: '20px',
                description: '22px',
                buttonMobile: '18px',

            },
            fontFamily: {
                futura: ["FuturaStd", "sans-serif"],
            },
            keyframes: {
                fadeIn: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 },
                },
            },
            animation: {
                fadeIn: 'fadeIn 1s ease',
            },
            borderRadius: {
                md: '0.5rem',
                lg: '1.5rem',
            },
            gap: {
                lg: '1.5rem',
                s: '0.5rem',
            },
            padding: {
                lg: '1.5rem',
            },
            width: {
                limit: '1500px',
            },
            maxWidth: {
                limit: '576px'
            }
        },
    },
    safelist: [
        { pattern: /^w-/ },
        { pattern: /^h-/ },
        { pattern: /^max-w-/ },
        { pattern: /^max-h-/ },
        { pattern: /^bg-/ },
        { pattern: /^text-/ },
    ],
};