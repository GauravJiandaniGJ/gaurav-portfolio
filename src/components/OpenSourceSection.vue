<script setup>
import { siteContent as content } from '@/data/siteContent.js'

const openSource = content.openSource
</script>

<template>
  <section id="open-source" class="py-8 sm:py-12 px-4 sm:px-4" aria-labelledby="open-source-heading">
    <div class="max-w-7xl mx-auto">
      <h2 id="open-source-heading" class="text-2xl sm:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">
        {{ openSource.sectionTitle }}
      </h2>
      <p class="text-center text-gray-600 dark:text-gray-400 mb-10 sm:mb-12">
        {{ openSource.sectionSubtitle }}
      </p>

      <!-- Projects Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
        <article
          v-for="(project, index) in openSource.projects"
          :key="index"
          class="glass-card glass-hover rounded-xl p-5 sm:p-6 flex flex-col"
        >
          <!-- Title & Stats -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">
              {{ project.title }}
            </h3>
            <span class="text-xs text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">
              {{ project.stats }}
            </span>
          </div>

          <!-- Description -->
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
            {{ project.description }}
          </p>

          <!-- Tech Tags -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="tech in project.tech"
              :key="tech"
              class="px-2 py-0.5 bg-gray-200 dark:bg-gray-700/50 rounded text-xs text-gray-700 dark:text-gray-300"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Links -->
          <div class="flex flex-wrap gap-3 pt-3 border-t border-gray-200 dark:border-gray-700/50">
            <a
              v-if="project.links.github"
              :href="project.links.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
              </svg>
              GitHub
            </a>
            <a
              v-if="project.links.article"
              :href="project.links.article"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M13 9h-2v2h2V9zm0 4h-2v6h2v-6zm-1-9C6.48 4 2 8.48 2 14s4.48 10 10 10 10-4.48 10-10S17.52 4 12 4zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              Read Article
            </a>
          </div>
        </article>
      </div>

      <!-- Writing Section -->
      <div class="glass-card rounded-xl sm:p-8 text-center">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {{ openSource.writing.title }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {{ openSource.writing.description }}
        </p>
        <a
          :href="openSource.writing.mediumUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
          Read on Medium
        </a>
      </div>
    </div>
  </section>
</template>
