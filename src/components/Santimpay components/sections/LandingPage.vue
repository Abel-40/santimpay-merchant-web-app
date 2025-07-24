<script setup lang="ts">
import BalanceCard from '../Cards/BalanceCard.vue'
import MiniData from '../Cards/MiniData.vue'
import TransactionsList from './TransactionsList.vue'
import TimerCard from '../Cards/TimerCard.vue'
import InitiatePaymentCard from '../Cards/InitiatePaymentCard.vue'
import Header from './SubSections/Header.vue'
import TodaysTransaction from '../Cards/TodaysTransaction.vue'
</script>

<template>
  <div class="w-full space-y-4 py-2 px-2 md:px-4">
    <Header class="mb-5" />

    <!-- Top Section -->
    <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:space-x-5">
      <!-- Balance and Mini Data Section -->
      <div
        class="w-full lg:w-[70%] space-y-4 lg:space-y-0 lg:flex lg:justify-between lg:gap-5 lg:px-5"
      >
        <div class="w-full lg:w-1/2">
          <BalanceCard />
        </div>
        <div class="w-full lg:w-1/2">
          <MiniData />
        </div>
      </div>

      <!-- Initiate Payment Section -->
      <div class="w-full mt-4 lg:mt-0 lg:w-[25%]">
        <InitiatePaymentCard />
      </div>
    </div>

    <!-- Bottom Section -->
    <div class="w-full flex flex-col lg:flex-row lg:justify-between lg:space-x-5 mt-4">
      <!-- Transactions List Section -->
      <div class="w-full lg:w-[75%] mb-4 lg:mb-0">
        <TransactionsList />
      </div>

      <!-- Timer Card Section -->
      <div class="w-full lg:w-[25%]">
        <TimerCard />
      </div>
    </div>
  </div>
</template>
