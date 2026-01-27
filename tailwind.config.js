// tailwind.config.js
module.exports = {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'nav-dark': '#121212',
                // Theme-aware colors - keeping blue for accents
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                },
                // Neutral monochromatic greys (0% saturation)
                gray: {
                    50: '#FAFAFA',
                    100: '#F4F4F5',
                    200: '#E4E4E7',
                    300: '#D4D4D8',
                    400: '#A1A1AA',
                    500: '#71717A',
                    600: '#52525B',
                    700: '#3F3F46',
                    800: '#27272A',
                    850: '#1E1E1E',
                    900: '#121212',
                    950: '#09090B',
                },
                green: {
                    400: '#4ade80',
                    500: '#22c55e',
                    900: '#14532d',
                },
                blue: {
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    900: '#1e3a8a',
                }
            },
            fontFamily: {
                sans: ['Gafata', 'Arial', 'Helvetica', 'sans-serif'],
            },
            animation: {
                'theme-transition': 'theme-transition 0.3s ease-in-out',
                'fade-in': 'fade-in 0.2s ease-in-out',
                'slide-in': 'slide-in 0.3s ease-out',
            },
            keyframes: {
                'theme-transition': {
                    '0%': { opacity: '0.8' },
                    '100%': { opacity: '1' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'slide-in': {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            },
            transitionProperty: {
                'theme': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
            }
        }
    },
    plugins: [],
}
