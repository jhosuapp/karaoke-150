
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
                secondary: '#D8BB39',
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
                titles: '30px',
                title: '34px',
                titleb: '40px',
                subtitle: '20px',
                button: '20px',
                description: '22px',
                buttonMobile: '18px',
                points: '59px',
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
                limit: '576px',
                icon: '140px'
            },
            minHeight: {
                icon: '140px'
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