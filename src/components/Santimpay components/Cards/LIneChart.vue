<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { useTransactionStore } from '@/stores/useTransactionStore';
import {computed} from 'vue'
const store = useTransactionStore()

const transactionDateAmount = computed(() => {
  const map = new Map()

  store.fullTransactions.forEach((transaction) => {
    if (transaction.status === 'SUCCESSFULL') {
      const date = transaction.dateAndTime.split('T')[0]

      if (!map.has(date)) {
        map.set(date, transaction.amount)
      } else {
        map.set(date, map.get(date)! + transaction.amount) // sum if needed
      }
    }
  })

  return map
})

const result = computed(() =>
  Array.from(transactionDateAmount.value, ([date, amount]) => ({ date, amount }))
)

</script>


<template>
  <div class="relative w-full  p-3 shadow-xl rounded-xl">
    <div class="absolute inset-0 opacity-20 pointer-events-none">
        <div class="absolute top-0 right-8 w-40 h-40 bg-[#eab308] rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-8 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
    </div>
    <div class="flex justify-center">
      <h2 class="text-xl font-semibold">Daily Sales</h2>
    </div>
    <LineChart
    class="max-h-[300px]"
    :colors="['yellow', 'pink', 'green', 'red']"
    :data="result"
    index="date"
    :categories="['amount']"
    :y-formatter="(tick) =>
      typeof tick === 'number'
        ? `₿ ${tick.toLocaleString('en-US')}`
        : ''
    "
  />
  </div>

</template>
