<script setup lang="ts">
import Header from './SubSections/Header.vue'
import { useTransactionStore } from '@/stores/useTransactionStore'
import { MoveLeft,ReceiptText, Banknote, DollarSign, ShieldCheck, Hourglass, CircleX } from 'lucide-vue-next'
import { useRoute,useRouter } from 'vue-router'
import ReceiptModal from '../Modals/ReceiptModal.vue'
import Button from '@/components/ui/button/Button.vue'
import ReceiptComposables from '@/composables/ReceiptComposables';
import {ref,computed,h} from "vue"
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'
const {whenOpen,isModalOpen} = ReceiptComposables()
const route = useRoute()
const router = useRouter()
const goBack = ()=>{
  router.back()
}

const store = useTransactionStore()
const transaction = computed(() => {
  return store.fullTransactions.find(t => t.transactionId === route.query.id)
})

const {
  transactionId,
  amount,
  status,
  dateAndTime,
  sender,
  reciver,
  paymentType,
  bankName,
  reason
} = transaction?.value || {}  

const importantTransInfo = {
  transactionId,
  amount,
  status,
  dateAndTime,
  sender,
  reciver,
  paymentType,
  bankName,
  reason,
}
const statusStyle = (status?: string) => {
  switch (status) {
    case 'IN PROGRESS':
      return ' text-blue-600 bg-blue-200'
    case 'SUCCESSFULL':
      return ' text-green-600 bg-green-100'
    case 'FAILED':
      return ' text-red-600 bg-red-200'
    default:
      return ''
  }
}
const senderReciver = (status?: string) => {
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

const IconType = (status?: string) => {
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

const {toast} = useToast()
const isReceiptAllowed = ()=>{
  if(transaction.value?.status==='FAILED'){
    toast({
      title: 'sorry!!!.',
      description:"you can't have recipet for failed transaction",
      variant: 'destructive',
    })
  }
  if(transaction.value?.status==='IN PROGRESS'){
    toast({
      title: 'please wait a minute!!!',
      description: 'please be patient your transaction is In Progress',
      action: h(
        ToastAction,
        {
          altText: 'refresh page',
          onClick: () => window.location.reload(),
        },
        {
          default: () => 'refresh page',
        }
      ),
    });

  }
  if(transaction.value?.status==='SUCCESSFULL'){
    whenOpen()
  }
  
}
</script>

<template>
  <!-- main container -->
  <div class="w-full p-4">
    <Header />
    <!-- receipet and invoice -->
    <div class="w-full flex flex-col items-center py-3 mt-4">
        <span class="w-full flex gap-2 mb-2 cursor-pointer" @click="goBack">
            <Button as="a" variant="link">
              <MoveLeft class="text-primary" /> Back to Dashboard
            </Button>
        </span>
      <!-- recipet -->
      <div class="w-full border rounded-xl p-3 max-w-[70%]">
        <!-- detials header -->
        <div class="flex flex-col border-b-[2px] border-gray-400 p-2">
          <div class="flex gap-2 items-center text-gray-500">
            <Banknote :size="22" />
            <p>AMOUNT</p>
          </div>

          <div class="flex gap-5 justify-between">
            <span class="flex items-center text-blue-600">
              <DollarSign :size="16" />
              <p class="font-sans font-semibold">{{ transaction?.amount }}.00 BIRR</p>
            </span>
            <p
              class="text-xs font-semibold flex items-center gap-1 whitespace-nowrap tracking-tighter p-1 w-24 rounded-sm justify-center"
              :class="statusStyle(transaction?.status)"
            >
              <component :is="IconType(transaction?.status)" class="w-3 h-3" />
              {{ transaction?.status }}
            </p>
          </div>
        </div>
        <!-- Transaction Date and time -->
        <div class="flex py-2 gap-8 max-w-[60%] justify-between">
          <div class="flex flex-col gap-2 py-2 justify-between">
            <div class="flex gap-1">
              <p class="text-gray-500">Date:</p>
              <p class="font-medium">{{ transaction?.dateAndTime.split('T')[0] }}</p>
            </div>
            <div class="flex gap-1">
              <p class="text-gray-500">Time: </p>
              <p class="font-medium">{{ transaction?.dateAndTime.split('T')[1] }}</p>
            </div>
          </div>
          <div class="border-[1px] border-gray-300"></div>

          <div class="flex flex-col gap-2 py-2">
            <p class="text-gray-500">Transaction Id</p>
            <p class="bg-blue-50 text-center rounded-sm">{{ transaction?.transactionId }}</p>
          </div>
        </div>
        <!-- Transaction Detial -->
        <div class="relative pb-2">
          <div class="absolute pointer-events-none inset-0 opacity-15">
            <div
              class="absolute top-0 right-0 bg-yellow-400 w-[200px] h-[200px] rounded-full blur-xl"
            ></div>
            <div
              class="absolute bottom-0 left-0 bg-purple-400 w-[200px] h-[200px] rounded-full blur-xl"
            ></div>
          </div>

          <div class="border-t-[2px] border-gray-400 p-2">
            <p class="text-blue-500 font-medium">Transaction Detials</p>
          </div>

          <div class="flex flex-col gap-2 p-2">
            <div class="grid grid-cols-2">
              <p class="text-gray-500">Sender</p>
              <p class="text-md text-blue-500">{{ transaction?.sender }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p class="text-gray-500">Reciever</p>
              <p class="text-md text-yellow-500">{{ transaction?.reciver }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p class="text-gray-500">Terminal Code</p>
              <p class="text-md">{{ transaction?.terminalcode }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p class="text-gray-500">Payment</p>
              <p class="text-md">{{ transaction?.paymentType }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p class="text-gray-500">Bank</p>
              <p class="text-md">{{ transaction?.bankName }}</p>
            </div>
            <div class="grid grid-cols-2">
              <p class="text-gray-500">Reason</p>
              <p class="text-md">{{ transaction?.reason }}</p>
            </div>

            <div class="grid grid-cols-2">
              <p class="text-gray-500">Message</p>
              <p v-if="transaction?.message" class="text-md">{{ transaction?.message }}</p>
              <p class="font-semibold" v-if="!transaction?.message">-</p>
            </div>

            <div class="grid grid-cols-2">
              <p class="text-gray-500">Casher</p>
              <p class="text-md">{{ transaction?.casher }}</p>
            </div>
          </div>
          <div></div>
        </div>
        <div class="w-full flex justify-end">
          <Button class="bg-[#eab308] transition-all scale-100 duration-100 active:scale-105 hover:bg-[#eab308]/50" @click="isReceiptAllowed">
            <ReceiptText />
            Receipt
          </Button>
        </div>
      </div>
      <!-- invoice -->
       <div>
        
      <ReceiptModal :transaction="importantTransInfo" v-if="isModalOpen"/>
       </div>
    </div>
  </div>
</template>
