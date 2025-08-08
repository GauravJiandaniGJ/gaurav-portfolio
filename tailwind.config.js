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
                'nav-dark': '#19202c'
            },
            fontFamily: {
                sans: ['Libertinus_Sans', 'Arial', 'Helvetica', 'sans-serif'],
            }
        }
    },
    plugins: [],
}
