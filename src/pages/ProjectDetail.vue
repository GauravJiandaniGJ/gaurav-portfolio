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
  <div class="w-full min-h-screen bg-white dark:bg-[#292828] flex justify-center items-start px-2 sm:px-6">
    <div class="w-full max-w-5xl mx-auto bg-transparent pb-12">
      <!-- Back Button -->
      <button @click="goBack"
        class="mb-10 px-5 py-2 bg-gray-100 dark:bg-[#444] rounded-lg text-gray-700 dark:text-gray-100 font-semibold hover:bg-blue-100 dark:hover:bg-blue-900 transition flex items-center shadow text-base sm:text-lg">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div v-if="project" class="bg-transparent">
        <!-- Title & Logo -->
        <div class="flex items-center gap-4 sm:gap-8 mb-6 flex-wrap sm:flex-nowrap">
          <img v-if="project.logo" :src="project.logo"
            class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-contain border bg-white dark:bg-[#191919] shadow-lg flex-shrink-0" />
          <div>
            <h1
              class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-500 dark:text-blue-300 leading-tight drop-shadow-sm mb-2">
              {{ project.title }}
            </h1>
            <div class="flex gap-2 mt-1 items-center min-h-[32px]">
              <template v-for="tech in project.technology" :key="tech.name">
                <img :src="tech.logo" :alt="tech.name + ' logo'" class="tech-logo-lg" :title="tech.name"
                  loading="lazy" />
              </template>
            </div>
          </div>
        </div>
        <!-- Industry -->
        <div class="mb-4 text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
          Industry: <span class="font-normal">{{ project.productSite }}</span>
        </div>
        <!-- Description -->
        <ul class="mb-8 list-disc pl-8">
          <li v-for="desc in project.description" :key="desc.id"
            class="mb-2 text-gray-800 dark:text-gray-200 text-lg sm:text-xl leading-relaxed font-medium">
            {{ desc.content }}
          </li>
        </ul>
        <!-- Screenshots with Zoom Modal -->
        <!-- Screenshots with Zoom Modal: Side-by-side row, small, aligned -->
        <div v-if="project.images && project.images.length" class="mb-10">
          <h3 class="font-bold text-lg sm:text-2xl mb-5 text-blue-700 dark:text-blue-200">Screenshots</h3>
          <div class="flex flex-row flex-wrap gap-3 sm:gap-5 items-center justify-start">
            <img v-for="img in project.images" :src="img.src" :key="img.id"
              class="project-gallery-img cursor-zoom-in rounded-lg object-cover border-2 border-gray-200 dark:border-[#222] bg-white dark:bg-[#191919] shadow transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-blue-500"
              loading="lazy" :alt="project.title + ' screenshot ' + img.id" @click="openModal(img.src)" />
          </div>
        </div>

        <!-- Reference -->
        <div v-if="project.reference" class="mt-4 text-base sm:text-lg text-gray-500 dark:text-gray-400">
          <span class="font-semibold text-gray-700 dark:text-gray-200">Reference: </span>
          <span class="font-bold text-blue-700 dark:text-blue-200">{{ project.reference }}</span>
        </div>
        <!-- Project Link -->
        <div v-if="project.url" class="mt-12">
          <a :href="project.url.startsWith('http') ? project.url : 'https://' + project.url"
            class="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-extrabold shadow-2xl hover:bg-blue-700 hover:scale-105 transition text-lg sm:text-xl"
            target="_blank" rel="noopener">
            Visit Project
          </a>
        </div>
      </div>
      <div v-else>
        <div class="text-2xl text-red-600 font-bold py-16 text-center">Project not found.</div>
      </div>

      <!-- Screenshot Fullscreen Modal -->
      <transition name="modal">
        <div v-if="showModal"
          class="fixed z-50 inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300"
          @click.self="closeModal">
          <div class="relative w-auto mx-auto animate-modalZoom flex items-center justify-center">
            <img :src="modalImg" alt="Project Screenshot" class="rounded-lg object-contain transition-all duration-500
                max-w-[100vw] max-h-[90vh]
                sm:max-w-[100vw] sm:max-h-[90vh]" />
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
@keyframes modalZoom {
  0% {
    opacity: 0;
    transform: scale(0.93) translateY(50px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modalZoom {
  animation: modalZoom 0.44s cubic-bezier(.5, 1.5, .2, 1);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.21s cubic-bezier(.7, .7, .2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* --- DESKTOP/TABLET SIZES --- */
.tech-logo-lg {
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  max-width: 38px;
  max-height: 38px;
  object-fit: contain;
  background: #fff;
  border-radius: 4px !important;
  box-shadow: 0 2px 10px 0 rgba(60, 60, 60, 0.10);
  border: 2px solid #e6e6e6;
  display: inline-block;
  transition: transform 0.19s cubic-bezier(.32, 2, .55, .27), box-shadow 0.19s;
  vertical-align: middle;
  padding: 4px;
}

.tech-logo-lg:hover {
  transform: scale(1.14) rotate(-3deg);
  box-shadow: 0 4px 16px 0 rgba(60, 60, 60, 0.19);
  z-index: 2;
  border-color: #38bdf8;
  background: #f8fafc;
}

h1,
.text-2xl,
.text-xl,
.text-lg,
.font-bold,
.font-extrabold {
  letter-spacing: -0.01em;
}

ul,
li {
  font-size: 1.22em;
}

.project-gallery-img {
  width: 550px;
  height: 350px;
  max-width: 450vw;
  max-height: 350px;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
  margin: 0;
  box-shadow: 0 2px 12px rgba(30, 41, 59, 0.06);
  transition: all 0.18s cubic-bezier(.32, 2, .55, .27);
}

/* For wide screens */
@media (max-width: 1024px) {
  .max-w-5xl {
    max-width: 95vw;
  }
}

/* --- MOBILE OVERRIDES ONLY (nothing changes desktop!) --- */
@media (max-width: 640px) {
  .max-w-5xl {
    max-width: 99vw;
  }

  /* Make logo and gallery images small, sharp, aligned */
  .tech-logo-lg {
    width: 18px !important;
    height: 18px !important;
    min-width: 18px !important;
    min-height: 18px !important;
    max-width: 18px !important;
    max-height: 18px !important;
    border-radius: 10px !important;
    padding: 1.5px !important;
  }

  .w-20,
  .h-20 {
    width: 38px !important;
    height: 38px !important;
  }

  .sm\:w-24,
  .sm\:h-24 {
    width: 50px !important;
    height: 50px !important;
  }

  /* Headings and main text scale down only for mobile */
  h1,
  .text-2xl,
  .xs\:text-3xl,
  .sm\:text-4xl,
  .md\:text-5xl {
    font-size: 1.16rem !important;
    line-height: 1.28 !important;
    margin-bottom: 0.4em !important;
  }

  .text-xl,
  .sm\:text-2xl {
    font-size: 1.07rem !important;
    line-height: 1.37 !important;
  }

  .text-lg,
  .sm\:text-xl {
    font-size: 1.01rem !important;
    line-height: 1.37 !important;
  }

  ul,
  li {
    font-size: 1.02em !important;
    line-height: 1.48 !important;
    margin-left: 0.65em !important;
  }

  .project-gallery-img {
    width: 150px !important;
    height: 80px !important;
    max-width: 150vw !important;
    max-height: 80px !important;
    border-radius: 10px !important;
  }

  /* Spacing tweaks */
  .mb-10 {
    margin-bottom: 1.2rem !important;
  }

  .mb-8 {
    margin-bottom: 1rem !important;
  }

  .mb-6 {
    margin-bottom: 0.8rem !important;
  }

  .mb-4 {
    margin-bottom: 0.65rem !important;
  }

  .mb-2 {
    margin-bottom: 0.55rem !important;
  }

  .pl-8 {
    padding-left: 1.2rem !important;
  }
}

html {
  scroll-behavior: smooth;
}
</style>
