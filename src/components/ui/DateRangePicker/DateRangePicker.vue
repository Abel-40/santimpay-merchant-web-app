<script setup lang="ts">
import { ref, watch } from 'vue'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { getLocalTimeZone,CalendarDate, today } from '@internationalized/date'
import { Card,CardContent,CardHeader,CardTitle } from '../card'
import type { DateRange } from 'reka-ui'
import Button from '@/components/ui/button/Button.vue'

const emit = defineEmits<{
  (e: 'update:range', range: DateRange): void
}>()

const todayDate = today(getLocalTimeZone())

const value = ref<DateRange>({
  start: undefined, 
  end: todayDate,     
})

// Popover control
const open = ref(false)
watch(value, (newVal) => {
  if (newVal.start && newVal.end) {
    const start = newVal.start instanceof CalendarDate
      ? newVal.start
      : new CalendarDate(newVal.start.year, newVal.start.month, newVal.start.day)

    const end = newVal.end instanceof CalendarDate
      ? newVal.end
      : new CalendarDate(newVal.end.year, newVal.end.month, newVal.end.day)

    emit('update:range', { start, end })
  }
})
const defaultChoice = ()=>{
  value.value.start =undefined;
  value.value.end = today(getLocalTimeZone());
  open.value=false
}
</script>



<template>
  <Popover v-model:open="open" class="h-auto">
    <PopoverTrigger as-child>
      <button
        class="flex items-center gap-2 px-4 py-2 border rounded-md shadow-sm bg-white hover:bg-gray-50 transition text-sm"
      >
        <span class="text-gray-700">
          <template v-if="value.start && value.end">
            {{ value.start.toString() }} → {{ value.end.toString() }}
          </template>
          <template v-else>
            {{ todayDate.toString() }}
          </template>
        </span>
      </button>
    </PopoverTrigger>

    <PopoverContent class="rounded-md p-2 text-xs w-auto bg-white border shadow-xl" :side="'right'" :align="'center'" >
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            <p>select date range</p>
            <Button class="bg-[#d1d1d1] h-[20px] hover:bg-[#eab308]/50  text-xs text-black transition-all scale-100 duration-100 active:scale-105" @click="defaultChoice">default</Button>
          </CardTitle>
        </CardHeader>
          <RangeCalendar v-model="value" class="text-xs" :maxValue="today(getLocalTimeZone())"/>
      </Card>
    </PopoverContent>
  </Popover>
</template>
