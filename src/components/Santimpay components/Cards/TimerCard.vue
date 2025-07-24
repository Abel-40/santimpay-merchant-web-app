<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

const secondsElapsed = ref(0)
let intervalId: any = null

const formattedTime = computed(() => {
  const hours = Math.floor(secondsElapsed.value / 3600)
  const minutes = Math.floor((secondsElapsed.value % 3600) / 60)
  const seconds = secondsElapsed.value % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

onMounted(() => {
  intervalId = setInterval(() => {
    secondsElapsed.value += 1
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div
    class="w-full flex flex-col items-center justify-center min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] rounded-2xl shadow-xl overflow-hidden relative border border-gray-200 p-3 sm:p-4"
  >
    <!-- Blurred background decoration -->
    <div class="w-full h-full absolute inset-0 opacity-20">
      <div
        class="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#eab308] rounded-full blur-xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-purple-400 rounded-full blur-xl"
      ></div>
    </div>

    <!-- Timer Display -->
    <div class="text-left w-full flex flex-col items-center space-y-2 sm:space-y-3">
      <p class="text-xs sm:text-sm text-gray-500">Estimated Time:</p>
      <p class="font-mono text-base sm:text-lg lg:text-xl">{{ formattedTime }}</p>
    </div>

    <!-- Exchange Display -->
    <div class="text-left w-full mt-3 sm:mt-4 flex flex-col items-center space-y-1 sm:space-y-2">
      <p class="text-xs sm:text-sm text-gray-500">Exchange:</p>
      <p class="font-mono text-sm sm:text-base lg:text-lg">0.00 BIRR</p>
    </div>
  </div>
</template>
