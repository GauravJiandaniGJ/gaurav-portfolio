<script setup>
import { siteContent as content } from '@/data/siteContent.js'
</script>

<template>
  <section id="contact" class="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
        {{ content.finalCTA.title }}
      </h2>
      <p class="text-sm sm:text-md text-gray-600 dark:text-gray-400 mb-8 sm:mb-10 leading-relaxed">
        {{ content.finalCTA.description }}
      </p>

      <a
        :href="content.finalCTA.calendlyUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
      >
        {{ content.finalCTA.buttonText }}
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      </a>

      <p class="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
        Prefer email?
        <a
          :href="`mailto:${content.finalCTA.email}?subject=Inquiry: Technical Partnership`"
          class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          {{ content.finalCTA.email }}
        </a>
      </p>
    </div>
  </section>
</template>
