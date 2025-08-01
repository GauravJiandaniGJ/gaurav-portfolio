<template>
  <div class="w-full flex flex-col gap-6 sm:gap-10 max-w-[97vw] mx-auto">
    <!-- EXPERIENCES -->
    <section id="experiences" class="px-2 sm:px-3 md:px-5">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-blue-600 text-center">
        Professional Experiences
      </h2>
      <h3 class="subtitle text-xs sm:text-sm font-semibold mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-center">
        Click the cards to view them in detail
      </h3>
      <div class="grid gap-10 sm:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
        <ExperiencedProject v-for="project in projects" :key="project.id" :project="project"
          class="hover:shadow-2xl hover:scale-[1.01] transition-all duration-200 cursor-pointer relative overflow-hidden rounded-2xl group"
          @mouseenter="createRipple($event)">
          <span class="ripple"></span>
        </ExperiencedProject>
      </div>
    </section>

    <div class="my-3 sm:my-5 border-t border-gray-300 dark:border-gray-700"></div>

<!-- LIVE PROJECTS (replace just this section) -->
<section id="projects" class="px-2 sm:px-3 md:px-5">
  <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 text-blue-600 text-center">
    Live Projects
  </h2>
  <h3 class="subtitle text-xs sm:text-sm font-semibold mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-center">
    Click the buttons below
  </h3>
  <div class="flex flex-col gap-3 sm:gap-6 w-full max-w-lg mx-auto">
    <div v-for="project in personalProjects" :key="project.id"
      class="bg-blue-950/90 dark:bg-blue-900/70 border border-blue-700 rounded-xl p-3 sm:p-3 flex flex-col items-center text-center hover:shadow-xl hover:scale-[1.01] transition-all duration-200 relative overflow-hidden group custom-project-card">
      <div class="font-semibold text-base xs:text-lg sm:text-xl mb-1 text-gray-100 dark:text-white">
        {{ project.title }}
      </div>
      <div class="mb-2 text-xs xs:text-sm sm:text-base font-medium text-gray-300">
        Technology: <span class="font-semibold text-white">{{ project.technology }}</span>
      </div>
      <a :href="project.url" target="_blank"
        class="mt-2 px-4 py-1.5 rounded-lg bg-blue-600 dark:bg-white text-white dark:text-black font-semibold shadow hover:bg-blue-700 dark:hover:bg-blue-200 transition text-xs xs:text-sm sm:text-base w-24">
        View
      </a>
    </div>
  </div>
</section>


    <div class="my-3 sm:my-5 border-t border-gray-300 dark:border-gray-700"></div>

    <!-- PARALLAX / QUOTE SECTION -->
    <section class="px-2 sm:px-3 md:px-5">
      <div ref="parallaxRef"
        class="relative overflow-hidden rounded-2xl min-h-[180px] sm:min-h-[300px] md:min-h-[500px] shadow-xl parallax-section ripple-container"
        @mouseenter="createRipple($event)">
        <!-- Parallax image -->
        <div class="absolute inset-0 w-full h-full z-0 parallax-img" :style="{
          backgroundImage: `url('/static/parallax_dark2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transform: `translateY(${parallaxOffset}px)`
        }"></div>
        <!-- Soft dark overlay like Vuetify (not fully black) -->
        <div class="absolute inset-0 bg-black/40 z-10"></div>
        <!-- Centered quote (content) -->
        <div
          class="relative z-20 flex flex-col items-center justify-center min-h-[180px] sm:min-h-[300px] md:min-h-[500px]">
          <span
            class="text-base sm:text-2xl md:text-4xl font-black drop-shadow-lg text-yellow-400 px-2 sm:px-4 py-8 sm:py-10 text-center custom-color">
            Developer by Day and Designer by Night
          </span>
        </div>
        <span class="ripple"></span>
      </div>
    </section>

    <div class="my-3 sm:my-5 border-t border-gray-300 dark:border-gray-700"></div>

    <!-- TIMELINE -->
    <section id="timeline" class="px-2 sm:px-3 md:px-5">
      <Timeline />
    </section>

    <div class="my-3 sm:my-5 border-t border-gray-300 dark:border-gray-700"></div>

    <!-- ACHIEVEMENTS -->
    <section id="achievements" class="px-2 sm:px-3 md:px-5">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-blue-600 text-center">
        Achievements
      </h2>
      <Achievements />
    </section>

    <div class="my-3 sm:my-5 border-t border-gray-300 dark:border-gray-700"></div>

    <!-- SKILLS -->
    <section id="skills" class="px-2 sm:px-3 md:px-5">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6 text-blue-600 text-center">
        Skills
      </h2>
      <Rating />
    </section>

    <!-- Project Drawer -->
    <PersonalProjectDialog :isDrawerOpen="isDrawerOpen" :project="personalProjectObject"
      @close-drawer="isDrawerOpen = false" />
  </div>
</template>

<!-- script and style remain the same as yours -->


<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ExperiencedProject from '@/components/ExperiencedProject.vue'
import PersonalProjectDialog from '@/components/PersonalProjectDialog.vue'
import Timeline from '@/components/Timeline.vue'
import Achievements from '@/components/Achievements.vue'
import Rating from '@/components/Rating.vue'

// Data for projects
const isDrawerOpen = ref(false)
const personalProjectObject = ref({ id: 0, title: '', url: '', description: [], images: [] })

import projects from '@/data/projects'


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

.v-card {
  border-radius: 15px;
}

.card-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  /* Match this to your card's border-radius */
}

.ripple-container {
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  pointer-events: none;
}

.font-weight-bold {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.rounded-parallax {
  border-radius: 20px;
  overflow: hidden;
}

.project-card,
.hover-effect {
  margin-bottom: 0px;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
  border-radius: 15px;
}

.project-card:hover,
.hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: none;
  /* Remove this if you don't want any shadow on hover */
  outline: none;
  /* Remove any outline on hover */
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0);
  pointer-events: none;
}

.show {
  animation: ripple-effect 0.6s linear;
}

@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

@media (max-width: 600px) {

  .project-card,
  .hover-effect,
  .ripple-container {
    margin-left: auto;
    margin-right: auto;
    max-width: 90%;
  }
}

/* Live Projects - Card Custom Responsive Styling */
.custom-project-card {
  box-sizing: border-box;
  margin-bottom: 0.5rem;
}
@media (max-width: 600px) {
  .custom-project-card {
    padding: 0.9rem 0.6rem;
    border-radius: 16px;
    font-size: 15px;
    margin-bottom: 0.8rem;
    min-width: 0;
    box-shadow: 0 3px 12px 0 rgba(15, 23, 42, 0.15);
  }
  .custom-project-card .font-bold {
    font-size: 1.06rem;
    margin-bottom: 0.4rem;
  }
  .custom-project-card .mb-2 {
    margin-bottom: 0.35rem !important;
  }
  .custom-project-card a {
    width: 85px !important;
    font-size: 0.92rem !important;
    padding-top: 0.33rem !important;
    padding-bottom: 0.33rem !important;
    padding-left: 0.6rem !important;
    padding-right: 0.6rem !important;
  }
}
@media (max-width: 370px) {
  .custom-project-card {
    padding: 0.5rem 0.25rem;
    border-radius: 10px;
  }
  .custom-project-card a {
    width: 70px !important;
    font-size: 0.84rem !important;
    padding-top: 0.22rem !important;
    padding-bottom: 0.22rem !important;
  }
}


</style>
