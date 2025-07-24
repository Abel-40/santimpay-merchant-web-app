<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { useTransactionStore } from '@/stores/useTransactionStore'
import { computed } from 'vue';
const store = useTransactionStore()
const transactions = store.fullTransactions
const monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                         const totalsMap = computed(() => {
  const map: Record<string, number> = {};

  store.fullTransactions.forEach(transaction => {
    if (transaction.status === 'SUCCESSFULL') {
      const date = new Date(transaction.dateAndTime);
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      const key = `${monthIndex}-${year}`;

      if (!map[key]) {
        map[key] = 0;
      }

      map[key] += transaction.amount;
    }
  });

  return map;
});



const amountPerMonth = computed(() => {
  return Object.entries(totalsMap.value).map(([key, totalAmount]) => {
    const [monthIndexStr, yearStr] = key.split("-");
    const monthIndex = parseInt(monthIndexStr);

    return {
      name: monthShortNames[monthIndex],
      total: Math.ceil(totalAmount)
    };
  });
});

const sortedAmountPerMonth = computed(() => {
  return [...amountPerMonth.value].sort((a, b) => b.total - a.total);
});

function valueFormatter(tick: number | Date) {
  return typeof tick === 'number'
    ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
    : ''
}
const colorsForEach = [
      'bg-[#f9fb7e]', 'bg-[#7abcbe]', 'bg-[#f7dae2]', 'bg-red-400',
      'bg-blue-400', 'orange', 'bg-purple-400', 'bg-green-400',
      'bg-cyan-400', 'bg-lime-400', 'bg-indigo-400', 'bg-brown-400'
    ]
console.log(amountPerMonth);

</script>

<template>
  <div class="w-full relative flex flex-col px-4 py-8 shadow-xl rounded-xl  max-h-[352px] h-full">
    <div class="absolute inset-0 opacity-20 pointer-events-none">
        <div class="absolute top-0 right-8 w-40 h-40 bg-[#eab308] rounded-full blur-2xl"></div>
        <div class="absolute bottom-0 left-8 w-40 h-40 bg-purple-400 rounded-full blur-2xl"></div>
    </div>
    <div class="flex justify-center">
      <h2 class="text-xl font-semibold">Total Amount Per Month</h2>
    </div>

    <div class="grid grid-cols-2 justify-items-center items-center ">
    

      <DonutChart
      class="w-[250px] h-[250px] opacity-50"
      :colors="[
        'yellow', 'teal', 'pink', 'red',
        'blue', 'orange', 'purple', 'green',
        'cyan', 'lime', 'indigo', 'brown'
        ]"
      index="name"
      :category="'total'"
      :data="sortedAmountPerMonth"
      :value-formatter="valueFormatter"/>

      <div  class="flex flex-col justify-center items-center space-y-6">
        <div v-for="(amountPerMonths,index) in sortedAmountPerMonth" :key="index">
          <div class="flex justify-between items-center gap-2">
            <div class="w-4 h-4 border rounded-full" :class="colorsForEach[index]"></div>
            <p>{{ amountPerMonths.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>