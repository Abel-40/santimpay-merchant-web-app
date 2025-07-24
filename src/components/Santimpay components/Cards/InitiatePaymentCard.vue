<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { Input } from '@/components/ui/input'
import { HandCoins, ChevronRight } from 'lucide-vue-next'
import modalComposables from '@/composables/IntiatePaymentComposable'
import { reactive, ref, computed } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTransactionStore } from '@/stores/useTransactionStore'
import modalComposablesForInitiatePayment from '@/composables/initiatePaymentComposables'

const {
  Form,
  choosePayWith,
  setActivePaymentMethod,
  paymentMethods,
  onSubmit
} = modalComposablesForInitiatePayment()
const { onOpen } = modalComposables()
const store = useTransactionStore()
const { toast } = useToast()

interface FormType {
  payWith: string
  phoneNumber: string
  amount: number
}
const firstThreePaymentMethods = Object.entries(paymentMethods).slice(0, 3)

type PaymentMethod = keyof typeof paymentMethods
const isValidPhoneNumber = computed(() => /^09\d{8}$/.test(Form.phoneNumber))
const isValidPayWith = computed(() => Form.payWith !== '')
const isValidAmount = computed(() => Form.amount > 0)

const validate = () => {
  if (!isValidAmount.value || !isValidPayWith.value || !isValidPhoneNumber.value) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'Please fill out the entire form correctly.',
      variant: 'destructive',
    })
    return false
  }
  return true
}
</script>


<template>
  <div
    class="w-full max-h-[230px] flex flex-col h-full items-center justify-center rounded-2xl shadow-xl overflow-hidden relative border border-gray-200 px-2 py-5">
    <p class="text-gray-800 py-2 text-lg font-semibold">Initiate Payment</p>

    <!-- Background decoration -->
    <div class="w-full h-full absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#eab308] rounded-full blur-xl"></div>
      <div class="absolute bottom-0 left-0 w-40 h-40 bg-purple-400 rounded-full blur-xl"></div>
    </div>

    <form @submit.prevent="onSubmit" class="w-full flex flex-col justify-center items-center">
      <div class="w-[70%]">
        <Input type="number" placeholder="Amount" class="w-full mb-2" v-model="Form.amount" />
        <Input type="text" placeholder="09XXXXXXXX" class="w-full mb-2" v-model="Form.phoneNumber" />

        <!-- Payment Methods -->
        <div class="grid grid-cols-3 gap-2">
          <div v-for="([key, item]) in firstThreePaymentMethods"
            :key="key"
            class="w-8 h-8 flex justify-center items-center rounded-sm"
            @click="choosePayWith(key as PaymentMethod)"
            :class="setActivePaymentMethod(key as PaymentMethod)">
            <img :src="item.icon" class="w-6 h-6" />
          </div>


          <Button
            type="button"
            variant="link"
            class="h-4 col-span-3 text-sm p-0 text-blue-500 cursor-pointer"
            @click="onOpen">
            View others <ChevronRight />
          </Button>
        </div>
      </div>

      <Button
        class="w-full h-[30px] bg-[#eab308] transition-all duration-100 hover:scale-105 hover:bg-[#eab308]/80"
        type="submit">
        INITIATE <HandCoins class="text-black w-16 h-16 mb-2" />
      </Button>
    </form>
  </div>
</template>
