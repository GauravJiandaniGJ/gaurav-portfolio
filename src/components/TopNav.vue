<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const navItems = [
    { text: "Problems", section: "problems" },
    { text: "Approach", section: "engagement" },
    { text: "Results", section: "proof" },
    { text: "Case Studies", section: "case-studies" },
    { text: "Contact", section: "contact" }
]

const mobileOpen = ref(false)
const router = useRouter()
const route = useRoute()

function scrollToSection(sectionId) {
    mobileOpen.value = false
    if (route.path !== '/') {
        router.push({ path: '/', query: { scrollTo: sectionId } })
    } else {
        setTimeout(() => {
            scrollToSectionWithOffset(sectionId, getNavbarHeight())
        }, 100)
    }
}

function getNavbarHeight() {
    const nav = document.querySelector('nav')
    return nav ? nav.offsetHeight : 64
}

function scrollToSectionWithOffset(sectionId, offset = 0) {
    const section = document.getElementById(sectionId)
    if (!section) return
    const y = section.getBoundingClientRect().top + window.pageYOffset - offset
    window.scrollTo({ top: y, behavior: 'smooth' })
}

function closeMobileMenu() {
    mobileOpen.value = false
}
</script>

<template>
    <!-- Main Navbar - Fixed with high z-index -->
    <nav class="navbar-glass">
        <div class="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
            <!-- LEFT: Logo & Brand - Vertically centered -->
            <a href="/" class="flex items-center gap-3 flex-shrink-0">
                <img
                    src="/static/profile.jpeg"
                    class="h-7 w-7 rounded-full ring-2 ring-white/20 dark:ring-white/10"
                    alt="Gaurav Jiandani"
                />
                <span class="font-semibold text-[0.9375rem] tracking-[-0.02em] text-gray-900 dark:text-white select-none">
                    Gaurav Jiandani
                </span>
            </a>

            <!-- RIGHT: Desktop Nav + Theme Toggle - Vertically centered -->
            <div class="flex items-center">
                <!-- Desktop Nav Items with increased spacing -->
                <div class="hidden md:flex items-center gap-1 lg:gap-2">
                    <button
                        v-for="item in navItems"
                        :key="item.text"
                        @click="scrollToSection(item.section)"
                        class="nav-link"
                    >
                        {{ item.text }}
                    </button>
                </div>

                <!-- Separator -->
                <div class="hidden md:block w-px h-5 bg-gray-300/70 dark:bg-gray-600 mx-4"></div>

                <!-- Theme Toggle - Aligned with nav links -->
                <ThemeToggle class="flex items-center" />

                <!-- Mobile Menu Button -->
                <button
                    @click="mobileOpen = !mobileOpen"
                    class="md:hidden ml-3 p-2 rounded-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10"
                    :aria-expanded="mobileOpen"
                    aria-label="Toggle menu"
                >
                    <svg
                        class="w-5 h-5 text-gray-700 dark:text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="1.5"
                    >
                        <path
                            v-if="!mobileOpen"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                        <path
                            v-else
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- Mobile Drawer Overlay -->
    <Transition name="fade">
        <div
            v-if="mobileOpen"
            class="fixed inset-0 z-[99] bg-black/30 dark:bg-black/50 backdrop-blur-sm md:hidden"
            @click="closeMobileMenu"
        />
    </Transition>

    <!-- Mobile Slide-out Drawer -->
    <Transition name="slide-right">
        <div
            v-if="mobileOpen"
            class="fixed top-0 right-0 z-[100] h-full w-72 mobile-drawer md:hidden"
        >
            <!-- Drawer Header -->
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200/30 dark:border-white/10">
                <span class="font-medium text-sm tracking-[-0.02em] text-gray-900 dark:text-white">
                    Navigation
                </span>
                <button
                    @click="closeMobileMenu"
                    class="p-2 -mr-2 rounded-lg transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/10"
                    aria-label="Close menu"
                >
                    <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Drawer Nav Items -->
            <div class="px-3 py-4 space-y-1">
                <button
                    v-for="item in navItems"
                    :key="item.text"
                    @click="scrollToSection(item.section)"
                    class="mobile-nav-link"
                >
                    {{ item.text }}
                </button>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* Navbar glass container */
.navbar-glass {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    backdrop-filter: blur(20px) saturate(180%);
    background: rgba(255, 255, 255, 0.75);
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .navbar-glass {
    background: rgba(0, 0, 0, 0.65);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

/* Desktop nav link - pill hover style */
.nav-link {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.875rem;
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #52525B;
    border-radius: 9999px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .nav-link {
    color: #A1A1AA;
}

/* Pill background on hover */
.nav-link:hover {
    color: #18181B;
    background: rgba(0, 0, 0, 0.06);
}

.dark .nav-link:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.1);
}

/* Active/focus state */
.nav-link:focus-visible {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
}

/* Mobile drawer glass */
.mobile-drawer {
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    backdrop-filter: blur(24px) saturate(180%);
    background: rgba(255, 255, 255, 0.85);
    border-left: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.1);
}

.dark .mobile-drawer {
    background: rgba(18, 18, 18, 0.9);
    border-left: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.4);
}

/* Mobile nav link styles */
.mobile-nav-link {
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.875rem 1rem;
    font-size: 0.9375rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #3F3F46;
    border-radius: 0.75rem;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark .mobile-nav-link {
    color: #D4D4D8;
}

.mobile-nav-link:hover {
    color: #18181B;
    background: rgba(0, 0, 0, 0.05);
    padding-left: 1.25rem;
}

.dark .mobile-nav-link:hover {
    color: #FFFFFF;
    background: rgba(255, 255, 255, 0.08);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-right-enter-active {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-right-leave-active {
    transition: transform 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
    transform: translateX(100%);
}
</style>
