<script setup lang="ts">
import { Minus } from 'lucide-vue-next';
import { Square } from 'lucide-vue-next';
import { X } from 'lucide-vue-next';
import Dropdown from './Dropdown.vue';
import {ref} from "vue"
interface navDrop {
  option:string[]
  show:boolean
}
const optionForEdit = ref([
  {
    option:['Undo','Redo','Cut','Copy','Paste','Delete','Select All'],show:false,
  }
])
const optionForFile = ref([
  {
    option:['Exit'],show:false,
  }
])
const optionForView = ref([
  {
    option:['Reload','Force Reload','Toggle Developer tool','Actual size','Zoom In','Zoom out'],show:false,
  }
])
const optionForWindow = ref([
  {
    option:['Minimize','Zoom','Close'],show:false,
  }
])
const optionsForHelp = ref([
  {
    option:[''],show:false
  }
])
 function closeAllNav(){  
  handleServiceClickForEdit()
  handleServiceClickForHelp()
  handleServiceClickForView()
  handleServiceClickForWindow()
  handleServiceClickForFile()
}

function toggleDropdownForFile() {
  optionForFile.value[0].show = !optionForFile.value[0].show
  handleServiceClickForEdit()
  handleServiceClickForHelp()
  handleServiceClickForView()
  handleServiceClickForWindow()
  
}
function toggleDropdownForEdit() {
  optionForEdit.value[0].show = !optionForEdit.value[0].show
  handleServiceClickForHelp()
  handleServiceClickForView()
  handleServiceClickForWindow()
  handleServiceClickForFile()
}
function toggleDropdownForView() {
  optionForView.value[0].show = !optionForView.value[0].show
  handleServiceClickForEdit()
  handleServiceClickForHelp()
  handleServiceClickForWindow()
  handleServiceClickForFile()
}
function toggleDropdownForWindow() {
  optionForWindow.value[0].show = !optionForWindow.value[0].show
  handleServiceClickForEdit()
  handleServiceClickForHelp()
  handleServiceClickForView()
  handleServiceClickForFile()
}
function toggleDropdownForHelp() {
  optionsForHelp.value[0].show = !optionsForHelp.value[0].show
  handleServiceClickForEdit()
  handleServiceClickForView()
  handleServiceClickForWindow()
  handleServiceClickForFile()
}

function handleServiceClickForFile() {
  optionForFile.value[0].show = false
}
function handleServiceClickForEdit() {
  optionForEdit.value[0].show = false 
}
function handleServiceClickForView() {
  optionForView.value[0].show = false 
}
function handleServiceClickForWindow() {
  optionForWindow.value[0].show = false 
}
function handleServiceClickForHelp() {
  optionsForHelp.value[0].show = false
}


defineExpose<{
  closeAllNav: () => void;
}>({
  closeAllNav,
});
</script>

<template @click="closeAllNav()">
  <!-- title plus nav -->
  <div class="flex flex-col w-full">
    <!-- title -->
     <div class="flex items-center justify-between bg-blue-500 h-[30px] active:text-white px-1">
        <span class="flex items-center gap-1 ">
          <img class="w-5" src="D:\All I Need\6,internship files\santim\Santim pay Merchant Web based app\merchant_webapp\src\assets\santim logo.jpg" >
          <p class="text-[12px] active:text-gray-400 text-white">Merchant Admin Pannel</p>
        </span>
        <div class="flex gap-7">
          <div class=""><Minus class="w-3 h-3 text-white active:text-gray-400"/></div>
          <div class=""><Square class="w-3 h-3 text-white active:text-gray-400"/></div>
          <div class=""><X class="w-3 h-3 text-white active:text-gray-400"/></div>
        </div>
      </div>
      <nav class="flex w-full justify-start gap-3 relative">
        <div class="text-[12px] text-gray-500 active:text-black relative cursor-pointer" @click="toggleDropdownForFile">File
          <Dropdown 
            :options="optionForFile[0].option"
            :show="optionForFile[0].show"
            @select="handleServiceClickForFile"
            
            />
        </div>
        <div  class="text-[12px] text-gray-500 active:text-black relative cursor-pointer" @click="toggleDropdownForEdit">Edit
          <Dropdown 
            :options="optionForEdit[0].option"
            :show="optionForEdit[0].show"
            @select="handleServiceClickForEdit"
            />
        </div>
        <div class="text-[12px] text-gray-500 active:text-black  relative cursor-pointer" @click="toggleDropdownForView">View
          <Dropdown 
            :options="optionForView[0].option"
            :show="optionForView[0].show"
            @select="handleServiceClickForView"
            />
        </div>
        <div  class="text-[12px] text-gray-500 active:text-black relative cursor-pointer" @click="toggleDropdownForWindow">Window
          <Dropdown 
            :options="optionForWindow[0].option"
            :show="optionForWindow[0].show"
            @select="handleServiceClickForWindow"
            />
        </div>
        <div  class="text-[12px] text-gray-500 active:text-black relative cursor-pointer" @click="toggleDropdownForHelp">Help
          <Dropdown 
            :options="optionsForHelp[0].option"
            :show="optionsForHelp[0].show"
            @select="handleServiceClickForHelp"
            />
        </div>
      </nav>
  </div>

</template>