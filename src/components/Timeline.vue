<script setup>
import { computed, onMounted, ref } from 'vue'

const today = new Date()
const todayDateDay = computed(() => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()])
const todayDate = computed(() => today.getDate())
const todayMonth = computed(() => [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
][today.getMonth()])
const todayYear = computed(() => today.getFullYear())

const isVisible = ref(false)

onMounted(() => {
    setTimeout(() => {
        isVisible.value = true
    }, 100)
})

const timelineItems = [
    { date: '2013-16', title: 'BCA, DNV', color: 'bg-blue-500' },
    { date: '2016-18', title: 'MSc. IT, DA-IICT', color: 'bg-green-500' },
    { date: 'Aug 2016', title: 'Gaurav GST Billing', color: 'bg-purple-500' },
    { date: 'Dec 2017', title: 'PlexusMd', subtitle: 'I+J Placement', avatar: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned', color: 'bg-orange-500' },
    { date: 'Apr 2018', title: 'Claritex, Simplitium', color: 'bg-teal-500' },
    { date: 'Jun 2018', title: 'Gaurav Impex', color: 'bg-indigo-500' },
    { date: 'Oct 2018', title: 'ClearGlass', color: 'bg-pink-500' },
    { date: 'May 2019', title: 'SaR Contractor', subtitle: 'Multiple Projects', color: 'bg-cyan-500' },
    { date: 'Dec 2019', title: 'Repsorder', color: 'bg-red-500' },
    { date: 'Mar 2020', title: 'AReceivables', color: 'bg-yellow-500' },
    { date: 'Jun 2020', title: 'ProjectX', color: 'bg-emerald-500' },
    { date: 'Mar 2021', title: 'Vebcommerce', color: 'bg-violet-500' },
    { date: 'Dec 2023 - Ongoing', title: 'Wholesale Pricing Discount', color: 'bg-rose-500' },
]
</script>

<template>
  <div
    class="mx-auto max-w-full sm:max-w-md bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500"
    :class="{ 'scale-100 opacity-100': isVisible, 'scale-95 opacity-0': !isVisible }"
  >
    <!-- Header -->
    <div class="relative transition-all duration-700"
      :class="{ 'translate-y-0 opacity-100': isVisible, '-translate-y-4 opacity-0': !isVisible }"
      style="z-index: 1000"
    >
      <!-- CV Button -->
      <div class="absolute bottom-0 right-2 z-50 pointer-events-auto">
        <a
          href="https://gauravjiandani.com/Gaurav_Jiandani_CV.pdf"
          download target="_blank" rel="noopener"
          tabindex="0"
          class="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-12 animate-bounce"
          style="animation-delay:2s; animation-duration:2s; pointer-events: auto;"
        >
          <span class="font-bold text-xs sm:text-sm">CV</span>
        </a>
      </div>

      <div
        class="flex items-center justify-between px-2 py-2 sm:px-4  transition-all duration-500"
        :class="{ 'translate-x-0': isVisible, '-translate-x-full': !isVisible }"
      >
        <div class="w-8 sm:w-10"></div>
        <h3 class="text-[22px] sm:text-4xl font-semibold text-blue-600 animate-fadeIn"
          style="animation-delay: 0.3s;"
        >Timeline</h3>
        <img
          class="rounded-full w-7 h-7 sm:w-10 sm:h-10 ring-1 ring-blue-200 dark:ring-gray-600 transition-all duration-500 hover:ring-4 hover:ring-blue-300 animate-fadeIn"
          style="animation-delay: 0.5s;"
          src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
        />
      </div>

      <!-- Date Card -->
      <div class="relative h-[7.5rem] sm:h-[13rem] overflow-hidden">
        <img src="https://cdn.vuetifyjs.com/images/cards/forest.jpg" alt="forest"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div class="relative flex items-center justify-center h-full px-2 pointer-events-none" style="z-index: 1000;">
          <div class="text-3xl sm:text-5xl text-white font-bold mr-4 sm:mr-6 animate-pulse transition-all duration-500 hover:scale-110">
            {{ todayDate }}
          </div>
          <div
            class="text-white transition-all duration-700"
            :class="{ 'translate-x-0 opacity-100': isVisible, 'translate-x-8 opacity-0': !isVisible }"
            style="transition-delay: 0.4s;"
          >
            <div class="text-base sm:text-lg font-medium animate-slideInRight" style="animation-delay: 0.6s;">
              {{ todayDateDay }}
            </div>
            <div class="text-xs sm:text-sm uppercase tracking-wide opacity-90 animate-slideInRight"
              style="animation-delay: 0.8s;"
            >{{ todayMonth }} {{ todayYear }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Timeline -->
    <div
      class="px-2 sm:px-6 py-4 sm:py-6 transition-all duration-700"
      :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-8 opacity-0': !isVisible }"
      style="transition-delay: 0.3s;"
    >
      <div class="relative">
        <!-- Vertical Line -->
        <div class="absolute left-2 sm:left-2 top-0 bottom-0 w-1 bg-gray-400 dark:bg-gray-600"></div>
        <!-- Items -->
        <div class="space-y-4 sm:space-y-6">
          <div
            v-for="(item, i) in timelineItems" :key="i"
            class="relative flex items-start transition-all duration-500 hover:translate-x-0.5 hover:scale-[1.02] cursor-pointer group"
            :class="{ 'translate-y-0 opacity-100': isVisible, 'translate-y-8 opacity-0': !isVisible }"
            :style="{ transitionDelay: `${0.5 + i * 100}ms` }"
          >
            <!-- Dot -->
            <div class="relative z-10 flex-shrink-0">
              <div
                class="w-5 h-5 sm:w-5 sm:h-5 rounded-full ring-2 sm:ring-4 transition-all duration-500 hover:scale-125 hover:rotate-180 hover:ring-4 animate-fadeInScale"
                :class="item.color"
                :style="{ animationDelay: `${0.5 + i * 100}ms` }"
              >
                <template v-if="item.avatar">
                  <img :src="item.avatar" class="w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform duration-500 hover:rotate-12" />
                </template>
                <template v-else>
                  <div class="w-full h-full rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full animate-ping"
                      :style="{ animationDelay: `${1 + i * 200}ms` }"
                    ></div>
                  </div>
                </template>
              </div>
              <!-- Connecting line animation -->
              <div class="absolute top-2 sm:top-3 left-5 sm:left-6 w-2 h-0.5 bg-gray-200 dark:bg-gray-600 transform origin-left transition-all duration-500 group-hover:scale-x-125 group-hover:bg-blue-400"></div>
            </div>
            <!-- Content -->
            <div class="ml-3 sm:ml-4 flex-1 min-w-0 transition-all duration-500 group-hover:translate-x-2">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h4 class="text-[15px] sm:text-base font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                  {{ item.title }}
                </h4>
                <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0 group-hover:scale-110 group-hover:text-blue-500">
                  {{ item.date }}
                </span>
              </div>
              <p v-if="item.subtitle"
                class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 group-hover:translate-x-1 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                {{ item.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to   { opacity: 1; transform: translateY(0);}
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px);}
  to   { opacity: 1; transform: translateX(0);}
}
@keyframes fadeInScale {
  0%   { opacity: 0; transform: scale(0) rotate(-180deg);}
  50%  { opacity: 0.5; transform: scale(0.8) rotate(-90deg);}
  100% { opacity: 1; transform: scale(1) rotate(0deg);}
}
.animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
.animate-slideInRight { animation: slideInRight 0.8s ease-out forwards; }
.animate-fadeInScale { animation: fadeInScale 1s ease-out forwards; opacity: 0; }
</style>
