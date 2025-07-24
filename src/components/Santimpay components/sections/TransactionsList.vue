<script setup lang="ts">
import TransactionCard from '@/components/Santimpay components/Cards/TransactionCard.vue'
import type { TransactionType } from '@/types/Types'
import Button from '@/components/ui/button/Button.vue'
import { ChevronRight } from 'lucide-vue-next'
import { useTransactionStore } from '@/stores/useTransactionStore'
import type { Store } from 'pinia'
import {ref,computed} from "vue"

const store = useTransactionStore()
const fullTransactions: TransactionType[]=store.fullTransactions
const maxItems = 4;
const transactions = computed(() => fullTransactions.slice(-maxItems));
// 📊 Balance
</script>

<template>
  <div class="w-full flex flex-col space-y-3 py-8 px-9">
    <div class="flex justify-between items-center mb-3">
      <h2 class="font-semibold text-lg">Recent Transactions</h2>
      <Button as="a" variant="link" class="text-sm p-0">
        <RouterLink :to="{ name: 'merchant-dashboard', query: { section: 'transactions' } }"
          >View all
        </RouterLink>
        <ChevronRight class="w-4 h-4" />
      </Button>
    </div>
    <div class="w-full flex gap-5 border-y py-2">
      <div class="w-8">
        <p class="text-xs pl-3">PIN</p>
      </div>
      <div class="w-full grid grid-cols-7 gap-2">
        <p class="text-xs">TRANSACTIONID</p>
        <p class="text-xs">AMOUNT</p>
        <p class="text-xs">STATUS</p>
        <p class="text-xs">DATE</p>
        <p class="text-xs">SENDER</p>
        <p class="text-xs">RECIEVER</p>
        <p class="text-xs">PAYMENT TYPE</p>
      </div>
    </div>
    <TransactionCard v-for="eachTransaction in transactions.reverse()" :transaction="eachTransaction" />
  </div>
</template>



