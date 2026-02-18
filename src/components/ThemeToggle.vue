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
          viewBox="0 0 36 36"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>sun-solid</title>
          <path d="M18,6.42a1,1,0,0,0,1-1V1.91a1,1,0,0,0-2,0V5.42A1,1,0,0,0,18,6.42Z" fill="#000000" />
          <path d="M18,29.58a1,1,0,0,0-1,1v3.51a1,1,0,0,0,2,0V30.58A1,1,0,0,0,18,29.58Z" fill="#000000" />
          <path d="M8.4,9.81A1,1,0,0,0,9.81,8.4L7.33,5.92A1,1,0,0,0,5.92,7.33Z" fill="#000000" />
          <path d="M27.6,26.19a1,1,0,0,0-1.41,1.41l2.48,2.48a1,1,0,0,0,1.41-1.41Z" fill="#000000" />
          <path d="M6.42,18a1,1,0,0,0-1-1H1.91a1,1,0,0,0,0,2H5.42A1,1,0,0,0,6.42,18Z" fill="#000000" />
          <path d="M34.09,17H30.58a1,1,0,0,0,0,2h3.51a1,1,0,0,0,0-2Z" fill="#000000" />
          <path d="M8.4,26.19,5.92,28.67a1,1,0,0,0,1.41,1.41L9.81,27.6A1,1,0,0,0,8.4,26.19Z" fill="#000000" />
          <path d="M27.6,9.81l2.48-2.48a1,1,0,0,0-1.41-1.41L26.19,8.4A1,1,0,0,0,27.6,9.81Z" fill="#000000" />
          <circle cx="18" cy="18" r="10" fill="#000000" />
          <rect x="0" y="0" width="36" height="36" fill-opacity="0" />
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
          <path
            d="M13.589 21.659c-3.873 1.038-8.517-.545-10.98-3.632a1 1 0 0 1 .751-1.623c3.984-.118 6.662-1.485 8.17-4.098 1.51-2.613 1.354-5.616-.535-9.125a1 1 0 0 1 1.03-1.463c3.904.59 7.597 3.82 8.635 7.694 1.43 5.334-1.737 10.818-7.071 12.247z"
            fill="currentColor"
          />
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
