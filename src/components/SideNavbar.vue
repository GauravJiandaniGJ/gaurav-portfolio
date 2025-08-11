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
      class="fixed top-0 left-0 z-50 h-full w-[98vw] max-w-[400px] sm:w-[32rem] sm:max-w-sm lg:w-[36rem] bg-gray-200 dark:bg-[#393939] shadow-2xl flex flex-col transition-transform duration-300 overflow-y-auto custom-scrollbar">

      <!-- Close icon for mobile -->
      <div class="flex justify-end pt-3 pr-3 sm:pt-4 sm:pr-4 lg:hidden">
        <button @click="$emit('close-drawer')" aria-label="Close sidebar">
          <svg :class="isDark ? 'text-blue-400' : 'text-blue-600'" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- Avatar/Profile -->
      <div class="flex flex-col items-center justify-center py-4 sm:py-6 mb-10 ">
        <div
          class="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden mt-10 sm:mt-20 mb-2 sm:mb-4 shadow-xl transition-transform duration-300 hover:scale-105">

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
            <span
              :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'"
              aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" class="w-full h-full" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round">
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.89.3 1.76.56 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.48a2 2 0 0 1 2.11-.45c.84.26 1.71.44 2.6.56A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div
                class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                (+91) 971-293-4085</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Mobile</div>
            </div>
          </li>

          <!-- EMAIL -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span
              :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'"
              aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" class="w-full h-full" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="M3 7.5l9 6 9-6" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div
                class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                jiandanigaurav@gmail.com</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Personal</div>
            </div>
          </li>

          <!-- LOCATION -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span
              :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'"
              aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" class="w-full h-full" stroke="currentColor" stroke-width="1.75"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div
                class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                Plot no. 140, Ward 7/A</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Gandhidham, Gujarat</div>
            </div>
          </li>

          <!-- BIRTHDAY (your exact cake SVG, color via currentColor) -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span
              :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'"
              aria-hidden="true">
              <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 439.639 439.639" fill="currentColor"
                class="w-full h-full">
                <g>
                  <path d="M51.441,247.148c4.142,0,7.5-3.358,7.5-7.5v-37.922c0.978,1.013,2.011,2.24,3.213,3.697
              c4.431,5.372,10.5,12.728,22.284,12.728c11.785,0,17.854-7.356,22.285-12.727c4.052-4.912,6.2-7.273,10.713-7.273
              c4.512,0,6.66,2.361,10.711,7.272c4.43,5.371,10.498,12.728,22.282,12.728s17.852-7.356,22.282-12.728
              c4.051-4.912,6.199-7.272,10.711-7.272c4.514,0,6.662,2.361,10.713,7.273c4.431,5.371,10.5,12.727,22.285,12.727
              s17.854-7.356,22.285-12.727c4.052-4.912,6.2-7.273,10.713-7.273c4.514,0,6.663,2.361,10.715,7.273
              c4.431,5.371,10.5,12.727,22.285,12.727c11.785,0,17.854-7.356,22.285-12.728c4.052-4.912,6.2-7.272,10.713-7.272
              c4.516,0,6.664,2.361,10.717,7.273c4.432,5.371,10.501,12.727,22.287,12.727c11.786,0,17.855-7.356,22.287-12.727
              c1.203-1.458,2.237-2.686,3.216-3.7v27.426c0,4.142,3.358,7.5,7.5,7.5s7.5-3.358,7.5-7.5v-57.541
              c0-16.242-13.214-29.456-29.456-29.456h-48.42V83.656c0-4.142-3.358-7.5-7.5-7.5H278.05c-4.142,0-7.5,3.358-7.5,7.5v58.497h-38.248
              V83.656c0-4.142-3.358-7.5-7.5-7.5h-25.499c-4.142,0-7.5,3.358-7.5,7.5v58.497h-38.248V83.656c0-4.142-3.358-7.5-7.5-7.5h-25.499
              c-4.142,0-7.5,3.358-7.5,7.5v58.497H73.396c-16.242,0-29.455,13.214-29.455,29.456v68.04
              C43.941,243.79,47.299,247.148,51.441,247.148z" />
                  <path d="M216.553,304.145h-46.499c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h46.499c4.142,0,7.5-3.358,7.5-7.5
              S220.695,304.145,216.553,304.145z" />
                  <path d="M194.553,65.894c4.825,4.824,11.163,7.236,17.5,7.236c6.338,0,12.676-2.412,17.5-7.237c9.65-9.649,9.65-25.351,0-35
              l-12.197-12.197c-1.406-1.407-3.314-2.197-5.303-2.197s-3.897,0.79-5.303,2.197l-12.197,12.197
              C184.903,40.543,184.903,56.244,194.553,65.894z M205.159,41.5l6.894-6.894l6.894,6.894c3.801,3.801,3.801,9.986,0,13.787
              c-3.801,3.803-9.987,3.802-13.788,0v0C201.358,51.486,201.358,45.301,205.159,41.5z" />
                  <path d="M115.807,65.894c4.825,4.824,11.163,7.236,17.5,7.236c6.338,0,12.676-2.412,17.5-7.237c9.65-9.649,9.65-25.351,0-35
              L138.61,18.696c-1.406-1.407-3.314-2.197-5.303-2.197s-3.897,0.79-5.303,2.197l-12.197,12.197
              C106.157,40.543,106.157,56.244,115.807,65.894z M126.413,41.5l6.894-6.894l6.894,6.894c3.801,3.801,3.801,9.986,0,13.787
              c-3.801,3.803-9.987,3.802-13.788,0v0C122.612,51.486,122.612,45.301,126.413,41.5z" />
                  <path d="M273.299,65.894c4.825,4.824,11.163,7.236,17.5,7.236c6.338,0,12.676-2.412,17.5-7.237c9.65-9.649,9.65-25.351,0-35
              l-12.197-12.197c-1.406-1.407-3.314-2.197-5.303-2.197s-3.897,0.79-5.303,2.197l-12.197,12.197
              C263.649,40.543,263.649,56.244,273.299,65.894z M283.905,41.5l6.894-6.894l6.894,6.894c3.801,3.801,3.801,9.986,0,13.787
              c-3.801,3.803-9.987,3.802-13.788,0v0C280.104,51.486,280.104,45.301,283.905,41.5z" />
                  <path d="M69.56,385.641H15v-76.495h119.993v5.6c0,4.142,3.358,7.5,7.5,7.5c4.142,0,7.5-3.358,7.5-7.5v-53.598
              c0-4.142-3.358-7.5-7.5-7.5H7.5c-4.142,0-7.5,3.358-7.5,7.5v131.993c0,4.142,3.358,7.5,7.5,7.5h62.06c4.142,0,7.5-3.358,7.5-7.5
              S73.702,385.641,69.56,385.641z M134.993,268.648v25.498H15v-25.498H134.993z" />
                  <path d="M432.139,245.051H239.463c-4.142,0-7.5,3.358-7.5,7.5v100.062c0,4.142,3.358,7.5,7.5,7.5h192.676
              c4.142,0,7.5-3.358,7.5-7.5V252.551C439.639,248.408,436.281,245.051,432.139,245.051z M424.639,283.646h-81.338v-23.596h81.338
              V283.646z M328.301,260.051v23.596h-81.338v-23.596H328.301z M246.963,298.646h81.338v46.466h-81.338V298.646z M343.301,345.112
              v-46.466h81.338v46.466H343.301z" />
                  <path d="M203.898,333.826H96.296c-4.142,0-7.5,3.358-7.5,7.5v74.313c0,4.142,3.358,7.5,7.5,7.5h107.602c4.142,0,7.5-3.358,7.5-7.5
              v-74.313C211.398,337.184,208.04,333.826,203.898,333.826z M196.398,370.983h-38.801v-22.157h38.801V370.983z M142.597,348.826
              v22.157h-38.801v-22.157H142.597z M103.796,385.983h38.801v22.157h-38.801V385.983z M157.597,408.14v-22.157h38.801v22.157H157.597
              z" />
                </g>
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div
                class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                28th August, 1996</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ currentYearMinus1996 }} Years</div>
            </div>
          </li>

          <!-- DEGREE -->
          <li class="py-2 sm:py-3 flex items-center group transition rounded cursor-pointer select-none">
            <span
              :class="iconClass + ' transition-transform transition-colors duration-200 group-hover:scale-110 group-hover:text-blue-500'"
              aria-hidden="true">
              <svg viewBox="0 0 512 512" fill="none" stroke="currentColor" stroke-width="30" stroke-linecap="round"
                stroke-linejoin="round" class="w-full h-full">
                <path
                  d="m70.1,257.7c11.3,0 20.4-9.1 20.4-20.4v-136.2c0-11.3-9.1-20.4-20.4-20.4-11.3,0-20.4,9.1-20.4,20.4v136.2c0,11.3 9.1,20.4 20.4,20.4z" />
                <path
                  d="m53.3,460.2c9.9-66.5 67.4-117.7 136.6-117.7h132c69.2,0 126.8,51.2 136.7,117.7h-405.3zm116.7-269.5h172c2,5.9 3.1,12 3.1,18.1 0,38.3-40,69.5-89.1,69.5-49.2,0-89.1-31.2-89.1-69.5 0-6.1 1-12.2 3.1-18.1zm10.1-79l68.4,26.7c6.2,2.4 10,2.4 14.9,0l68.4-26.7v38.2h-151.7v-38.2zm75.9-59.1l67.3,18.6-67.3,26.3-67.3-26.3 67.3-18.6z" />
              </svg>
            </span>
            <div class="ml-3 flex-1 min-w-0">
              <div
                class="font-medium text-gray-900 dark:text-gray-100 transition-colors duration-200 group-hover:text-blue-500 text-sm sm:text-base">
                Master of Science in IT</div>
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
  border-radius: 10px;
  transition: background 0.2s;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #888;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #ececec;
  border-radius: 10px;
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

  .divide-y> :not([hidden])~ :not([hidden]) {
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

  .w-20,
  .sm\:w-28 {
    width: 55px !important;
    height: 55px !important;
  }

  .font-bold.text-base {
    font-size: 16px !important;
  }
}

html {
  scroll-behavior: smooth;
}
</style>
