<template>
    <div class="project-card w-full flex flex-col p-5 bg-gray-200 border border-gray-200 rounded-lg shadow-sm dark:bg-[#1b1b1b] dark:border-gray-700 cursor-pointer hover:shadow-lg transition"
        @click="$router.push('/project/' + project.id)">
        <div class="flex items-center mb-5 gap-2">
            <div v-if="project.logo" class="logo-wrapper">
                <img :src="project.logo" alt="Logo" class="logo-img" />
            </div>
            <div>
                <h5 class="text-xl font-semibold tracking-tight text-blue-700 dark:text-blue-400 leading-tight">{{
                    project.title }}</h5>
                <div class="text-xs text-gray-400 leading-tight">{{ project.technology }}</div>
            </div>
        </div>
        <p class="mb-1 text-gray-700 font-semibold dark:text-gray-300 text-sm leading-tight">
            Industry: {{ project.productSite }}
        </p>
        <ul class="mb-1 text-gray-500 dark:text-gray-400 text-xs list-disc pl-4 leading-snug">
            <template v-for="desc in project.description.slice(0, 2)" :key="desc.id">
                <li class="truncate-desc">{{ desc.content }}</li>
            </template>
        </ul>
        <span class="inline-flex items-center text-blue-600 hover:underline mt-5" style="font-size: 13px;">
            See more details
            <svg class="w-3 h-3 ms-1" aria-hidden="true" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
            </svg>
        </span>
    </div>
</template>

<script setup>
defineProps({
    project: Object
})
</script>

<style scoped>
.project-card {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
}

.truncate-desc {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    /* Only ONE line per description item */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    margin-bottom: 0;
}

.logo-wrapper {
    width: 34px;
    height: 34px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid #eee;
    overflow: hidden;
    flex-shrink: 0;
}

.logo-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
    display: block;
}

@media (max-width: 640px) {
    .project-card {
        padding: 8px;
    }

    .logo-wrapper {
        width: 26px;
        height: 26px;
        border-radius: 7px;
    }
}

html {
  scroll-behavior: smooth;
}

</style>
