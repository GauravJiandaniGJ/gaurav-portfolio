<template>
  <div class="w-full flex flex-col gap-5 sm:gap-5 max-w-[100vw] mx-auto scroll-smooth">

    <!-- EXPERIENCES -->
    <section id="experiences" class="px-2 sm:px-3 md:px-5">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mt-10 mb-5 text-blue-600 text-center">
        Professional Experiences
      </h2>
      <div class="grid gap-8 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
        <ExperiencedProject v-for="project in projects" :key="project.id" :project="project"
          class="hover:shadow-sm hover:scale-[1.01] transition-all duration-200 cursor-pointer relative overflow-hidden rounded-lg group"
          @mouseenter="createRipple($event)">
          <span class="ripple"></span>
        </ExperiencedProject>
      </div>
    </section>

    <div class="my-5 sm:my-10"></div>

    <!-- LIVE PROJECTS -->
    <section id="projects" class="px-2 sm:px-3 md:px-5 flex flex-col items-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-5 text-blue-600 text-center w-full">
        Live Projects
      </h2>
      <div class="w-full flex flex-row justify-center gap-8 flex-wrap">
        <div v-for="project in personalProjects" :key="project.id"
          class="live-project-card flex-1 min-w-[340px] max-w-[700px] bg-blue-900 border border-gray-600 rounded-lg px-5 py-5 flex flex-col items-center text-center shadow transition-transform duration-300 ease-[cubic-bezier(.65,-0.01,.3,1.01)] relative group cursor-pointer overflow-hidden"
          @click="$router.push({ name: 'live-project-detail', params: { id: project.id } })">
          <!-- Ripple animation circle -->
          <span
            class="absolute inset-0 rounded-lg pointer-events-none z-0 group-hover:bg-blue-800/30 animate-fadeIn"></span>
          <!-- Shine effect on hover -->
          <span class="shine"></span>
          <!-- SVG: Only visible on hover -->
          <span class="absolute top-4 right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style="pointer-events:none;">
            <svg class="w-3 h-3 text-white drop-shadow" aria-hidden="true" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
            </svg>
          </span>
          <!-- Card content -->
          <div
            class="font-semibold text-xl mb-2 text-white z-10 transition-all duration-300 group-hover:text-blue-300">
            {{ project.title }}
          </div>
          <div
            class="mb-2 text-base font-medium text-gray-300 z-10 transition-all duration-300 group-hover:text-blue-100">
            Technology: <span class="font-semibold">{{ project.technology }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="my-3 sm:my-5"></div>

    <!-- PARALLAX / QUOTE SECTION -->
    <section class="px-2 sm:px-3 md:px-5">
      <div ref="parallaxRef"
        class="relative overflow-hidden rounded-lg min-h-[180px] sm:min-h-[300px] md:min-h-[500px] shadow-sm parallax-section ripple-container"
        @mouseenter="createRipple($event)">
        <div class="absolute inset-0 w-full h-full z-0 parallax-img" :style="{
          backgroundImage: `url('/static/parallax_dark2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `translateY(${parallaxOffset}px)`
        }"></div>
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        <div
          class="relative z-20 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[300px] md:min-h-[500px]">
          <span
            class="text-base sm:text-2xl md:text-4xl font-black drop-shadow-sm shadow-sm text-white px-2 sm:px-4 py-8 sm:py-10 text-center custom-color">
            DEVELOPER BY DAY AND DESIGNER BY NIGHT
          </span>
        </div>
        <span class="ripple"></span>
      </div>
    </section>

    <div class="my-3 sm:my-5"></div>

    <!-- TIMELINE -->
    <section id="timeline" class="px-2 sm:px-3 md:px-5">
      <Timeline />
    </section>

    <div class="my-3 sm:my-5"></div>

    <!-- ACHIEVEMENTS -->
    <section id="achievements" class="px-2 sm:px-3 md:px-5">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-5 sm:mb-5 text-blue-600 text-center">
        Achievements
      </h2>
      <Achievements />
    </section>

    <div class="my-3 sm:my-5"></div>

    <!-- SKILLS -->
    <section id="skills" class="px-2 sm:px-3 md:px-5">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-5 sm:mb-5 text-blue-600 text-center">
        Skills
      </h2>
      <Rating />
    </section>

    <!-- Project Drawer (leave as is if you use it for other purpose) -->
    <PersonalProjectDialog :isDrawerOpen="isDrawerOpen" :project="personalProjectObject"
      @close-drawer="isDrawerOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ExperiencedProject from '@/components/ExperiencedProject.vue'
import PersonalProjectDialog from '@/components/PersonalProjectDialog.vue'
import Timeline from '@/components/Timeline.vue'
import Achievements from '@/components/Achievements.vue'
import Rating from '@/components/Rating.vue'
import projects from '@/data/projects'


import { onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(async () => {
  if (route.query.scrollTo) {
    await nextTick()
    setTimeout(() => {
      const section = document.getElementById(route.query.scrollTo)
      if (section) section.scrollIntoView({ behavior: 'smooth' })
    }, 180)
  }
})


const isDrawerOpen = ref(false)
const personalProjectObject = ref({ id: 0, title: '', url: '', description: [], images: [] })

const personalProjects = [
  {
    id: 1,
    title: 'Web Impex',
    url: 'https://www.thewebimpex.com/',
    technology: 'Laravel, JQuery & AWS EC2',
    description: [
      { id: 1, content: 'A Web Application to Build lightning fast all India Export JOBS (shipping bills) and upload on ICEGATE' },
      { id: 2, content: 'A responsive API-driven web app generating xml files of export jobs based on ICEGATE GUIDELINES' },
      { id: 3, content: 'Easy to understand checklist as per Indian custom regulations' },
      { id: 4, content: 'Deployment on EC2 of giant cloudbase AWS' }
    ],
    images: [
      { id: 1, src: '/gauravimpex1.png' },
      { id: 2, src: '/gauravimpex2.png' },
      { id: 3, src: '/gauravimpex3.png' }
    ]
  },
  {
    id: 2,
    title: 'GST Billing App',
    url: 'https://www.gaurav-gst-billing.com/',
    technology: 'Laravel, VueJs & Digital Ocean',
    description: [
      { id: 1, content: 'Web Application to build and generate Government approved standard invoices after calculating pre-determined GST' },
      { id: 2, content: 'Key Shortcuts to insert longer descriptions built after analysing reports of last 6 months of building application' },
      { id: 3, content: 'Segregation of custom dated reports with option to select based on different criterias.' },
      { id: 4, content: 'Deployed application on droplet of digital ocean' }
    ],
    images: [
      { id: 1, src: '/gauravGstBilling1.png' },
      { id: 2, src: '/gauravGstBilling2.png' },
      { id: 3, src: '/gauravGstBilling3.png' }
    ]
  }
]

// Ripple effect for cards
function createRipple (event) {
  const card = event.currentTarget
  let ripple = card.querySelector('.ripple')
  if (!ripple) return
  ripple.classList.remove('show')
  const rect = card.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height)
  const x = event.clientX - rect.left - size / 2
  const y = event.clientY - rect.top - size / 2
  ripple.style.width = ripple.style.height = `${size}px`
  ripple.style.left = `${x}px`
  ripple.style.top = `${y}px`
  ripple.classList.add('show')
  setTimeout(() => ripple.classList.remove('show'), 550)
}
</script>

<style scoped>
.custom-color {
  color: #ffffff;
}

html {
  scroll-behavior: smooth;
}

@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

.live-project-card {
  position: relative;
  overflow: hidden;
}

.live-project-card .shine {
  position: absolute;
  top: -70%;
  left: -60%;
  width: 200%;
  height: 230%;
  background: linear-gradient(120deg, transparent 60%, rgba(255, 255, 255, 0.20) 75%, transparent 90%);
  opacity: 0.0;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.45s;
}

.live-project-card:hover .shine {
  opacity: 1;
  animation: shineMove 0.9s cubic-bezier(.57, -0.06, .62, 1.15);
}

@keyframes shineMove {
  0% {
    transform: translateX(-60%) skewX(-16deg);
    opacity: 0.10;
  }

  50% {
    opacity: 0.4;
  }

  85% {
    opacity: 0.2;
  }

  100% {
    transform: translateX(60%) skewX(-16deg);
    opacity: 0;
  }
}

.live-project-card svg {
  filter: drop-shadow(0 1px 4px #000a);
}
</style>
