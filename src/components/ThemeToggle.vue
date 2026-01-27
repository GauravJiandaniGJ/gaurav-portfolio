<template>
  <button
    @click="toggleTheme"
    class="theme-toggle-btn"
    :aria-label="`Switch to ${nextTheme} theme`"
    :title="`Switch to ${nextTheme} mode`"
  >
    <transition name="theme-icon" mode="out-in">
      <!-- Light Mode Icon (Sun) -->
      <svg
        v-if="currentTheme === 'light'"
        key="light"
        class="w-[18px] h-[18px] text-gray-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>

      <!-- Dark Mode Icon (Moon) -->
      <svg
        v-else
        key="dark"
        class="w-[18px] h-[18px] text-gray-300"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    </transition>
  </button>
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
.theme-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle-btn:hover {
  background: rgba(0, 0, 0, 0.06);
}

.dark .theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.theme-toggle-btn:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Icon transition */
.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.2s ease;
}

.theme-icon-enter-from {
  opacity: 0;
  transform: rotate(-45deg) scale(0.8);
}

.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(45deg) scale(0.8);
}
</style>
