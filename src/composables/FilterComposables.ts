import {reactive, ref, toRef, toRefs} from 'vue'
const filterState = reactive({
  isFilterOpen:false
})
export default  ()=>{
  const {isFilterOpen} = toRefs(filterState)
  const onFilterOpen = ()=>{
    filterState.isFilterOpen = true
  }
  const onFilterClose = ()=>{
    filterState.isFilterOpen = false
  }
  return {isFilterOpen,onFilterClose,onFilterOpen}
}