<template>
    <div
        class="m-2 rounded-lg shadow-sm border bg-white dark:bg-gray-900 min-h-[120px] max-h-[120px] sm:min-h-[120px] sm:max-h-[120px] flex items-center">
        <div class="flex flex-wrap w-full p-4">
            <div class="w-full md:w-2/3 mb-2 md:mb-0">
                <span class="font-bold block truncate text-lg">{{ project.title }}</span>
                <span>
                    Technology:
                    <span class="font-bold">{{ project.technology }}</span>
                </span>
            </div>
            <div class="w-full md:w-1/3 flex md:justify-end justify-center items-center">
                <button
                    class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition pointer"
                    @click="$emit('open-drawer', project)">
                    View
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
.pointer {
    cursor: pointer;
}

html {
  scroll-behavior: smooth;
}

</style>
