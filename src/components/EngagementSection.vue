<script setup>
import { siteContent as content } from '@/data/siteContent.js'
</script>

<template>
  <section id="engagement" class="py-8 sm:py-12 px-4 sm:px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
        {{ content.engagement.sectionTitle }}
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-10 sm:mb-12 text-base sm:text-lg">
        {{ content.engagement.intro }}
      </p>

      <div class="grid md:grid-cols-2 gap-4 sm:gap-6">
        <div
          v-for="(item, index) in content.engagement.items"
          :key="index"
          class="glass-card flex gap-3 sm:gap-4 p-5 sm:p-6 rounded-xl"
        >
          <div class="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">
            <span class="text-blue-600 dark:text-blue-400 font-bold text-sm sm:text-base">{{ index + 1 }}</span>
          </div>
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
              {{ item.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
