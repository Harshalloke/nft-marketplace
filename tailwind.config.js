/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#000000',
                'secondary': '#FFFFFF',
                'accent': '#7C3AED', // Brutalist Purple
                'neon-green': '#00FF41',
                'gray-dark': '#0A0A0A',
                'gray-mid': '#262626',
                'gray-light': '#E5E5E5',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Space Mono', 'monospace'],
            },
            boxShadow: {
                'brutal': '6px 6px 0px 0px #FFFFFF',
                'brutal-accent': '6px 6px 0px 0px #7C3AED',
                'brutal-black': '6px 6px 0px 0px #000000',
            },
            borderWidth: {
                '3': '3px',
            }
        },
    },
    plugins: [],
}
