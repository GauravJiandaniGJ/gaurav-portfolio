<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const navItems = [
  { text: 'Experiences', section: 'experiences' },
  { text: 'Weekend Builds', section: 'projects' },
  { text: 'Timeline', section: 'timeline' },
  { text: 'Achievements', section: 'achievements' },
  { text: 'Skills', section: 'skills' }
]

const mobileOpen = ref(false)
const router = useRouter()
const route = useRoute()
const mediumUrl = 'https://medium.com/@jiandanigaurav'

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
  return nav ? nav.offsetHeight : 96
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
  <nav class="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 pt-3">
    <div class="glass-shell mx-auto w-full max-w-[1440px] transition-colors duration-300">
      <div class="glass-filter" aria-hidden="true"></div>
      <div class="glass-highlight" aria-hidden="true"></div>
      <div class="glass-stroke" aria-hidden="true"></div>

      <div class="glass-content">
        <div class="flex h-16 items-center gap-2 px-3 sm:gap-3 sm:px-5">
          <!-- Left -->
          <div class="flex min-w-0 shrink-0 items-center gap-2">
            <button
              class="inline-flex items-center justify-center rounded-full p-2 text-gray-800 dark:text-gray-100 transition hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              @click="$emit('drawer')" aria-label="Open sidebar">
              <svg class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <line x1="0.5" y1="13" x2="23.5" y2="13" fill="none" stroke="currentColor" stroke-miterlimit="10"
                  stroke-width="1.92" />
                <line x1="0.5" y1="7.25" x2="23.5" y2="7.25" fill="none" stroke="currentColor" stroke-miterlimit="10"
                  stroke-width="1.92" />
                <line x1="0.5" y1="18.75" x2="12.96" y2="18.75" fill="none" stroke="currentColor" stroke-miterlimit="10"
                  stroke-width="1.92" />
              </svg>
            </button>

            <img src="/static/profile.jpeg" class="h-8 w-8 rounded-full border border-white/70 dark:border-white/20"
              alt="Logo" />
            <span
              class="hidden sm:inline-block truncate text-sm font-semibold tracking-tight text-gray-800 dark:text-gray-100">
              Gaurav Jiandani
            </span>
          </div>

          <!-- Center Desktop Nav -->
          <div class="hidden lg:flex flex-1 items-center justify-center gap-1 px-2">
            <button v-for="item in navItems" :key="item.text" @click="scrollToSection(item.section)"
              class="rounded-full px-3 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-200 transition hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              {{ item.text }}
            </button>
          </div>

          <!-- Right -->
          <div class="ml-auto flex items-center gap-2">
            <ThemeToggle />

            <a :href="mediumUrl" target="_blank" rel="noopener noreferrer" aria-label="Visit Medium profile"
              class="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <svg viewBox="0 0 24 24" class="h-4 w-4" aria-hidden="true">
                <path fill="currentColor"
                  d="M13.54 12.49c0 3.77-3.03 6.83-6.77 6.83S0 16.26 0 12.49s3.03-6.82 6.77-6.82 6.77 3.05 6.77 6.82zm7.43 0c0 3.55-1.51 6.43-3.38 6.43-1.86 0-3.37-2.88-3.37-6.43s1.51-6.43 3.37-6.43 3.38 2.88 3.38 6.43zM24 12.49c0 3.18-.53 5.76-1.19 5.76-.66 0-1.19-2.58-1.19-5.76s.53-5.76 1.19-5.76c.66 0 1.19 2.58 1.19 5.76z" />
              </svg>
            </a>

            <button @click="mobileOpen = !mobileOpen"
              class="inline-flex lg:hidden items-center justify-center rounded-full p-2 text-gray-800 dark:text-gray-100 transition hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              :aria-expanded="mobileOpen" aria-label="Open main menu">
              <svg :class="[
                'h-5 w-5 transition-transform duration-300',
                mobileOpen ? 'rotate-90' : 'rotate-0'
              ]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer -->
        <transition name="slide-down">
          <div v-if="mobileOpen" class="lg:hidden px-3 pb-3">
            <div class="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-[#1b1b1b]/90 p-2">
              <button v-for="item in navItems" :key="item.text" @click="scrollToSection(item.section)"
                class="mb-1 block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 transition hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 last:mb-2">
                {{ item.text }}
              </button>

              <a :href="mediumUrl" target="_blank" rel="noopener noreferrer" aria-label="Visit Medium profile"
                class="inline-flex w-full items-center justify-center rounded-xl bg-black px-3 py-2 text-white transition hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <svg viewBox="0 0 24 24" class="h-4 w-4" aria-hidden="true">
                  <path fill="currentColor"
                    d="M13.54 12.49c0 3.77-3.03 6.83-6.77 6.83S0 16.26 0 12.49s3.03-6.82 6.77-6.82 6.77 3.05 6.77 6.82zm7.43 0c0 3.55-1.51 6.43-3.38 6.43-1.86 0-3.37-2.88-3.37-6.43s1.51-6.43 3.37-6.43 3.38 2.88 3.38 6.43zM24 12.49c0 3.18-.53 5.76-1.19 5.76-.66 0-1.19-2.58-1.19-5.76s.53-5.76 1.19-5.76c.66 0 1.19 2.58 1.19 5.76z" />
                </svg>
                <span class="sr-only">Open Medium profile</span>
              </a>
            </div>
          </div>
        </transition>
      </div>

      <svg class="glass-svg" aria-hidden="true" focusable="false">
        <defs>
          <filter id="nav-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.015" numOctaves="2" seed="8" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="1.2" result="softNoise" />
            <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="14" xChannelSelector="R"
              yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </div>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.35s cubic-bezier(0.86, 0, 0.07, 1), opacity 0.25s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 420px;
  opacity: 1;
}

.glass-shell {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border-radius: 2.2rem;
  border: 1px solid rgba(138, 180, 248, 0.45);
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    0 16px 42px rgba(15, 23, 42, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.glass-filter {
  position: absolute;
  inset: 2px;
  z-index: 0;
  overflow: hidden;
  border-radius: calc(2.2rem - 2px);
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
  filter: url(#nav-glass-distortion);
  isolation: isolate;
  transform: translateZ(0);
  will-change: filter;
  pointer-events: none;
}

.glass-highlight {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(120% 100% at 10% 0%, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0) 50%),
    linear-gradient(120deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05) 35%, rgba(255, 255, 255, 0.16));
}

.glass-stroke {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  border-radius: inherit;
}

.glass-content {
  position: relative;
  z-index: 3;
}

.glass-svg {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

.dark .glass-shell {
  box-shadow: rgb(39 39 39);
}

.dark .glass-highlight {
  background:
    radial-gradient(120% 100% at 10% 0%, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0) 55%),
    linear-gradient(120deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02) 35%, rgba(255, 255, 255, 0.05));
}

.dark .glass-filter {
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
}

html {
  scroll-behavior: smooth;
}
</style>
