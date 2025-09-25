<template>
    <div class="project-card w-full flex flex-col p-5 bg-[#f2f2f2] border border-gray-200 rounded-lg shadow-sm dark:bg-[#272727] dark:border-gray-600 cursor-pointer hover:shadow-sm transition"
        @click="$router.push('/project/' + project.id)">
        <div class="flex items-center mb-5 gap-2">
            <div v-if="project.logo" class="logo-wrapper">
                <img :src="project.logo" alt="Logo" class="logo-img" />
            </div>
            <div>
                <h5 class="text-xl font-semibold tracking-tight text-blue-700 dark:text-blue-400 leading-tight">{{
                    project.title }}</h5>
                <div class="flex gap-1 items-center min-h-[20px]">
                    <template v-for="tech in project.technology" :key="tech.name">
                        <img :src="tech.logo" :alt="tech.name + ' logo'" class="tech-logo" :title="tech.name"
                            loading="lazy"
                            style="background: #ffffff !important; background-color: #ffffff !important;" />
                    </template>
                </div>

            </div>
        </div>
        <p class="mb-1 text-gray-700 font-semibold dark:text-gray-300 text-sm leading-tight">
            Industry: {{ project.productSite }}
        </p>
        <ul class="mb-1 text-gray-500 dark:text-gray-400 text-xs list-disc leading-snug">
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
    width: 45px;
    height: 45px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
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
        width: 40px;
        height: 40px;
        border-radius: 5px;

    }

    .project-card .tech-logo {
        width: 24px !important;
        /* height: 18px; */
        min-width: 15px !important;
        min-height: 15px !important;
        /* max-width: 24px; */
        max-height: 10px !important;
        background: #ffffff !important;
        background-color: #ffffff !important;
        border-radius: 4px !important;
        box-shadow: 0 2px 8px 0 rgba(60, 60, 60, 0.07) !important;
        border: 1px solid #e6e6e6 !important;
    }
}

html {
    scroll-behavior: smooth;
}

.project-card .tech-logo {
    width: 34px !important;
    /* height: 18px; */
    min-width: 15px !important;
    min-height: 15px !important;
    /* max-width: 24px; */
    max-height: 20px !important;
    -o-object-fit: contain;
    object-fit: contain;
    background: #ffffff !important;
    background-color: #ffffff !important;
    border-radius: 4px !important;
    box-shadow: 0 2px 8px 0 rgba(60, 60, 60, 0.07) !important;
    border: 1px solid #e6e6e6 !important;
    display: inline-block;
    transition: transform 0.18s cubic-bezier(.32, 2, .55, .27), box-shadow 0.18s;
    vertical-align: middle;
    /* For better logo visibility */
    padding: 1px !important;
}

.project-card .tech-logo:hover {
    transform: scale(1.03);
    box-shadow: 0 4px 16px 0 rgba(60, 60, 60, 0.17);
    z-index: 2;
    border-color: #38bdf8;
    background: #ffffff !important;
    background-color: #ffffff !important;
}

/* Force white background for tech logos - highest specificity */
.project-card img.tech-logo {
    background: #ffffff !important;
    background-color: #ffffff !important;
}

.project-card img.tech-logo:hover {
    background: #ffffff !important;
    background-color: #ffffff !important;
}
</style>
