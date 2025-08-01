<script setup>
import { computed } from 'vue'
import profileImg from '/static/profile.jpeg'

const props = defineProps({
  drawer: { type: Boolean, required: true }
})

const isDark = computed(() => document.documentElement.classList.contains('dark'))
const currentYearMinus1996 = computed(() => new Date().getFullYear() - 1996)
const iconClass = 'flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400'
</script>

<template>
  <!-- Overlay (blur + close) -->
  <div v-if="drawer" class="fixed inset-0 z-40 backdrop-blur-[5px] bg-black/20 transition-all duration-200"
       @click.self="$emit('close-drawer')" />

  <transition name="slide">
    <aside v-if="drawer"
  class="fixed top-0 left-0 z-50 h-full w-[98vw] max-w-[400px] sm:w-[32rem] sm:max-w-sm lg:w-[36rem] bg-gray-100 dark:bg-[#393939] shadow-2xl flex flex-col transition-transform duration-300 overflow-y-auto custom-scrollbar">

      <!-- Close icon for mobile -->
      <div class="flex justify-end pt-3 pr-3 sm:pt-4 sm:pr-4 lg:hidden">
        <button @click="$emit('close-drawer')" aria-label="Close sidebar">
          <svg :class="isDark ? 'text-blue-400' : 'text-blue-600'" class="w-6 h-6" fill="none"
               viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- Avatar/Profile -->
      <div class="flex flex-col items-center justify-center py-4 sm:py-6 mb-10 ">
        <div class="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden mt-10 sm:mt-20 mb-2 sm:mb-4 shadow-xl transition-transform duration-300 hover:scale-105">

          <img :src="profileImg" alt="Profile" class="object-cover w-full h-full" />
        </div>
        <div class="text-center mt-1">
          <span class="block font-bold text-base sm:text-2xl text-blue-700 dark:text-blue-300">
            Gaurav Jiandani
          </span>
          <span class="block font-semibold text-xs pr-2 sm:text-base text-gray-700 dark:text-gray-200 opacity-80 mt-1">
            Full stack developer, Technical Hoarder &<br class="hidden sm:block" />Proud Geek
          </span>
        </div>
      </div>
      <!-- Info list -->
      <div class="px-2 sm:px-6 mt-3">
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <!-- PHONE -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'" aria-hidden="true">
              <!-- Phone SVG -->
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 5a2 2 0 012-2h2a2 2 0 012 2v1a2 2 0 01-2 2H5v3a10 10 0 0010 10h3v-2a2 2 0 012-2h1a2 2 0 012 2v2a2 2 0 01-2 2h-1.5A17.5 17.5 0 013 6.5V5z" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                (+91) 971-293-4085
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Mobile</div>
            </div>
          </li>
          <!-- EMAIL -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'" aria-hidden="true">
              <!-- Mail SVG -->
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 8l7.89 5.26a3 3 0 003.22 0L22 8m-19 8V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                jiandanigaurav@gmail.com
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Personal</div>
            </div>
          </li>
          <!-- LOCATION -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'" aria-hidden="true">
              <!-- Location SVG -->
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-full h-full">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                Plot no. 140, Ward 7/A
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Gandhidham, Gujarat</div>
            </div>
          </li>
          <!-- BIRTHDAY -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'" aria-hidden="true">
              <!-- Cake SVG for Birthday -->
              <svg viewBox="0 0 24 24" fill="none" class="w-full h-full" stroke="currentColor" stroke-width="2">
                <rect x="4" y="10" width="16" height="8" rx="3" stroke="currentColor" fill="none" />
                <path d="M4 10c1 .5 2-.5 3 0s2 .5 3 0 2 .5 3 0 2 .5 3 0 2 .5 3 0" stroke="currentColor" fill="none" />
                <line x1="8" y1="7" x2="8" y2="10" stroke="currentColor" />
                <line x1="12" y1="7" x2="12" y2="10" stroke="currentColor" />
                <line x1="16" y1="7" x2="16" y2="10" stroke="currentColor" />
                <circle cx="8" cy="6" r="0.5" fill="currentColor" />
                <circle cx="12" cy="6" r="0.5" fill="currentColor" />
                <circle cx="16" cy="6" r="0.5" fill="currentColor" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                28th August, 1996
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ currentYearMinus1996 }} Years</div>
            </div>
          </li>
          <!-- DEGREE -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'" aria-hidden="true">
              <!-- Degree SVG -->
              <svg viewBox="0 0 24 24" fill="none" class="w-full h-full" stroke="currentColor" stroke-width="2">
                <polygon points="12 3 22 9 12 15 2 9 12 3" stroke="currentColor" fill="none" />
                <path d="M2 9v6c0 1.1.9 2 2 2h2" stroke="currentColor" fill="none" />
                <path d="M22 9v6c0 1.1-.9 2-2 2h-2" stroke="currentColor" fill="none" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                Master of Science in IT
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">DA-IICT</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mt-auto py-3 sm:py-5 text-center text-xs text-gray-400">
        &copy; {{ new Date().getFullYear() }} Gaurav Jiandani
      </div>
    </aside>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s cubic-bezier(.76, 0, .24, 1), opacity 0.3s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
}

/* Custom thin smooth gray scrollbar for sidebar only */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #b1b1b1 #ececec;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 7px;
  background: #ececec;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #b1b1b1;
  border-radius: 8px;
  transition: background 0.2s;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #888;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #ececec;
  border-radius: 8px;
}
/* Dark mode support for scrollbar */
.dark .custom-scrollbar {
  scrollbar-color: #393939 #232323;
}
.dark .custom-scrollbar::-webkit-scrollbar {
  background: #232323;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #393939;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #585858;
}
.dark .custom-scrollbar::-webkit-scrollbar-track {
  background: #232323;
}

/* Responsive Tweaks */
@media (max-width: 640px) {
  aside {
    width: 92vw !important;
    max-width: 96vw !important;
    min-width: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    font-size: 15px !important;
  }
  .custom-scrollbar {
    max-height: 100vh;
  }
  .flex-col.items-center {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }
  .divide-y > :not([hidden]) ~ :not([hidden]) {
    --tw-divide-y-reverse: 0;
    border-top-width: 1px;
    border-color: #e5e7eb;
  }
}

@media (max-width: 400px) {
  aside {
    width: 75vw !important;
    max-width: 75vw !important;
  }
  .w-20, .sm\:w-28 { width: 55px !important; height: 55px !important; }
  .font-bold.text-base { font-size: 16px !important; }
}
</style>
