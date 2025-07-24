<script setup lang="ts">
import LineChart from '@/components/Santimpay components/Cards/LIneChart.vue'
import pieChart from '@/components/Santimpay components/Cards/pieChart.vue';
import Header from '@/components/Santimpay components/sections/SubSections/Header.vue';
import Button from '@/components/ui/button/Button.vue';
import type { TransactionType } from '@/types/Types'
import {useTransactionStore} from "@/stores/useTransactionStore"
import { computed, ref } from 'vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select/'
import { useToast } from '@/components/ui/toast/use-toast'

//report download
const store = useTransactionStore()
const {toast} = useToast()
const dateVaration = ref<'This-Month'|'This-Week'|'This-Year'|'Todays'>('Todays')
const error = ref('')
const filteredReportTransaction = computed(() => {
  const fullTransactions = store.fullTransactions
  const date = new Date()
  error.value = '' // clear previous error

  const result = fullTransactions.filter((t) => {
    const transactionDate = new Date(t.dateAndTime)

    if (dateVaration.value === 'Todays') {
      return date.toDateString() === transactionDate.toDateString()
    }

    if (dateVaration.value === 'This-Week') {
      const startOfWeek = new Date(date)
      startOfWeek.setDate(date.getDate() - date.getDay()) // Sunday

      const endOfWeek = new Date(startOfWeek)
      endOfWeek.setDate(startOfWeek.getDate() + 6)

      return transactionDate >= startOfWeek && transactionDate <= endOfWeek
    }

    if (dateVaration.value === 'This-Month') {
      return (
        date.getFullYear() === transactionDate.getFullYear() &&
        date.getMonth() === transactionDate.getMonth()
      )
    }

    if (dateVaration.value === 'This-Year') {
      return date.getFullYear() === transactionDate.getFullYear()
    }

    return false
  })

  if (result.length === 0) {
    error.value = 'There is no report for the date variation you chose'
    toast({
      title: 'sorry!!!.',
      description: error.value,
      variant: 'destructive',
    })
  }

  return result
})

function converToCsv(data:TransactionType[]){
  const headers = Object.keys(data[0])
  const row = data.map(trans=>headers.map(header=>`"${trans[header as keyof TransactionType]}"`).join(','))
  return [headers.join(','),...row].join('\n')
}

function downloadCsv(fileName:string,csv:any){
  const blob = new Blob([csv],{type:'text/csv:charset=utf-8;'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download',fileName);
  link.click();
}

function exportCsv(){
  if([...filteredReportTransaction.value].length>0){
    downloadCsv(`${dateVaration.value}-report.csv`,converToCsv([...filteredReportTransaction.value]))
  }
}

// 📊 Balance
const balance = computed(() => {
  return store.fullTransactions.reduce((acc, curr) => {
    return curr.status === 'SUCCESSFULL' ? acc + curr.amount : acc
  }, 0)
})

//todays total transaction
const today = new Date().toISOString().split('T')[0]; // e.g., "2025-04-30"

const todayTransactionAmount = computed(() => {
  return store.fullTransactions.reduce((acc, cur) => {
    const transactionDate = cur.dateAndTime.split('T')[0];
    if (transactionDate === today && cur.status === 'SUCCESSFULL') {
      return acc + cur.amount;
    }
    return acc;
  }, 0);
});

// todays failed transaction
const totalFailedTransaction = computed(()=>{
  return store.fullTransactions.reduce((acc,cur)=>{
    return cur.status === 'FAILED'? acc + cur.amount: acc
  },0)
})


const formattedTotalBalance = computed(() =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
  }).format(balance.value)
)
const formattedTodaysBalance = computed(()=>
new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
  }).format(todayTransactionAmount.value)
)

const formattedFailedAmount = computed(()=>
new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
  }).format(totalFailedTransaction.value)
)
// 📅 Ethiopian Date + Time
const ethiopiaDate = computed(() =>
  new Intl.DateTimeFormat('en-ET', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Africa/Addis_Ababa',
  }).format(new Date())
)
</script>


<template>
  <div class="w-full flex flex-col mx-8 ">
    <div class="mb-8 pr-4">
      <Header/>
    </div>
        <!--report download and balance card -->
        <div class="w-full flex flex-col">
                              <!--report download -->
          <div class="w-full flex justify-end gap-2 items-center pr-4">
            <div class="flex gap-2">
              <Select v-model="dateVaration">
                <SelectTrigger class="bg-[#d1d1d1] w-30 h-5 text-xs hover:bg-[#eab308]/50 text-black">
                  <SelectValue placeholder="This months" class="text-black font-semibold"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel class="">sort</SelectLabel>
                    <SelectItem value="Todays" class="border-y">
                      Todays
                    </SelectItem>
                    <SelectItem value="This-week" class="border-b">
                      This Week
                    </SelectItem>
                    <SelectItem value="This-Month" class="border-b">
                      This Month
                    </SelectItem>
                    <SelectItem value="This-Year" class="border-b">
                      This Year
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button class="bg-[#eab308] transition-all scale-100 duration-100 active:scale-105 hover:bg-[#eab308]/50" @click="exportCsv">Download Report</Button>
            </div>
          </div>
           <!-- balance card -->
           <div class="w-full  grid grid-cols-3 justify-items-center gap-24 mb-4 pt-3 pb-8">
            <div class="relative w-full border flex flex-col gap-2 p-3 rounded-xl shadow-xl transition-all scale-100 duration-200 hover:scale-105">
              <div class="absolute inset-0 pointer-events-none opacity-20">
                <div class="absolute top-2 right-3 w-12 h-12 bg-[#eab308] blur-md"></div>
                <div class="absolute bottom-2 left-3 w-12 h-12 bg-purple-400 blur-md"></div>
              </div>
              <P class="text-md">Balance</P>
              <P class="text-xl font-semibold" >{{ formattedTotalBalance }}</P>
              <p class="text-xs text-gray-500">{{ ethiopiaDate}}</p>
            </div>

            <div class="relative w-full  border flex flex-col gap-2 p-3 rounded-xl shadow-xl transition-all scale-100 duration-200 hover:scale-105 ">
              <div class="absolute inset-0 pointer-events-none opacity-20">
                <div class="absolute top-2 right-3 w-12 h-12 bg-[#eab308] blur-md"></div>
                <div class="absolute bottom-2 left-3 w-12 h-12 bg-purple-400 blur-md"></div>
              </div>
              <P class="text-md">Todays Total Transaction</P>
              <P class="text-xl font-semibold" >{{ formattedTodaysBalance }}</P>
              <p class="text-xs text-gray-500">{{ ethiopiaDate}}</p>
            </div>

            <div class="relative w-full border flex flex-col gap-2 p-3 rounded-xl shadow-xl transition-all scale-100 duration-200 hover:scale-105">
              <div class="absolute inset-0 pointer-events-none opacity-20">
                <div class="absolute top-2 right-3 w-12 h-12 bg-[#eab308] blur-md"></div>
                <div class="absolute bottom-2 left-3 w-12 h-12 bg-purple-400 blur-md"></div>
              </div>
              <P class="text-md">Failed Transaction</P>
              <P class="text-xl font-semibold" >{{ formattedFailedAmount }}</P>
              <p class="text-xs text-gray-500">{{ ethiopiaDate}}</p>
            </div>

          </div>
        </div>
    <div class="w-full grid grid-cols-2 ">
      <div class="mr-4 border-[#e2e2e2] border-[1px] rounded-xl">
        <LineChart class=""/>
      </div>
      <div class="mr-4 border-[#e2e2e2] border-[1px] rounded-xl">
        <pieChart/>
      </div>
    </div>
  </div>





</template>
