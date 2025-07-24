<script setup lang="ts">
import Header from './SubSections/Header.vue';
import Button from '@/components/ui/button/Button.vue';
import { Input } from '@/components/ui/input';
import TransactionCard from '../Cards/TransactionCard.vue';
import type { TransactionType } from '@/types/Types'
import {ChevronDown,ListFilter, ArrowUpDown,ArrowLeft,ArrowRight } from 'lucide-vue-next';
import {useTransactionStore} from "@/stores/useTransactionStore"
import FilterComposables from '@/composables/FilterComposables';
import FilterComponent from '@/components/ui/FilterComponent.vue';
import DateRangePicker from '@/components/ui/DateRangePicker/DateRangePicker.vue';
import { useFilterStore } from '@/stores/useFilterStore';
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
import { HandCoins } from 'lucide-vue-next'
import modalComposableForPayment from '@/composables/IntiatePaymentComposable'


// Composables and stores
const { onOpen } = modalComposableForPayment()
const { toast } = useToast()
const store = useTransactionStore()
const filterStore = useFilterStore()
const { onFilterOpen, isFilterOpen } = FilterComposables()

// Reactive Filters
const status = ref<'SUCCESSFULL' | 'FAILED' | 'all' | null>(null)
const amount = ref(0)
const selectedRange = ref<{ start: string; end: string } | null>(null)

function handleRange(range: { start: string; end: string }) {
  selectedRange.value = range
}

// 🔁 Reactive Filtered Transactions
const filteredTransaction = computed(() => {
  const transactions = store.fullTransactions

  if (
    !filterStore.filterOptions.date &&
    !filterStore.filterOptions.amount &&
    !filterStore.filterOptions.status
  ) {
    return transactions
  }

  return transactions.filter((t) => {
    const date = t.dateAndTime.split('T')[0]

    const matchesAmount = !amount.value || t.amount >= amount.value
    const matchesStatus =
      !status.value || status.value === 'all' || t.status === status.value
    const matchesDateRange =
      !selectedRange.value ||
      (selectedRange.value.start <= date && date <= selectedRange.value.end)

    return matchesAmount && matchesStatus && matchesDateRange
  })
})

// 🔽 Sorting
const sortType = ref<'maxAmount' | 'minAmount' | 'dateofTrans'>('dateofTrans')

const sortedTransaction = computed(() => {
  return [...filteredTransaction.value].sort((a, b) => {
    if (sortType.value === 'maxAmount') return b.amount - a.amount
    if (sortType.value === 'minAmount') return a.amount - b.amount
    if (sortType.value === 'dateofTrans') {
      return new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime()
    }
    return 0
  })
})

// 📄 Pagination
const currentPage = ref(1)
const itemPerPage = ref(10)

const totalPage = computed(() =>
  Math.ceil(sortedTransaction.value.length / itemPerPage.value)
)

const paginatedTransaction = computed(() => {
  const start = (currentPage.value - 1) * itemPerPage.value
  const end = start + itemPerPage.value
  return sortedTransaction.value.slice(start, end)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPage.value) {
    currentPage.value = page
  }
}

const goToNext = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++
  }
}

const goToPrevious = () => {
  if (currentPage.value > 1) {
    currentPage.value--
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
  <FilterComponent v-if="isFilterOpen"/>
  <!-- main -->
  <div class="w-full  px-4 pt-2 mx-4">
    <!-- header + balance card + Transactions -->
    <div class="flex flex-col space-y-2">
      <!-- header -->
      <div class="w-full flex justify-between items-center ">
        <h1 class="text-xl font-bold">Pinned Transactions</h1>
            <!-- User Controls -->
        <div class="flex flex-col items-end gap-3">
          <div class="flex items-center gap-2 bg-white px-2 py-3 rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-all duration-300">
            <p class="text-sm whitespace-nowrap tracking-tighter">Merchant Id:  965523</p>
            <ChevronDown class="w-4 h-4"/>
          </div>
        </div>
      </div>

          <!-- balance card and Initiate Payment + Transactions  -->
          <div class="w-full flex flex-col items-center">
            <!--Initiate Payment and balance card -->
            <div class="w-full flex flex-col pb-6">
              <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pt-5">
            <div>
              
            </div>
            <div class="flex items-center gap-2 px-2">
              <Button class="w-full h-[40px] bg-[#eab308] transition-all duration-100 hover:scale-105 hover:bg-[#eab308]/80 text-xs" @click="onOpen">
                <HandCoins class="w-4 h-4" /> INITIATE PAYMENT
              </Button>
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

          <!-- Transactions -->
           <div class=" px-4 pt-6 bg-[#eef6fb] border rounded-xl h-auto">
            <!-- search and filter -->
              <div class="flex justify-between gap-4 items-center px-9">
                <div class="flex gap-2 items-center">
                  <div class="flex gap-1">
                  <Input type="search" placeholder="search transaction"/>
                  <Button class="bg-[#eab308] transition-all scale-100 duration-100 active:scale-105 hover:bg-[#eab308]/50">Search</Button>
                </div>
                  <div class="">
                    <div class="">
                      <Select v-model="sortType">
                        <SelectTrigger class="border gap-1"><ArrowUpDown :size="12"/>
                          <SelectValue placeholder="sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel class="">sort</SelectLabel>
                            <SelectItem value="maxAmount" class="border-y">
                              by max amount
                            </SelectItem>
                            <SelectItem value="minAmount" class="border-b">
                              by min amount
                            </SelectItem>
                            <SelectItem value="dateofTrans" class="border-b">
                              created date
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                </div>

                <div class="flex gap-1 items-center">
                  <div class="flex gap-2">
                    <div class="" v-if="filterStore.filterOptions.status">
                      <Select v-model="status">
                        <SelectTrigger class="border">
                          <SelectValue placeholder="select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel class="">status</SelectLabel>
                            <SelectItem value="all">
                              All
                            </SelectItem>
                            <SelectItem value="FAILED">
                              Failed
                            </SelectItem>
                            <SelectItem value="SUCCESSFULL">
                              Sucessfull
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <div class="" v-if="filterStore.filterOptions.amount">
                      <Input type="number" placeholder="amount" :min="0" v-model="amount" class="border border-[#eab308] focus-visible:ring-0"/>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <div class="" v-if="filterStore.filterOptions.date">
                      <DateRangePicker @update:range="handleRange" />
                    </div>
                  </div>
                  <div class="flex">
                    <Button class="bg-[#d1d1d1] h-5 text-xs text-black hover:bg-[#eab308]/50" @click="onFilterOpen">
                      <ListFilter/>
                    </Button>
                  </div>
                </div>


              </div>


                <div class="w-full flex flex-col space-y-3 py-8 px-9">
                  <div class="w-full flex gap-5 border-y p-3">
                    <div class="w-8">
                      <p class="text-xs pl-3">PIN</p>
                    </div>
                    <div class="w-full grid grid-cols-7 gap-2">
                      <p class="text-xs">TRANSACTIONID</p>
                      <p class="text-xs">AMOUNT</p>
                      <p class="text-xs pl-4">STATUS</p>
                      <p class="text-xs">DATE</p>
                      <p class="text-xs">SENDER</p>
                      <p class="text-xs">RECIEVER</p>
                      <p class="text-xs">PAYMENT TYPE</p>
                    </div>
                  </div>
                  <TransactionCard v-for="eachTransaction in paginatedTransaction" :transaction="eachTransaction" />

                  <div class="w-full flex justify-center items-center gap-2">

                    <Button variant="link" @click="goToPrevious" :disabled="currentPage === 1">
                      <ArrowLeft />
                    </Button>
                      <div v-for="(item, index) in totalPage" :key="index" >
                        <div class="w-2 h-2 border rounded-full" :class="currentPage===index+1?'bg-black':''"></div>
                      </div>
                      <Button variant="link" @click="goToNext" :disabled="currentPage === totalPage" class="">
                        <ArrowRight />
                      </Button>
                  </div>
                </div>

           </div>
        </div>
      </div>
    </div>
  </div>
  
</template>