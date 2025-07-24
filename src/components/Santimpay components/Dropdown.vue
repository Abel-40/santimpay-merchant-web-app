<script setup lang="ts">
defineProps<{options:string[],show:boolean}>()
const emit = defineEmits<{
  (e:'select'):void
}>()

function handleOption(){
  emit('select')
}
</script>

<template>
  <ul v-if="show" class="absolute top-full left-0 p-2 border-[1px] border-x-black list-none" >
    <li class="w-full text-gray-500 " v-for="option in options" :key="option" :value="option" @click="handleOption"> {{ option }}</li>
  </ul>

</template>