<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import TopNav from './components/TopNav.vue'
// Sidebar hidden for new positioning design - kept for reference
// import SideNavbar from './components/SideNavbar.vue'
import Footer from './components/Footer.vue'

const store = useStore()
// Sidebar functionality disabled for new design
const sidebarOpen = ref(false)

function toggleSidebar () {
  // Sidebar hidden for new positioning design
  // sidebarOpen.value = !sidebarOpen.value
}

// Theme management
const isDarkMode = computed(() => store.getters.isDarkMode)

function updateHtmlTheme() {
  const isDark = isDarkMode.value
  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.setAttribute('data-theme', store.state.theme)
}

onMounted(() => {
  updateHtmlTheme()
})

watch(isDarkMode, updateHtmlTheme, { immediate: true })
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-black transition">
    <!-- Sidebar hidden for new positioning design -->
    <!-- <SideNavbar :drawer="sidebarOpen" @close-drawer="sidebarOpen = false" /> -->
    <TopNav @drawer="toggleSidebar" />
    <main class="flex-1 pt-16 bg-white dark:bg-black min-h-screen">
      <div class="w-full">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>
