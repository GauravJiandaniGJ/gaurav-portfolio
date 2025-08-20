<template>
    <footer class="w-full flex items-center justify-center mt-10 py-4 bg-gray-100 dark:bg-gray-800 shadow-inner">
        <span class="text-gray-700 dark:text-gray-200 text-sm">
            All rights reserved &copy; {{ currentYear }} Gaurav Jiandani
        </span>
    </footer>
</template>

<script setup>
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>
