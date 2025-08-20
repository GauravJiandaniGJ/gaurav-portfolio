<!-- src/pages/LiveProjects.vue -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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

const route = useRoute()
const router = useRouter()
const projectId = Number(route.params.id)
const project = computed(() => personalProjects.find(p => p.id === projectId))

function goBack () {
    router.back()
}

// --- Image Zoom Logic ---
const zoomedImg = ref(null)
function openZoom (img) {
    zoomedImg.value = img
    document.body.style.overflow = 'hidden'
}
function closeZoom () {
    zoomedImg.value = null
    document.body.style.overflow = ''
}

// Close on Esc key
function handleKey (e) {
    if (e.key === 'Escape') closeZoom()
}
onMounted(() => window.addEventListener('keydown', handleKey))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKey))
</script>

<template>
    <div class="w-full min-h-screen bg-white dark:bg-[#303030] flex flex-col items-center py-4 sm:py-8 px-1 sm:px-0">
        <div class="w-full max-w-7xl mx-auto">
            <!-- Back Button -->
            <button @click="goBack"
                class="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 dark:bg-blue-900 text-white font-semibold shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 transition mb-8 mt-2 text-md">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
            </button>

            <div v-if="project"
                class="w-full bg-[#f2f2f2] dark:bg-gray-700 rounded-lg shadow-sm flex flex-col md:flex-row overflow-hidden animate-fadeIn scale-100 md:scale-105 md:hover:scale-105 transition-transform duration-400">
                <!-- Image Gallery -->
                <div
                    class="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-500 dark:bg-gray-800 p-5 md:p-10 gap-5 md:gap-10">
                    <div v-if="project.images && project.images.length"
                        class="flex flex-col gap-6 w-full items-center">
                        <img v-for="img in project.images" :key="img.id"
                            :src="img.src.startsWith('/static/') ? img.src : '/static/' + img.src.replace(/^\/+/, '')"
                            :alt="project.title + ' screenshot ' + img.id"
                            class="w-[350px] h-[150px] sm:w-[320px] sm:h-[200px] md:w-[340px] md:h-[250px] lg:w-[550px] lg:h-[220px] object-cover rounded-lg shadow-sm hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                            loading="lazy" @click="openZoom(img)" />
                    </div>
                </div>
                <!-- Project Info -->
                <div
                    class="flex flex-col items-center md:w-1/2 w-full px-6 sm:px-12 py-10 text-center">
                    <h1
                        class="text-3xl sm:text-4xl lg:text-4xl font-extrabold mb-4 text-blue-300 dark:text-blue-600 leading-tight tracking-tight drop-shadow">
                        {{ project.title }}
                    </h1>
                    <div class="text-lg sm:text-xl lg:text-2xl text-blue-200 dark:text-blue-400 mb-5 font-semibold">
                        <span class="text-blue-400 dark:text-blue-200">Technology:</span>
                        <span class="ml-2 text-gray-600 dark:text-white">{{ project.technology }}</span>
                    </div>
                    <ul
                        class="list-disc pl-7 sm:pl-10 text-base sm:text-lg lg:text-lg text-blue-500 dark:text-gray-200 mb-8 mt-2 space-y-3 w-full max-w-2xl mx-auto text-left">
                        <li v-for="desc in project.description" :key="desc.id">
                            {{ desc.content }}
                        </li>
                    </ul>
                    <a v-if="project.url"
                        :href="project.url.startsWith('http') ? project.url : 'https://' + project.url"
                        class="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white font-bold shadow-sm hover:bg-blue-700 hover:scale-105 transition-all text-md mt-5"
                        target="_blank" rel="noopener">
                        Visit Project
                        <svg class="w-3 h-3 ml-2" aria-hidden="true" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                        </svg>
                    </a>
                </div>
            </div>

            <div v-else class="flex items-center justify-center min-h-[50vh] text-2xl text-red-500 font-bold">
                Project not found.
            </div>
        </div>

        <!-- Zoomed Image Modal -->
        <transition name="fade">
            <div v-if="zoomedImg" class="fixed z-[9999] inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
                @click.self="closeZoom">
                <img :src="zoomedImg.src.startsWith('/static/') ? zoomedImg.src : '/static/' + zoomedImg.src.replace(/^\/+/, '')"
                    :alt="zoomedImg.id"
                    class="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-sm border-4 border-white"
                    @click.stop />
            </div>
        </transition>
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(40px) scale(0.97);}
    to   { opacity: 1; transform: none;}
}
.animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(.53, -0.01, .27, 1);}
.fade-enter-active,
.fade-leave-active { transition: opacity 0.23s cubic-bezier(.48, .32, .41, 1);}
.fade-enter-from,
.fade-leave-to { opacity: 0;}
</style>
