<script setup>
import { siteContent as content } from '@/data/siteContent.js'

const cert = content.proof.certification
</script>

<template>
  <section id="proof" class="py-8 sm:py-12 px-4 sm:px-4 bg-gray-50 dark:bg-gray-900/50" aria-labelledby="proof-heading">
    <div class="max-w-7xl mx-auto">
      <h2 id="proof-heading" class="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-10 sm:mb-12">
        {{ content.proof.sectionTitle }}
      </h2>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12" role="list" aria-label="Key metrics and achievements">
        <div
          v-for="(stat, index) in content.proof.stats"
          :key="index"
          class="text-center p-4 sm:p-6"
          role="listitem"
        >
            <div class="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">
            {{ stat.value }}
          </div>
          <div class="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- Anthropic Claude Code Certification - SEO Optimized -->
      <article
        class="glass-card rounded-xl sm:p-8 mb-8 sm:mb-10"
        itemscope
        itemtype="https://schema.org/EducationalOccupationalCredential"
        aria-label="Professional Certification from Anthropic"
      >
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
          <!-- Certificate Image -->
          <figure class="flex-shrink-0 w-full lg:w-auto">
            <a
              :href="cert.verifyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="block"
              title="Verify Claude Code in Action Certificate"
            >
              <img
                :src="cert.image"
                :alt="cert.altText"
                class="w-full lg:w-72 xl:w-80 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                loading="lazy"
                width="320"
                height="240"
                itemprop="image"
              />
            </a>
            <figcaption class="sr-only">{{ cert.altText }}</figcaption>
          </figure>

          <!-- Certificate Details -->
          <div class="flex-1 text-center lg:text-left">
            <div class="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                Certified
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400" itemprop="dateCreated">
                {{ cert.issuedDate }}
              </span>
            </div>

            <h3 class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1" itemprop="name">
              {{ cert.title }}
            </h3>

            <p class="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3" itemprop="creator" itemscope itemtype="https://schema.org/Organization">
              <span itemprop="name">{{ cert.issuer }}</span>
            </p>

            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed" itemprop="description">
              {{ cert.description }}
            </p>

            <!-- Skills Tags - SEO Keywords -->
            <div class="flex flex-wrap justify-center lg:justify-start gap-2 mb-4" aria-label="Certified skills">
              <span
                v-for="skill in cert.skills"
                :key="skill"
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs rounded-md"
                itemprop="competencyRequired"
              >
                {{ skill }}
              </span>
            </div>

            <!-- Verify Link -->
            <a
              :href="cert.verifyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              itemprop="url"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Verify Certificate
              <span class="text-xs text-gray-400">(ID: {{ cert.certificateId }})</span>
            </a>
          </div>
        </div>
      </article>

      <!-- Achievements List -->
      <div class="glass-card rounded-xl sm:p-8">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Technical Achievements</h3>
        <ul class="grid md:grid-cols-2 gap-3 sm:gap-4" role="list">
          <li
            v-for="(achievement, index) in content.proof.achievements"
            :key="index"
            class="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm sm:text-base"
            role="listitem"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>{{ achievement }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
