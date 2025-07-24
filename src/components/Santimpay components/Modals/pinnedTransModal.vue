<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import modalComposables from '@/composables/pinTrans'
import {Card,CardContent} from '@/components/ui/card/'
import { Input } from '@/components/ui/input'
import {ref,reactive,computed } from 'vue'
import Button from '@/components/ui/button/Button.vue'
import { HandCoins } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast'

const { whenOpen, whenClose,isModalOpen } = modalComposables()
const {toast} = useToast()
const emit = defineEmits(['submit'])
const note = ref('')

const onSubmit = () => {
  emit('submit', note.value)
  whenClose()
}
const onCloseAndSubmit = ()=>{
  emit('submit',note.value)
  whenClose()
}
</script>

<template>
  <Modal v-model:isOpen="isModalOpen" @onClose="onCloseAndSubmit" title="" description="add note for pinned transaction">
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-0 right-0 w-32 h-32 bg-[#eab308] rounded-full blur-xl"></div>
      <div class="absolute bottom-2 left-0 w-40 h-40 bg-purple-400 rounded-full blur-xl"></div>
    </div>
    <div class="  max-h-[600px]">
      <form @submit.prevent="onSubmit" class="space-y-2 flex flex-col justify-center items-center">
        <Card class="w-[80%] overflow-y-auto p-3">
          <CardContent class="grid gap-4">
            

              <div class="">
                <Input type="textfield" placeholder="add note" v-model="note"/>
              </div>
      
          </CardContent>
        </Card>
        <Button class="w-1/2 h-[30px] bg-[#eab308] transition-all duration-100 hover:scale-110 hover:bg-[#eab308]/80" type="submit">SAVE NOTE</Button>
      </form>
    </div>
  </Modal>
</template>
