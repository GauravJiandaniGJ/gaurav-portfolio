<script setup>
import { siteContent as content } from '@/data/siteContent.js'
</script>

<template>
  <section class="min-h-[100vh] flex items-center justify-center px-4 sm:px-5 py-12 sm:py-16">
    <div class="max-w-7xl mx-auto text-center">
      <!-- Main Headline -->
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
        <span class="text-gray-800 dark:text-gray-100">{{ content.hero.headline }}</span>
        <br />
        <span class="text-blue-600 dark:text-blue-400">{{ content.hero.headlineAccent }}</span>
      </h1>

      <!-- Subheadline -->
      <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
        {{ content.hero.subheadline }}
      </p>

      <!-- Credibility Line -->
      <p class="text-sm sm:text-md text-gray-500 dark:text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
        {{ content.hero.credibilityLine }}
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          :href="content.hero.primaryCTA.link"
          class="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          {{ content.hero.primaryCTA.text }} &rarr;
        </a>
        <a
          :href="content.hero.secondaryCTA.link"
          class="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-400 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold rounded-lg transition-all duration-200"
        >
          {{ content.hero.secondaryCTA.text }}
        </a>
      </div>

      <!-- Trust Indicators - SEO Optimized -->
      <div class="mt-12 sm:mt-16 flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-500 dark:text-gray-500" role="list" aria-label="Key credentials and expertise">
        <span class="flex items-center gap-2" role="listitem">
          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span>1M+ requests/day systems</span>
        </span>
        <span class="flex items-center gap-2" role="listitem">
          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span>10+ years experience</span>
        </span>
        <a
          href="#proof"
          class="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          role="listitem"
          title="View Anthropic Claude Code Certification"
        >
          <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          <span>Anthropic Claude Code Certified</span>
        </a>
      </div>
    </div>
  </section>
</template>
