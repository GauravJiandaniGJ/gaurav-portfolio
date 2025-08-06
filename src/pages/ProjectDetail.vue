<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import projects from '@/data/projects.js'

const route = useRoute()
const router = useRouter()
const projectId = Number(route.params.id)
const project = projects.find(p => Number(p.id) === projectId)

function goBack () {
    router.back()
}

const showModal = ref(false)
const modalImg = ref(null)
function openModal (img) {
    modalImg.value = img
    showModal.value = true
}
function closeModal () {
    showModal.value = false
    modalImg.value = null
}
</script>

<template>
  <div class="w-full min-h-screen bg-white dark:bg-[#292828] flex justify-center items-start">
    <div class="w-full max-w-3xl mx-auto">
      <!-- Back Button -->
      <button @click="goBack"
        class="mb-5 px-3 py-2 bg-gray-100 dark:bg-gray-500 rounded-lg text-gray-700 dark:text-gray-200 font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition flex items-center shadow text-sm sm:text-base">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div v-if="project">
        <!-- Title & Logo -->
        <div class="flex items-center gap-2 sm:gap-6 mb-4 flex-wrap sm:flex-nowrap">
          <img v-if="project.logo" :src="project.logo"
            class="w-12 h-12 sm:w-20 sm:h-20 rounded-lg object-contain border bg-white dark:bg-[#191919] shadow flex-shrink-0" />
          <div>
            <h1 class="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold text-blue-700 dark:text-blue-300 leading-tight drop-shadow-sm">
              {{ project.title }}
            </h1>
            <div class="text-sm xs:text-base sm:text-xl text-gray-700 dark:text-gray-200 mt-1 font-medium">
              {{ project.technology }}
            </div>
          </div>
        </div>
        <!-- Industry -->
        <div class="mb-3 text-sm xs:text-base sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
          Industry: <span class="font-normal">{{ project.productSite }}</span>
        </div>
        <!-- Description -->
        <ul class="mb-6 list-disc pl-4 sm:pl-8">
          <li v-for="desc in project.description" :key="desc.id"
              class="mb-1 text-gray-800 dark:text-gray-200 text-xs xs:text-sm sm:text-lg leading-relaxed">
            {{ desc.content }}
          </li>
        </ul>
        <!-- Screenshots with Zoom Modal -->
        <div v-if="project.images && project.images.length" class="mb-8">
          <h3 class="font-bold text-base xs:text-lg sm:text-xl mb-3 text-blue-700 dark:text-blue-200">Screenshots</h3>
          <div class="flex flex-wrap gap-2 sm:gap-6">
            <img v-for="img in project.images" :src="img.src" :key="img.id"
              class="cursor-zoom-in w-full xs:w-[250px] sm:w-[310px] md:w-[500px] h-[120px] xs:h-[140px] sm:h-[190px] md:h-[300px] rounded-lg object-cover object-top border bg-white dark:bg-[#222] shadow hover:scale-105 hover:shadow-2xl hover:border-blue-500 transition-all duration-300"
              loading="lazy"
              :alt="project.title + ' screenshot ' + img.id"
              @click="openModal(img.src)" />
          </div>
        </div>
        <!-- Reference -->
        <div v-if="project.reference" class="mt-4 text-xs xs:text-sm sm:text-base text-gray-500 dark:text-gray-400">
          <span class="font-medium text-gray-700 dark:text-gray-200">Reference: </span>
          <span class="font-semibold text-blue-700 dark:text-blue-200">{{ project.reference }}</span>
        </div>
        <!-- Project Link -->
        <div v-if="project.url" class="mt-8">
          <a :href="project.url.startsWith('http') ? project.url : 'https://' + project.url"
            class="inline-block px-5 py-2 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-blue-700 hover:scale-105 transition text-base xs:text-lg"
            target="_blank" rel="noopener">
            Visit Project
          </a>
        </div>
      </div>
      <div v-else>
        <div class="text-lg text-red-600 font-bold py-16 text-center">Project not found.</div>
      </div>

      <!-- Screenshot Fullscreen Modal -->
      <transition name="modal">
        <div v-if="showModal"
          class="fixed z-50 inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300"
          @click.self="closeModal">
          <div class="relative w-auto mx-auto animate-modalZoom flex items-center justify-center">
            <!-- Image only (no close button) -->
            <img
              :src="modalImg"
              alt="Project Screenshot"
              class="rounded-lg object-contain transition-all duration-500
                max-w-[100vw] max-h-[90vh]
                sm:max-w-[100vw] sm:max-h-[90vh]"
            />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
@keyframes modalZoom {
  0% { opacity: 0; transform: scale(0.93) translateY(50px);}
  100% { opacity: 1; transform: scale(1) translateY(0);}
}
.animate-modalZoom {
  animation: modalZoom 0.44s cubic-bezier(.5, 1.5, .2, 1);
}
.modal-enter-active,
.modal-leave-active { transition: opacity 0.21s cubic-bezier(.7, .7, .2, 1);}
.modal-enter-from,
.modal-leave-to { opacity: 0; }

/* Responsive tweaks for xs (360px+) */
@media (max-width: 420px) {
  .xs\:text-base { font-size: 1rem; }
  .xs\:text-lg { font-size: .8rem; }
  .xs\:w-\[250px\] { width: 220px !important; }
  .xs\:h-\[140px\] { height: 100px !important; }
  .xs\:p-4 { padding: 1rem !important; }
  /* Modal img resize for mobile */
  .modal-zoom-img {
    max-width: 90vw !important;
    max-height: 60vh !important;
  }
}

html {
  scroll-behavior: smooth;
}

</style>
