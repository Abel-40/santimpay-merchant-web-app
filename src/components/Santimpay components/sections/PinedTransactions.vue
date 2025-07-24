<script setup lang="ts">
import { usePinnedStore } from '@/stores/usePinnedStore'
import TransactionCard from '../Cards/TransactionCard.vue'
import Header from './SubSections/Header.vue'
import { HandCoins } from 'lucide-vue-next'
import Button from '@/components/ui/button/Button.vue'
import modalComposableForPayment from '@/composables/IntiatePaymentComposable'
const {onOpen} = modalComposableForPayment()
const pinnedStore = usePinnedStore()

</script>

<template>
<!--header +  Pinned Transaction aside Notes  + Transactions -->
  <div class="w-full flex-col p-4">
    <div class="mb-6 pl-2">
      <!-- to header -->
      <Header />
      <!-- lower header -->
      <!-- Page Title -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 pt-5">
        <div>
          <h1 class="text-xl font-bold">Pinned Transactions</h1>
        </div>
        <div class="flex items-center gap-2 px-2 py-2 ">
          <Button class="w-full h-[40px] bg-[#eab308] transition-all duration-100 hover:scale-105 hover:bg-[#eab308]/80 text-xs" @click="onOpen">
            <HandCoins class="w-4 h-4" /> INITIATE PAYMENT
          </Button>
        </div>
      </div>
    </div>
    <!-- pinned Transaction + notes -->
    <div>
      <div  class="flex items-center gap-4 border-y">
        <div class="w-full max-w-[932px] flex justify-center items-center gap-5  py-4 px-4">
            <div class="">
              <p class="text-xs ">UNPIN</p>
            </div>
            <div class="w-full grid grid-cols-7 gap-2 items-center">
              <p class="text-xs">TRANSACTIONID</p>
              <p class="text-xs">AMOUNT</p>
              <p class="text-xs">STATUS</p>
              <p class="text-xs">DATE & TIME</p>
              <p class="text-xs">SENDER</p>
              <p class="text-xs">RECIEVER</p>
              <p class="text-xs">PAYMENT TYPE</p>
            </div>
        </div>

        <div class="w-[20%] pr-4 flex justify-center">
          <p class="text-xs"> NOTE</p>
        </div>
      </div>

      <div v-for="pinnedTransaction in pinnedStore.pinnedTransactions" class="flex items-center gap-4">
        <!--pinned transaction Card -->
        <div class="w-full max-w-[932px] flex flex-col space-y-3 py-4 px-3">
          <TransactionCard :transaction="pinnedTransaction.trans" class="h-full"/>
        </div>


        <!-- line -->
        <div  v-if="pinnedTransaction.note" class="w-8 h-0 border-[2px] border-black"></div>


        <!-- Pinned Transaction note -->
        <div  class="w-full max-w-[20%] h-full  p-1">
          <div v-if="pinnedTransaction.note" class="rounded-xl shadow-xl overflow-hidden relative border border-gray-200  p-2">
            <!-- Blurred background decoration -->
            <div class="w-full h-full absolute inset-0 opacity-20 pointer-events-none">
              <div class="absolute top-0 right-0 w-16 h-16 bg-[#eab308] rounded-full blur-xl"></div>
              <div class="absolute bottom-0 left-0 w-16 h-16 bg-purple-400 rounded-full blur-xl"></div>
            </div>


            <div class="w-full min-h-[53px]">
              <p>{{ pinnedTransaction.note }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </div>
</template>
