import { defineStore } from "pinia"
import type { filterOptionType } from "@/types/Types"
import {ref} from 'vue'

export const useFilterStore = defineStore('useFilterStore',{
  state:()=>({
    filterOptions:ref<filterOptionType>({
        date: false,
        amount: false,
        status: false,
      })
  }),

  actions:{
    selectDate(){
      !this.filterOptions.date
    },
    selectAmount(){
      !this.filterOptions.amount
    },
    selectStatus(){
      !this.filterOptions.status
    }
  }
  ,persist:true
})