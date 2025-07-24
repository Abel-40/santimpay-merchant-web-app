<!-- - Total Received: e.g. $184,500.00
- Pending Transactions: e.g. 15
- Failed Payments: e.g. 6
- Refunded Amounts: e.g. $2,300.00
- Optional: Daily/Monthly Revenue -->

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { ChevronRight } from 'lucide-vue-next'
</script>

<template>
  <div
    class="w-full h-full min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] flex flex-col items-center justify-center bg-[#F4F9FD] rounded-2xl shadow-xl overflow-hidden relative border border-gray-200"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div
        class="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-[#eab308] rounded-full blur-xl"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-purple-400 rounded-full blur-xl"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative space-y-2 sm:space-y-3 p-4 sm:p-6">
      <div class="flex items-center gap-1 text-left">
        <p class="text-xs sm:text-sm text-gray-500">Pending Transactions:</p>
        <p class="text-xs sm:text-sm font-medium">15</p>
      </div>
      <div class="flex items-center gap-1">
        <p class="text-xs sm:text-sm text-gray-500">Failed Payments:</p>
        <p class="text-xs sm:text-sm font-medium">6</p>
      </div>
      <div class="flex items-center gap-1">
        <p class="text-xs sm:text-sm text-gray-500">Refunded Amounts:</p>
        <p class="text-xs sm:text-sm font-medium">$2000</p>
      </div>
      <Button
        variant="link"
        class="text-xs sm:text-sm p-0 text-blue-500 cursor-pointer flex items-center gap-1"
      >
        View all
        <ChevronRight class="w-4 h-4" />
      </Button>
    </div>
  </div>
</template>
