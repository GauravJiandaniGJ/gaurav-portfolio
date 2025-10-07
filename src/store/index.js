import { createStore } from 'vuex'

// Auto-adaptive theme detection
function getInitialTheme() {
    // Clear any existing theme preference to force auto-adaptation
    localStorage.removeItem('theme')
    localStorage.removeItem('darkMode')

    // Auto-adapt to device theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark'
    }

    return 'light'
}

// Legacy support for old darkMode localStorage
const darkModeLS = localStorage.getItem('darkMode')
if (darkModeLS !== null) {
    const oldDarkMode = JSON.parse(darkModeLS)
    localStorage.setItem('theme', oldDarkMode ? 'dark' : 'light')
    localStorage.removeItem('darkMode')
}

export default createStore({
    state: {
        theme: getInitialTheme()
    },
    getters: {
        isDarkMode: (state) => state.theme === 'dark',
        isLightMode: (state) => state.theme === 'light'
    },
    mutations: {
        setTheme(state, theme) {
            if (theme === 'light' || theme === 'dark') {
                state.theme = theme
                localStorage.setItem('theme', theme)
            }
        },
        toggleTheme(state) {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
            localStorage.setItem('theme', state.theme)
        }
    }
})
