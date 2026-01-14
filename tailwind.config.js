/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Light mode - grayscale
                background: '#FFFFFF',
                foreground: '#171717',
                muted: '#F5F5F5',
                'muted-foreground': '#737373',
                border: '#E5E5E5',
                ring: '#171717',
                // Dark mode - grayscale
                'background-dark': '#0A0A0A',
                'foreground-dark': '#FAFAFA',
                'muted-dark': '#262626',
                'muted-foreground-dark': '#A3A3A3',
                'border-dark': '#404040',
                'ring-dark': '#FAFAFA',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'pill': '9999px',
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
                lg: '0.5rem',
                md: '0.375rem',
                sm: '0.25rem',
            },
            boxShadow: {
                'card': '0 1px 2px 0 rgba(0,0,0,0.1), 0 1px 3px 1px rgba(0,0,0,0.05)',
                'card-hover': '0 1px 3px 0 rgba(0,0,0,0.1), 0 4px 8px 3px rgba(0,0,0,0.1)',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}
