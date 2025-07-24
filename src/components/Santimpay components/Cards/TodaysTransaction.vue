<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { ChevronRight } from 'lucide-vue-next';
</script>


<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center  bg-[#F4F9FD] rounded-2xl shadow-xl overflow-hidden relative border border-gray-200  p-5">
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-xl"></div>
      <div class="absolute bottom-0 left-0 w-40 h-40 bg-purple-400 rounded-full blur-xl"></div>
    </div>
    
    <div class="flex flex-col items-center">
      <p class="text-gray-500">Total Income (Today)</p>
      
      <p class="text-3xl font-bold ">$5,000</p>
      
    </div>
    <Button variant="link" class="text-sm p-0 text-blue-500 cursor-pointer"> View More<ChevronRight/> </Button>

     
  </div>

</template>