<script setup>
import { siteContent as content } from '@/data/siteContent.js'
</script>

<template>
  <section id="problems" class="py-8 sm:py-12 px-4 sm:px-4 bg-gray-50 dark:bg-gray-900/50">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10 sm:mb-12">
        {{ content.problems.sectionTitle }}
      </h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="(problem, index) in content.problems.items"
          :key="index"
          class="glass-card glass-hover rounded-xl p-5 sm:p-6"
        >
          <h3 class="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
            {{ problem.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            {{ problem.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
