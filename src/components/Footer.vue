<template>
    <footer class="w-full py-6 sm:py-8 px-4 sm:px-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div class="max-w-5xl mx-auto">
            <!-- Bio -->
            <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-center mb-4 sm:mb-6">
                {{ footer.bio }}
            </p>
            <!-- Copyright & Tagline -->
            <div class="text-center text-gray-500 dark:text-gray-500 text-xs sm:text-sm">
                <p>{{ footer.copyright }}</p>
                <p class="mt-1">{{ footer.tagline }}</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { siteContent } from '@/data/siteContent.js'

const footer = siteContent.footer
</script>
