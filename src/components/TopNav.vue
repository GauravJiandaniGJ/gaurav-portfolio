<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
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
const isCompact = ref(false)
const router = useRouter()
const route = useRoute()
const mediumUrl = 'https://medium.com/@jiandanigaurav'
const mediumLogo = '/static/medium.jpeg'

let frameRequested = false
function updateCompactState () {
  if (frameRequested) return

  frameRequested = true
  window.requestAnimationFrame(() => {
    isCompact.value = window.scrollY > 72
    frameRequested = false
  })
}

onMounted(() => {
  updateCompactState()
  window.addEventListener('scroll', updateCompactState, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateCompactState)
})

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
  <nav
    class="fixed inset-x-0 top-0 z-50 px-3 sm:px-5 transition-all duration-500 ease-out"
    :class="isCompact ? 'pt-1.5 sm:pt-2' : 'pt-3 sm:pt-4'"
  >
    <div
      class="glass-shell mx-auto w-full transition-all duration-500 ease-out"
      :class="isCompact ? 'max-w-[940px]' : 'max-w-[1440px]'"
    >
      <div class="glass-filter" aria-hidden="true"></div>
      <div class="glass-sheen" aria-hidden="true"></div>

      <div class="glass-content">
        <div
          class="flex items-center gap-2 transition-all duration-500 ease-out"
          :class="isCompact ? 'h-14 px-3 sm:gap-2 sm:px-4' : 'h-16 px-3 sm:gap-3 sm:px-5'"
        >
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
          <div
            class="hidden lg:flex items-center justify-center transition-all duration-300 ease-out"
            :class="isCompact ? 'flex-none max-w-0 overflow-hidden opacity-0 pointer-events-none gap-0 px-0' : 'flex-1 gap-1 px-2 opacity-100'"
          >
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
              <img :src="mediumLogo" alt="Medium" class="h-6 w-6 rounded-sm object-cover" />
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
                <img :src="mediumLogo" alt="Medium" class="h-6 w-6 rounded-sm object-cover" />
                <span class="sr-only">Open Medium profile</span>
              </a>
            </div>
          </div>
        </transition>
      </div>

    </div>
    <svg class="glass-filter-defs" aria-hidden="true" focusable="false">
      <defs>
        <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap in="SourceGraphic" in2="blurred" scale="46" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
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
  border: 1px solid rgba(255, 255, 255, 0);
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.12) 42%, rgba(255, 255, 255, 0.08));
    box-shadow:
    0 10px 24px rgba(0, 0, 0, 0),
    inset 0 1px 0 rgba(0, 0, 0, 0),
    inset 0 -1px 0 rgba(0, 0, 0, 0);
}

.glass-filter {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  backdrop-filter: blur(0);
  -webkit-backdrop-filter: blur(0);
  filter: url(#lg-dist);
  isolation: isolate;
  transform: translateZ(0);
  will-change: filter;
}

.glass-sheen {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    radial-gradient(120% 120% at 8% 0%, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0) 62%),
    linear-gradient(115deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 42%, rgba(235, 242, 250, 0.03) 100%);
}

.glass-content {
  position: relative;
  z-index: 2;
}

.dark .glass-shell {
  border-color: rgba(255, 255, 255, 0);
  background:
    linear-gradient(120deg, rgba(42, 47, 56, 0.3), rgba(28, 32, 39, 0.16) 40%, rgba(23, 27, 34, 0.14));
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0),
    inset 0 1px 0 rgba(0, 0, 0, 0),
    inset 0 -1px 0 rgba(0, 0, 0, 0);
}

.dark .glass-sheen {
  background:
    radial-gradient(120% 120% at 8% 0%, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0) 62%),
    linear-gradient(115deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 42%, rgba(255, 255, 255, 0.04) 100%);
}

.glass-filter-defs {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
}

html {
  scroll-behavior: smooth;
}
</style>
