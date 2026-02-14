<template>
    <footer class="w-full mt-10 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span class="text-sm text-gray-700 dark:text-gray-200 text-center sm:text-left">
                All rights reserved &copy; {{ currentYear }} Gaurav Jiandani
            </span>

            <a href="https://medium.com/@jiandanigaurav" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-700 dark:hover:text-blue-300 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 self-center sm:self-auto">
                <svg viewBox="0 0 24 24" class="w-4 h-4" aria-hidden="true">
                    <path fill="currentColor"
                        d="M13.54 12.49c0 3.77-3.03 6.83-6.77 6.83S0 16.26 0 12.49s3.03-6.82 6.77-6.82 6.77 3.05 6.77 6.82zm7.43 0c0 3.55-1.51 6.43-3.38 6.43-1.86 0-3.37-2.88-3.37-6.43s1.51-6.43 3.37-6.43 3.38 2.88 3.38 6.43zM24 12.49c0 3.18-.53 5.76-1.19 5.76-.66 0-1.19-2.58-1.19-5.76s.53-5.76 1.19-5.76c.66 0 1.19 2.58 1.19 5.76z" />
                </svg>
                <span>Medium</span>
            </a>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>
