<template>
    <footer class="w-full mt-10 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <div class="mx-auto w-full max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-center">
            <span class="text-sm text-gray-700 dark:text-gray-200 text-center sm:text-left">
                All rights reserved &copy; {{ currentYear }} Gaurav Jiandani
            </span>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>
