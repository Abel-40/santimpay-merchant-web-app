<script setup lang="ts">
import Modal from '@/components/Modal.vue'
import FilterComposables from '@/composables/FilterComposables'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Button from '@/components/ui/button/Button.vue'
import {useFilterStore} from "@/stores/useFilterStore"
const { isFilterOpen, onFilterClose } = FilterComposables()

const store = useFilterStore()
const applyFilter = () => {

  onFilterClose()
}

</script>

<template>
  <Modal :isOpen="isFilterOpen" @onClose="onFilterClose" title="" description="">
    <div class="w-full p-3 space-y-2">
      <div class="flex flex-col justify-center items-center">
        <h2 class="text-xl font-semibold">Filter Options</h2>
      </div>

      <div class="flex flex-col gap-3 border rounded-md p-3">
        <!-- Filter Options -->
        <h3 class="">Filter by</h3>

        <div class="flex items-center space-x-2">
          <Checkbox
            v-model="store.filterOptions.date"
            id="date"
            class="text-yellow-400"
          />
          <Label
            for="date"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Date
          </Label>
        </div>

        <div class="flex items-center space-x-2">
          <Checkbox
            v-model="store.filterOptions.amount"
            id="amount"
            class="text-yellow-400"
          />
          <Label
            for="amount"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Amount
          </Label>
        </div>

        <div class="flex items-center space-x-2">
          <Checkbox
            v-model="store.filterOptions.status"
            id="status"
            class="text-yellow-400"
          />
          <Label
            for="status"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Status
          </Label>
        </div>

        <div class="flex items-center justify-center">
          <Button
            @click="applyFilter"
            class="bg-[#eab308] max-w-[80px] h-[30px] text-sm transition-all scale-100 duration-100 active:scale-105 hover:bg-[#eab308]/50"
          >
            Apply Filter
          </Button>
        </div>
      </div>
    </div>
  </Modal>
</template>
