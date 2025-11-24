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
                primary: '#1a73e8',
                background: '#FFFFFF',
                surface: '#F8F9FA',
                text: '#3C4043',
                // Dark mode colors
                'background-dark': '#202124',
                'surface-dark': '#292a2d',
                'text-dark': '#e8eaed',
            },
            fontFamily: {
                sans: ['Roboto', 'Open Sans', 'sans-serif'],
            },
            borderRadius: {
                'pill': '9999px',
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
            },
            boxShadow: {
                'card': '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
                'card-hover': '0 1px 3px 0 rgba(60,64,67,0.3), 0 4px 8px 3px rgba(60,64,67,0.15)',
            },
        },
    },
    plugins: [],
}
