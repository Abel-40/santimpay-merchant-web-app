<script setup lang="ts">
import { ref, computed } from 'vue'
import { ReceiptText, ShieldCheck, Ban, Hourglass, Pin, PinOff, CircleX } from 'lucide-vue-next'
import type { TransactionType } from '@/types/Types'
import { usePinnedStore } from '@/stores/usePinnedStore'
import modalComposables from '@/composables/pinTrans'
import { useRouter } from 'vue-router'

const router = useRouter()
const { whenOpen, whenClose } = modalComposables()
const props = defineProps<{ transaction: TransactionType }>()


const goToDetails = () => {
  router.push({
    path: '/merchant-dashboard/',
    query: {
      section: 'transaction-detail',
      id: props.transaction.transactionId
    }
  })
}
const statusStyle = (status: string) => {
  switch (status) {
    case 'IN PROGRESS':
      return ' text-blue-600 bg-blue-200'
    case 'SUCCESSFULL':
      return ' text-green-600 bg-green-200'
    case 'FAILED':
      return ' text-red-600 bg-red-200'
    default:
      return ''
  }
}
const senderReciver = (status: string) => {
  switch (status) {
    case 'IN PROGRESS':
      return ' text-blue-600 bg-blue-200'
    case 'SUCCESSFULL':
      return ' text-green-600 bg-green-200'
    case 'FAILED':
      return ' text-red-600 bg-red-200'
    default:
      return ''
  }
}
const IconType = (status: string) => {
  switch (status) {
    case 'IN PROGRESS':
      return Hourglass
    case 'SUCCESSFULL':
      return ShieldCheck
    case 'FAILED':
      return CircleX
    default:
      return ''
  }
}

const pinnedStore = usePinnedStore()
const isPinned = computed(() => {
  if (!props.transaction) return false
  return pinnedStore.isPinned(props.transaction)
})

function togglePin() {
  if (isPinned.value) {
    pinnedStore.unpin(props.transaction.transactionId)
  } else {
    pinnedStore.setPendingTransaction(props.transaction)
    if (pinnedStore.pendingTransaction) {
      whenOpen()
    }
  }
}
</script>

<template>
  <div
    class="relative w-full p-5 bg-[#F4F9FD] rounded-xl border border-gray-200 shadow-l shadow-[#f8f4ee] cursor-pointer"
  >
    <!-- bg decorating -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
      <div
        class="absolute -top-6 -left-6 w-32 h-32 bg-yellow-400 opacity-20 blur-2xl rounded-full"
      ></div>
      <div
        class="absolute top-1/2 left-32 w-40 h-40 bg-yellow-300 opacity-10 blur-[100px] rounded-full"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 opacity-20 blur-2xl rounded-full"
      ></div>
    </div>

    <!-- Top Important Info -->
    <div class="flex gap-5 w-full items-center">
      <div @click="togglePin" class="w-8">
        <Pin v-if="isPinned" class="w-5 h-5 text-yellow-400" />
        <PinOff v-else class="w-5 h-5 text-gray-400" />
      </div>
      <div class="w-full grid grid-cols-7 gap-2 items-center" @click="goToDetails">
        <p class="text-xs font-semibold">{{ props.transaction.transactionId }}</p>
        <p class="text-xs font-semibold">{{ props.transaction.amount }}</p>
        <p
          class="text-xs font-semibold flex items-center gap-1 whitespace-nowrap tracking-tighter p-1 w-24 rounded-sm justify-center"
          :class="statusStyle(props.transaction.status)"
        >
          {{ props.transaction.status }}
          <component :is="IconType(props.transaction.status)" class="w-3 h-3" />
        </p>
        <p class="text-xs font-semibold">{{ props.transaction.dateAndTime.split('T')[0] }}</p>
        <p class="text-xs font-semibold text-blue-500">{{ props.transaction.sender }}</p>
        <p class="text-xs font-semibold text-yellow-500">{{ props.transaction.reciver }}</p>
        <p class="text-xs font-semibold">{{ props.transaction.paymentType }}</p>
      </div>
    </div>

   
  </div>
</template>
