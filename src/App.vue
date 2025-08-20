<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import TopNav from './components/TopNav.vue'
import SideNavbar from './components/SideNavbar.vue'
import Footer from './components/Footer.vue'

const store = useStore()
const sidebarOpen = ref(false)
function toggleSidebar () {
  sidebarOpen.value = !sidebarOpen.value
}

const isDarkModeOn = computed(() => store.state.darkMode)
function updateHtmlDarkMode (dark) {
  document.documentElement.classList.toggle('dark', dark)
}
onMounted(() => updateHtmlDarkMode(isDarkModeOn.value))
watch(isDarkModeOn, updateHtmlDarkMode, { immediate: true })
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-[#303030] transition">
    <SideNavbar :drawer="sidebarOpen" @close-drawer="sidebarOpen = false" />
    <TopNav @drawer="toggleSidebar" />
    <main class="flex-1 pt-16 bg-white dark:bg-[#303030] min-h-screen">
      <div class="w-full px-5">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>
