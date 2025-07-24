import {reactive,toRefs} from "vue"

const state = reactive({
  isModalOpen:false
})

export default ()=>{
  const {isModalOpen} = toRefs(state)

  const whenOpen = ()=>{
    state.isModalOpen = true
  }
  const whenClose = ()=>{
    state.isModalOpen = false
  }
  return {isModalOpen,whenClose,whenOpen}
}