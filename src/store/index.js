import { createStore } from 'vuex'

const darkModeLS = localStorage.getItem('darkMode')
const initialDarkMode = darkModeLS === null ? false : JSON.parse(darkModeLS)

export default createStore({
    state: {
        darkMode: initialDarkMode
    },
    mutations: {
        toggleDarkMode (state) {
            state.darkMode = !state.darkMode
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
        },
        setDarkMode (state, value) {
            state.darkMode = value
            localStorage.setItem('darkMode', JSON.stringify(state.darkMode))
        }
    }
})
