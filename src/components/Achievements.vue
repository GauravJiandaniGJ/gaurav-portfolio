<template>
  <div class="space-y-3 pt-3">
    <details
      v-for="item in items"
      :key="item.title"
      class="group rounded-xl shadow-xl bg-gray-200 dark:bg-[#353535] border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:border-0"
    >
      <summary
        class="cursor-pointer flex items-center px-3 py-2 sm:px-5 sm:py-3 text-[15px] sm:text-lg md:text-xl font-semibold sm:font-bold text-blue-700 dark:text-blue-300 focus:outline-none transition-all duration-200
        relative hover:scale-[1.02] hover:rounded-xl
        hover:bg-gray-100 hover:to-gray-100
        dark:hover:bg-gray-700 hover:shadow-xl
        gap-1"
      >
        <span class="flex-1 truncate">{{ item.emoji }} {{ item.title }}</span>
        <span class="ml-1 sm:ml-2 flex-shrink-0 transition-transform duration-300 group-open:rotate-90">
          <svg :width="iconSize" :height="iconSize" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </span>
      </summary>
      <div class="px-4 sm:px-7 pb-2 sm:pb-4 mt-5 animate-fadeIn">
        <ul class="list-disc ml-5 text-gray-700 dark:text-gray-200 text-[13px] sm:text-sm">
          <li>{{ item.desc }}</li>
        </ul>
      </div>
    </details>
  </div>
</template>

<script setup>
const items = [
  {
    emoji: "🥇",
    title: "Gold Medal in Hackathon of 36 hours",
    desc: "Built Event Registrar System built in Digital India 36 hour Hackathon using Twilio with a team size of 4."
  },
  {
    emoji: "🏆",
    title: "Winner of Internal Hackathon",
    desc: "Cashprize for winning ClearGlass Internal Hackathon of 30 hours by building All In One PlayList. Lead a team of size 4"
  },
  {
    emoji: "🥉",
    title: "3rd Prize in Quiz",
    desc: "Won third prize in a Quiz Competition between city schools of science stream of Gandhidham."
  },
  {
    emoji: "💡",
    title: "Save costing for a client by 50%",
    desc: "Reduced ITO Cost by 50 percent after successfully replacing Twilio with Amazon Connect, the feature used by support team to connect with customers for complaints, feedback, etc."
  },
  {
    emoji: "🏋️‍♂️",
    title: "Fitness Freak - Physique Transformation",
    desc: "Serves as role model for many people who tend to transform their physique in fitness industry."
  }
]

// Icon size matches text size
const iconSize = 20
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.animate-fadeIn {
  animation: fadeIn 0.45s cubic-bezier(0.45,1.5,0.4,1);
}

html {
  scroll-behavior: smooth;
}

</style>
