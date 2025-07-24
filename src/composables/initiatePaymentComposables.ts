import { ref, reactive, computed } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { useTransactionStore } from '@/stores/useTransactionStore'

export default function useInitiatePayment() {
  const store = useTransactionStore()
  const { toast } = useToast()

  const Form = reactive({
    payWith: '',
    phoneNumber: '',
    amount: 0,
  })

  const elementName = ref('')
  const selectedPaymentLabel = ref('')

  const paymentMethods = {
    teleBirr: {
      icon: new URL('@/assets/telebirr.jpg', import.meta.url).href,
      label: 'Telebirr',
    },
    cbeBirr: {
      icon: new URL('@/assets/cbe.png', import.meta.url).href,
      label: 'CBE Birr',
    },
    mpesa: {
      icon: new URL('@/assets/mpesa.jpg', import.meta.url).href,
      label: 'M-Pesa',
    },
    abyssinia: {
      icon: new URL('@/assets/abyssinia.png', import.meta.url).href,
      label: 'Abyssinia Bank',
    },
    ahadu: {
      icon: new URL('@/assets/ahadu.png', import.meta.url).href,
      label: 'Ahadu Bank',
    },
    awash: {
      icon: new URL('@/assets/Awash-Bank-SC-Ethiopia-Logo-EPS-Capital-Shareholders-Profit-Financial-Statements-627x360.png', import.meta.url).href,
      label: 'Awash Bank',
    },
    amhara: {
      icon: new URL('@/assets/amhara.png', import.meta.url).href,
      label: 'Amhara Bank',
    },
    anbessa: {
      icon: new URL('@/assets/anbessabank-CDpZDb9b.png', import.meta.url).href,
      label: 'Anbessa Bank',
    },
    obi: {
      icon: new URL('@/assets/oib-DR840mkZ.png', import.meta.url).href,
      label: 'OIB (Oromia International Bank)',
    },
    geda: {
      icon: new URL('@/assets/gada-BYAlOwea.jpeg', import.meta.url).href,
      label: 'Geda Bank',
    },
    mastercard: {
      icon: new URL('@/assets/mastercard-CZ46MBsS.jpg', import.meta.url).href,
      label: 'Mastercard',
    },
    visa: {
      icon: new URL('@/assets/Visa_2021.svg.png', import.meta.url).href,
      label: 'Visa',
    },
  } as const;
  

  type PaymentMethod = keyof typeof paymentMethods

  const choosePayWith = (method: PaymentMethod) => {
    elementName.value = method
    Form.payWith = method
    selectedPaymentLabel.value = paymentMethods[method].label
  }

  const setActivePaymentMethod = (method: string) => {
    return method === elementName.value ? ' border-[2px] border-[#eab308]' : ''
  }

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

  const onSubmit = () => {
    if (!validate()) return

    store.addTransaction({
      amount: Form.amount,
      sender: Form.phoneNumber,
      paymentType:'mobile banking',
      bank: selectedPaymentLabel.value,
    })

    toast({
      title: 'Success!',
      description: 'Payment initiated successfully.',
    })

    // Reset form
    Form.amount = 0
    Form.phoneNumber = ''
    Form.payWith = ''
    elementName.value = ''
    selectedPaymentLabel.value = ''
  }

  return {
    Form,
    elementName,
    selectedPaymentLabel,
    choosePayWith,
    setActivePaymentMethod,
    paymentMethods,
    onSubmit,
  }
}
