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
                'nav-dark': '#19202c',
                // Theme-aware colors
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
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
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
