<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

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
const router = useRouter()
const route = useRoute()


function scrollToSection (sectionId) {
    mobileOpen.value = false
    if (route.path !== '/') {
        // Go to home and scroll after navigation (use query param)
        router.push({ path: '/', query: { scrollTo: sectionId } })
    } else {
        setTimeout(() => {
            scrollToSectionWithOffset(sectionId, getNavbarHeight())
        }, 100)
    }
}

// Helper: get navbar height dynamically
function getNavbarHeight () {
    const nav = document.querySelector('nav')
    return nav ? nav.offsetHeight : 70
}

// Helper: scroll with offset for sticky/fixed nav
function scrollToSectionWithOffset (sectionId, offset = 0) {
    const section = document.getElementById(sectionId)
    if (!section) return
    const y = section.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
}

</script>

<template>
    <nav class="fixed top-0 z-50 w-full bg-gray-300 dark:bg-[#252525] border-b border-gray-200 dark:border-gray-600
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
                    class="h-8 w-8 sm:h-8 sm:w-8 rounded-full border border-white dark:border-white" alt="Logo" />
                <span
                    class="font-semibold text-base sm:text-xl tracking-tight text-blue-600 dark:text-white select-none ml-1 sm:ml-2 mr-2 sm:mr-4">
                    Gaurav Jiandani
                </span>
            </div>

            <!-- RIGHT: Nav + Dark Toggle -->
            <div class="flex-1 flex items-center justify-end space-x-1 sm:space-x-2">
                <!-- Dark Mode Toggle -->
                <button @click="toggleDarkMode"
                    class="inline-flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full transition focus:outline-none hover:bg-gray-300 dark:hover:bg-gray-700">
                    <span class="sr-only">Toggle dark mode</span>
                    <transition name="fade" mode="out-in">
                        <svg v-if="!isDarkModeOn" key="light"
                            class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-300 transition-all duration-300"
                            viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z"
                                fill="currentColor" />
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
                        text-blue-600 dark:text-white hover:text-blue-700 dark:hover:text-white focus:outline-none">
                        <span>{{ item.text }}</span>
                        <span class="absolute left-1/2 -bottom-1 w-0 group-hover:w-2/3 transition-all duration-400
                            border-b-2 border-blue-600 " style="transform: translateX(-50%);"></span>
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
