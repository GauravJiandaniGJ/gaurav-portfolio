<script setup>
import { siteContent as content } from '@/data/siteContent.js'
</script>

<template>
  <section id="fit" class="py-12 sm:py-16 px-4 sm:px-6">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10 sm:mb-12">
        {{ content.fitAssessment.sectionTitle }}
      </h2>

      <div class="grid md:grid-cols-2 gap-6 sm:gap-8">
        <!-- Good Fit -->
        <div class="glass-card rounded-xl sm:p-8 ring-1 ring-green-500/20">
          <h3 class="text-lg sm:text-xl font-semibold text-green-600 dark:text-green-400 mb-4 sm:mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            {{ content.fitAssessment.goodFit.title }}
          </h3>
          <ul class="space-y-3 sm:space-y-4">
            <li
              v-for="(item, index) in content.fitAssessment.goodFit.items"
              :key="index"
              class="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
            >
              <span class="text-green-500 mt-1 flex-shrink-0">&bull;</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <!-- Not Fit -->
        <div class="glass-card rounded-xl sm:p-8">
          <h3 class="text-lg sm:text-xl font-semibold text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 flex items-center gap-2">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            {{ content.fitAssessment.notFit.title }}
          </h3>
          <ul class="space-y-3 sm:space-y-4">
            <li
              v-for="(item, index) in content.fitAssessment.notFit.items"
              :key="index"
              class="flex items-start gap-3 text-gray-500 dark:text-gray-400 text-sm sm:text-base"
            >
              <span class="text-gray-400 dark:text-gray-600 mt-1 flex-shrink-0">&bull;</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
