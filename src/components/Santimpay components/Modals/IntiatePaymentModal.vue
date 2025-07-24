<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import modalComposables from '@/composables/IntiatePaymentComposable'
import {Card,CardContent} from '@/components/ui/card/'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label/'
import {ref,reactive,computed } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { HandCoins } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast'
import modalComposablesForInitiatePayment from '@/composables/initiatePaymentComposables'
import { useTransactionStore } from '@/stores/useTransactionStore'
const {
  Form,
  choosePayWith,
  setActivePaymentMethod,
  paymentMethods,
  onSubmit
} = modalComposablesForInitiatePayment()
const { onClose,isOpen } = modalComposables()
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
  <Modal :isOpen="isOpen" @onClose="onClose" title="Intiate payment" description="">
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#eab308] rounded-full blur-xl"></div>
      <div class="absolute bottom-2 left-0 w-40 h-40 bg-purple-400 rounded-full blur-xl"></div>
    </div>
    <div class="  max-h-[600px]">
      <form @submit.prevent="onSubmit" class="space-y-2 flex flex-col justify-center items-center">
        <Card class="w-[80%] overflow-y-auto p-3">
          <CardContent class="grid gap-4">
            <div class="grid gap-2">
              <Label for="amount">Amount</Label>
              <Input id="amount" type="number" placeholder="0.00" v-model="Form.amount" :min="0"/>
              <p v-if="!isValidAmount && Form.amount" class="text-red-500 text-4 md-1">Invalid amount</p>
            </div>
            <div class="grid gap-2">
              <Label for="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" type="text" placeholder="09XXXXXXX" v-model="Form.phoneNumber" />
              <p v-if="!isValidPhoneNumber && Form.phoneNumber" class="text-red-500 text-4 md-1">Invalid phone number format</p>
            </div>
             <!-- Payment Methods -->
            <div class="grid grid-cols-4  gap-1 cursor-pointer">
              <div v-for="(item, key) in paymentMethods"
            :key="key"
            class="w-8 h-8 flex justify-center items-center rounded-sm"
            @click="choosePayWith(key as PaymentMethod)"
            :class="setActivePaymentMethod(key as PaymentMethod)">
            <img :src="item.icon" class="w-6 h-6" />
          </div>
            </div>
            <p v-if="!isValidPayWith && Form.payWith" class="text-red-500 text-4 md-1">please select payment method</p>
          </CardContent>
        </Card>
        <Button class="w-1/2 h-[30px] bg-[#eab308] transition-all duration-100 hover:scale-110 hover:bg-[#eab308]/80" type="submit">INITIATE <HandCoins class="text-black w-16 h-16 mb-2"/></Button>
      </form>
    </div>
  </Modal>
</template>
