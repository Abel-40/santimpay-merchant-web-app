<script setup lang="ts">
import { useTransactionStore } from '@/stores/useTransactionStore'
import {ref,computed} from "vue"

const store = useTransactionStore()
// 📊 Balance
const balance = computed(() => {
  return store.fullTransactions.reduce((acc, curr) => {
    return curr.status === 'SUCCESSFULL' ? acc + curr.amount : acc
  }, 0)
})
const formattedTotalBalance = computed(() =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
  }).format(balance.value)
)
const showBalance = ref(false);
function toggleBalance() {
  showBalance.value = !showBalance.value;
}

</script>
<template>
  <div
    class="w-full h-full min-h-[150px] sm:min-h-[180px] lg:min-h-[200px] bg-[#F4F9FD] rounded-2xl shadow-xl overflow-hidden relative border border-gray-200 transform transition-all cursor-pointer p-3"
    @click="toggleBalance"
  >
    <!-- Card background pattern -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-400 rounded-full blur-xl"></div>
      <div class="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-purple-400 rounded-full blur-xl"></div>
    </div>

    <!-- Card content -->
    <div class="relative h-full p-4 sm:p-6 flex flex-col justify-between">
      <!-- Card header -->
      <div class="flex justify-between items-start pb-2 sm:pb-3">
        <div class="w-[50px] sm:w-[60px] h-[40px] sm:h-[50px] rounded-xl flex flex-col items-center justify-center shadow-md p-2 sm:p-3">
          <p class="text-[10px] sm:text-xs font-bold text-Black">SANTIM</p>
          <p class="text-lg sm:text-xl font-extrabold text-yellow-300">PAY</p>
        </div>
        <div class="text-left flex items-center">
          <p class="text-[10px] sm:text-xs text-gray-500">Santim Pay</p>
        </div>
      </div>

      <!-- Card footer -->
      <div class="flex justify-between items-end">
        <div>
          <p class="text-[10px] sm:text-xs text-gray-500">Available Balance</p>
          <p class="text-base sm:text-lg font-bold text-gray-800 tracking-tight">
            {{ showBalance ? formattedTotalBalance : '••••••' }}
          </p>
        </div>
        <div>
          <p class="text-[10px] sm:text-sm text-gray-500 tracking-tighter">Merchant ID</p>
          <p class="text-sm sm:text-lg font-mono text-gray-800 font-medium">9••23</p>
        </div>
      </div>
    </div>

    <!-- Shine effect on hover -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 via-white/0 to-white/10 opacity-0 hover:opacity-100 transition-all duration-300 hover:translate-x-[20%]"></div>
    </div>
  </div>
</template>
