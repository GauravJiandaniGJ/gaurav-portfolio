<script setup>
import { computed } from 'vue'
import projects from '@/data/projects.js'

const featuredProjects = computed(() =>
  projects.filter(p => p.featured)
)
</script>

<template>
  <section id="case-studies" class="py-8 sm:py-12 px-4 sm:px-4">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
        Selected Case Studies
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-10 sm:mb-12">
        Real problems, real outcomes
      </p>

      <div class="space-y-6 sm:space-y-8">
        <div
          v-for="project in featuredProjects"
          :key="project.id"
          class="glass-card glass-hover rounded-xl sm:p-8"
        >
          <!-- Header -->
          <div class="flex flex-wrap items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <span class="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">{{ project.category }}</span>
              <h3 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">{{ project.title }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technology.slice(0, 3)"
                :key="tech.name"
                class="px-2 sm:px-3 py-1 bg-gray-200/60 dark:bg-gray-800/60 rounded-full text-xs text-gray-700 dark:text-gray-300"
              >
                {{ tech.name }}
              </span>
            </div>
          </div>

          <!-- Challenge & Outcome -->
          <div class="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div>
              <h4 class="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Challenge</h4>
              <p class="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{{ project.challenge }}</p>
            </div>
            <div>
              <h4 class="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Outcome</h4>
              <p class="text-green-600 dark:text-green-400 font-medium text-sm sm:text-base">{{ project.outcome }}</p>
            </div>
          </div>

          <!-- Metrics -->
          <div class="flex flex-wrap gap-3 sm:gap-4">
            <span
              v-for="(metric, index) in project.metrics"
              :key="index"
              class="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400"
            >
              <svg class="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              {{ metric }}
            </span>
          </div>

          <!-- Role -->
          <div class="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700/50">
            <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-500">Role: {{ project.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
