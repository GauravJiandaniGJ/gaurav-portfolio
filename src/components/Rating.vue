<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import Chart from 'chart.js/auto'

const labelsFull = [
  'Backend',
  'Frontend',
  'Database',
  'Documentation',
  'Testing',
  'Devops'
]
const labelsShort = [
  'BE',
  'FE',
  'DB',
  'Docs',
  'Test',
  'Devops'
]
const value = [1000, 980, 760, 500, 720, 910]

const chartRef = ref(null)
let chartInstance = null

function getLabels() {
  return window.innerWidth <= 600 ? labelsShort : labelsFull
}
function getTickFontSize() {
  return window.innerWidth <= 600 ? 10 : 13
}
function getTickRotation() {
  return window.innerWidth <= 600 ? 20 : 0
}

function renderChart() {
  if (chartInstance) chartInstance.destroy()
  chartInstance = new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels: getLabels(),
      datasets: [{
        label: 'Skills',
        data: value,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.10)',
        borderWidth: 2,
        tension: 0.36,
        pointRadius: 5.5,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#3b82f6',
        pointBorderWidth: 2,
        pointHoverRadius: 9,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#3b82f6',
        fill: true,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 1200, easing: 'easeOutQuint' },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: '#23262a',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#3b82f6',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y}`
          }
        }
      },
      layout: { padding: { left: 8, right: 8, top: 10, bottom: 10 } },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: '#64748b',
            font: ctx => ({
              size: getTickFontSize(),
              weight: 500,
              family: 'Inter, Arial, sans-serif'
            }),
            autoSkip: false,
            maxRotation: getTickRotation(),
            minRotation: getTickRotation(),
            padding: 6,
          }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(100,116,139,0.15)' },
          ticks: {
            display: false,
            color: '#64748b',
            font: { size: 12, weight: 500, family: 'Inter, Arial, sans-serif' },
            callback: v => v.toLocaleString(),
            padding: 5,
            stepSize: 200,
          },
          min: 0,
          max: 1100
        }
      }
    }
  })
}

onMounted(async () => {
  await nextTick()
  if (chartRef.value) {
    renderChart()
    window.addEventListener('resize', renderChart)
  }
})
onUnmounted(() => {
  if (chartInstance) chartInstance.destroy()
  window.removeEventListener('resize', renderChart)
})
</script>

<template>
  <div
    class="group mx-auto w-full max-w-3xl bg-gray-200 dark:bg-[#2d2d2d] rounded-lg shadow-xl relative transition-all duration-400 overflow-hidden hover:-translate-y-1 hover:scale-[1.01] hover:shadow-blue-500/20"
    style="backdrop-filter: blur(2.5px);"
  >
    <!-- Chart section -->
    <div class="flex justify-center mx-5 pt-5 pb-5 animate-fade-in">
      <div
        class="chart-spot relative z-20 bg-gray-50 mb-5 dark:bg-[#292929] rounded-lg px-1 py-1 shadow-md"
        style="height:180px; max-width:100vw; width:90%;"
      >
        <canvas ref="chartRef" style="width:100% !important; height:100% !important;"></canvas>
      </div>
    </div>
    <!-- Skills Content -->
    <div class="px-3 sm:px-6 pt-1 pb-5">
      <div class="text-lg sm:text-xl font-bold mb-2 text-blue-700 dark:text-blue-300 tracking-tight transition-colors">
        Skills
      </div>
      <div class="mt-1 text-[14px] sm:text-[15px] font-normal text-gray-600 dark:text-gray-300">
        <span class="font-medium">Favourable Programming frameworks:</span>
        <span class="font-semibold text-gray-900 dark:text-white"> Laravel, VueJs, DJango, React, NodeJs, Rasa, Selenium, Zend</span>
      </div>
      <div class="mt-1 text-[14px] sm:text-[15px] font-normal text-gray-600 dark:text-gray-300">
        <span class="font-medium">Cloud and Devops:</span>
        <span class="font-semibold text-gray-900 dark:text-white"> AWS: EC2, S3, EBS, Cloudwatch, RDS, Lambda, Connect</span>
      </div>
      <div class="mt-1 text-[14px] sm:text-[15px] font-normal text-gray-600 dark:text-gray-300">
        <span class="font-medium">Database:</span>
        <span class="font-semibold text-gray-900 dark:text-white"> MySQL and MongoDB</span>
      </div>
      <hr class="my-3 border-gray-200 dark:border-gray-700" />
      <span class="block text-xs sm:text-sm text-gray-700 dark:text-gray-200 font-medium">
        I have the ability to build enterprise-level applications by applying my broad range of acquired knowledge, enabling me to architect scalable systems using solid design patterns and OOP principles.
      </span>
    </div>
    <!-- Glow hover -->
    <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-45 transition-all duration-700 blur-2xl w-[85%] h-[46%] rounded-full z-0 bg-blue-400/10"></span>
  </div>
</template>

<style scoped>
@media (max-width: 800px) {
  .chart-spot {
    min-width: 0 !important;
    max-width: 100vw !important;
    width: 100vw !important;
    height: 145px !important;
    padding: 0.13rem 0.08rem !important;
  }
}
@media (max-width: 500px) {
  .chart-spot {
    height: 120px !important;
  }
}

@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95) translateY(18px);}
  to { opacity: 1; transform: scale(1) translateY(0);}
}
.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(0.6, 1.5, 0.3, 1.05) both;
}

html {
  scroll-behavior: smooth;
}

</style>
