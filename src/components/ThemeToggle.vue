<template>
  <div class="relative">
    <!-- Theme Toggle Button -->
    <button
      @click="toggleTheme"
      class="inline-flex items-center justify-center rounded-full p-2 transition-all duration-300 focus:outline-none group"
      :aria-label="`Switch to ${nextTheme} theme`"
    >
      <transition name="theme-icon" mode="out-in">
        <!-- Light Mode Icon -->
        <svg
          v-if="currentTheme === 'light'"
          key="light"
          class="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:scale-110"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(-2 -2)">
            <circle fill="white" cx="4" cy="4" r="4" transform="translate(8 8)"/>
            <path d="M12,3V4M5.64,5.64l.7.7M3,12H4m1.64,6.36.7-.7M12,21V20m6.36-1.64-.7-.7M21,12H20M18.36,5.64l-.7.7M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          </g>
        </svg>

        <!-- Dark Mode Icon -->
        <svg
          v-else-if="currentTheme === 'dark'"
          key="dark"
          class="w-5 h-5 sm:w-6 sm:h-6 text-white transition-all duration-300 group-hover:scale-110"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.41 13.28C7.332 10.205 6.716 5.693 8.357 2c-1.23.41-2.256 1.23-3.281 2.256a10.399 10.399 0 0 0 0 14.768c4.102 4.102 10.46 3.897 14.562-.205 1.026-1.026 1.846-2.051 2.256-3.282-3.896 1.436-8.409.82-11.486-2.256Z" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </transition>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const currentTheme = computed(() => store.state.theme)

const nextTheme = computed(() => {
  return currentTheme.value === 'light' ? 'dark' : 'light'
})

function toggleTheme() {
  store.commit('toggleTheme')
}
</script>

<style scoped>
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.8);
}

</style>
