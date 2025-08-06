<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const isDarkModeOn = computed(() => store.state.darkMode)
const toggleDarkMode = () => store.commit('toggleDarkMode')

const navItems = [
    { text: "Experiences", section: "experiences" },
    { text: "Live Projects", section: "projects" },
    { text: "Timeline", section: "timeline" },
    { text: "Achievements", section: "achievements" },
    { text: "Skills", section: "skills" }
]

const mobileOpen = ref(false)
function scrollToSection (sectionId) {
    mobileOpen.value = false
    setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) section.scrollIntoView({ behavior: 'smooth' })
    }, 100)
}
</script>

<template>
    <nav class="fixed top-0 z-50 w-full bg-white dark:bg-[#252525] border-b border-gray-200 dark:border-gray-600
      shadow-xl backdrop-blur-lg transition-colors duration-300">
        <div class="w-full lg:max-w-screen-2xl mx-auto flex items-center px-2 sm:px-6 h-12 sm:h-16">
            <!-- LEFT: Sidebar Toggle, Logo, Brand -->
            <div class="flex items-center space-x-2 flex-shrink-0">
                <button
                    class="inline-flex items-center justify-center rounded-lg p-1 sm:p-2 transition hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none"
                    @click="$emit('drawer')" aria-label="Open sidebar">
                    <svg class="w-5 h-5 sm:w-7 sm:h-7 text-blue-600 dark:text-white" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <img src="/static/profile.jpeg"
                    class="h-8 w-8 sm:h-8 sm:w-8 rounded-full border border-blue-600 dark:border-white" alt="Logo" />
                <span
                    class="font-semibold text-base sm:text-xl tracking-tight text-blue-600 dark:text-white select-none ml-1 sm:ml-2 mr-2 sm:mr-4">
                    Gaurav Jiandani
                </span>
            </div>

            <!-- RIGHT: Nav + Dark Toggle -->
            <div class="flex-1 flex items-center justify-end space-x-1 sm:space-x-2">
                <!-- Dark Mode Toggle -->
                <button @click="toggleDarkMode"
                    class="inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full transition focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700">
                    <span class="sr-only">Toggle dark mode</span>
                    <transition name="fade" mode="out-in">
                        <svg v-if="!isDarkModeOn" key="light"
  class="w-5 h-5 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-300 transition-all duration-300"
  viewBox="0 0 24 24" fill="currentColor">
  <path
    d="M21 15.5A9 9 0 1 1 12.5 3
       a7 7 0 1 0 8.5 12.5z"
    fill="currentColor"
  />
</svg>


                        <svg v-else key="dark" class="w-5 h-5 sm:w-7 sm:h-7 text-yellow-400" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none" />
                            <path stroke="currentColor" stroke-width="2"
                                d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364 6.364l-1.414-1.414M7.05 7.05 5.636 5.636m12.728 0-1.414 1.414M7.05 16.95l-1.414 1.414" />
                        </svg>
                    </transition>
                </button>

                <!-- Desktop Nav Items -->
                <div class="hidden md:flex items-center space-x-0.5 sm:space-x-1 ml-2 sm:ml-6">
                    <button v-for="item in navItems" :key="item.text" @click="scrollToSection(item.section)" class="relative group px-2 sm:px-3 py-0 font-semibold text-xs sm:text-base transition-all duration-400
                        text-blue-600 dark:text-white hover:text-black dark:hover:text-white focus:outline-none">
                        <span>{{ item.text }}</span>
                        <span class="absolute left-1/2 -bottom-1 w-0 group-hover:w-2/3 transition-all duration-400
                            border-b-2 border-blue-600 "
                            style="transform: translateX(-50%);"></span>
                    </button>
                </div>

                <!-- Mobile: Right Arrow Toggle (Chevron) -->
                <button @click="mobileOpen = !mobileOpen"
                    class="inline-flex md:hidden items-center justify-center rounded-lg p-1 ml-1 sm:p-2 sm:ml-2 transition hover:bg-blue-50 dark:hover:bg-gray-700 focus:outline-none"
                    :aria-expanded="mobileOpen" aria-label="Open main menu">
                    <svg :class="[
                        'w-5 h-5 sm:w-7 sm:h-7 transition-transform duration-300',
                        mobileOpen ? 'rotate-90 text-blue-600 dark:text-white' : 'rotate-0 text-blue-600 dark:text-white'
                    ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Nav Drawer -->
        <transition name="slide-down">
            <div v-if="mobileOpen"
                class="md:hidden bg-white dark:bg-[#1b1b1b] border-t border-gray-200 dark:border-blue-900 shadow-xl transition-all duration-300">
                <div class="flex flex-col p-2">
                    <button v-for="item in navItems" :key="item.text" @click="scrollToSection(item.section)" class="block text-left px-3 py-2 mb-1 font-semibold text-sm rounded-lg transition-all duration-200
                        text-blue-600 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/70 focus:outline-none">
                        {{ item.text }}
                    </button>
                </div>
            </div>
        </transition>
    </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
    transition: max-height 0.4s cubic-bezier(0.86, 0, 0.07, 1), opacity 0.3s;
}

.slide-down-enter-from,
.slide-down-leave-to {
    max-height: 0;
    opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
    max-height: 400px;
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
html {
  scroll-behavior: smooth;
}

</style>
