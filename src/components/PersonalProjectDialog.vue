<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
    isDrawerOpen: { type: Boolean, required: true },
    project: { type: Object, required: true }
})

const emit = defineEmits(['close-drawer', 'update:isDrawerOpen'])

const dialog = computed({
    get: () => props.isDrawerOpen,
    set: (val) => emit('update:isDrawerOpen', val)
})

const fullUrl = computed(() => {
    if (!props.project.url) return ''
    return /^(http|https):\/\//.test(props.project.url)
        ? props.project.url
        : `http://${props.project.url}`
})
</script>

<template>
    <transition name="fade">
        <div v-if="dialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div
                class="relative w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-y-auto max-h-[95vh]">
                <!-- Toolbar/Header -->
                <div class="flex items-center bg-blue-600 dark:bg-blue-900 text-white px-4 py-3 rounded-t-lg">
                    <button @click="emit('close-drawer')" class="mr-4 p-2 rounded hover:bg-blue-700 transition"
                        aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="flex-1 font-bold text-lg">
                        {{ project.title }} -
                        <a :href="fullUrl" target="_blank" rel="noopener noreferrer"
                            class="underline text-white hover:text-blue-200 ml-1">{{ project.url }}</a>
                    </div>
                    <button @click="emit('close-drawer')"
                        class="ml-4 px-4 py-2 rounded bg-white text-blue-600 hover:bg-[#f2f2f2] transition font-semibold">
                        Close
                    </button>
                </div>
                <!-- Description list -->
                <div class="p-4">
                    <ul>
                        <li v-for="item in project.description" :key="item.id"
                            class="text-center text-base font-semibold my-2 text-gray-800 dark:text-gray-200">
                            “{{ item.content }}”
                        </li>
                    </ul>
                </div>
                <!-- Image gallery -->
                <div v-if="project.images && project.images.length"
                    class="flex flex-wrap justify-center items-center p-4 gap-4">
                    <div v-for="image in project.images" :key="image.id"
                        class="w-full sm:w-1/2 md:w-1/3 flex justify-center">
                        <img :src="image.src" class="rounded-lg shadow max-w-full max-h-56 object-contain"
                            alt="project image" />
                    </div>
                </div>
            </div>
            <!-- Overlay (click to close) -->
            <div class="fixed inset-0 -z-10" @click="emit('close-drawer')"></div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

html {
  scroll-behavior: smooth;
}

</style>
