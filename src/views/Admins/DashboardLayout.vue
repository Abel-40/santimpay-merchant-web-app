<script setup lang="ts">
import Sidebar from '@/components/Santimpay components/sections/SubSections/Sidebar.vue'
import Analysis from '@/components/Santimpay components/sections/Analysis.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import LandingPage from '@/components/Santimpay components/sections/LandingPage.vue'
import PinedTransactions from '@/components/Santimpay components/sections/PinedTransactions.vue'
import modalComposables from '@/composables/IntiatePaymentComposable'
import modalComposablesforTrans from '@/composables/pinTrans'
import IntiatePaymentModal from '@/components/Santimpay components/Modals/IntiatePaymentModal.vue'
import pinnedTransModal from '@/components/Santimpay components/Modals/pinnedTransModal.vue'
import Transactions from '@/components/Santimpay components/sections/Transactions.vue'
import { usePinnedStore } from '@/stores/usePinnedStore'
import TransactionDetial from '@/components/Santimpay components/sections/TransactionDetial.vue'
const { isOpen } = modalComposables()
const { isModalOpen, whenClose } = modalComposablesforTrans()
const route = useRoute()
// DashboardLayout.vue
const pinnedStore = usePinnedStore()
const handleSubmitNote = (note: string) => {
  pinnedStore.addNoteAndPin(note)
  whenClose()
}

const handleCancel = () => {
  pinnedStore.addNoteAndPin('')
  whenClose()
}
const showSection = computed(() => {
  const section = route.query.section
  if (section === 'landing') return LandingPage
  if (section === 'analysis') return Analysis
  if (section === 'pinned-transactions') return PinedTransactions
  if (section === 'transactions') return Transactions
  if (section === 'transaction-detail') return TransactionDetial
  return null
})
</script>
<template>
  <div class="relative w-full min-h-screen bg-[#F4F9FD]">
    <div class="flex flex-col md:flex-row pl-4 pt-3 ml-64">
      <pinnedTransModal v-if="isModalOpen" @submit="handleSubmitNote" />
      <IntiatePaymentModal v-if="isOpen" />
      <Sidebar class="w-64 fixed left-5 top-3 h-full z-50" />
      <component :is="showSection" v-if="showSection" />

      <router-view v-else />
    </div>
  </div>
</template>
