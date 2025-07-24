<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import {
  LayoutDashboard,
  ChartNoAxesCombined,
  LogOut,
  Pin,
  Cog,
  CircleHelp,
  ClipboardList,
  X,
} from 'lucide-vue-next'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeItem = computed(() => route.query.section || 'landing')
const store = useUserStore()
const navItems = [
  { title: 'Dashboard', sectionName: 'landing' },
  { title: 'Transactions', sectionName: 'transactions' },
  { title: 'Analysis', sectionName: 'analysis' },
  { title: 'Pined Transaction', sectionName: 'pinned-transactions' },
  { title: 'Others', sectionName: 'others' },
]

const setNavIcon = (title: string) => {
  switch (title) {
    case 'Dashboard':
      return LayoutDashboard
    case 'Transactions':
      return ClipboardList
    case 'Pined Transaction':
      return Pin
    case 'Analysis':
      return ChartNoAxesCombined
    case 'Others':
      return Cog
  }
}

const setItemClass = (sectionName: string) => {
  return activeItem.value === sectionName
    ? 'font-semibold bg-yellow-50/80 text-yellow-500'
    : 'text-[#7D8592]'
}

const setIconColor = (sectionName: string) => {
  return activeItem.value === sectionName ? 'text-yellow-500' : 'text-[#7D8592] stroke-[#7D8592]'
}

const logOut = () => {
  store.logout()
  router.push('/')
}
</script>

<template>
  <!-- Sidebar -->
  <div
    class="bg-[#F4F9FD] py-4 px-4 md:pl-6 rounded-lg md:min-h-screen shadow-xl w-[280px] md:w-64 transition-all duration-300 ease-in-out"
  >
    <div class="relative flex flex-col justify-between h-full md:min-h-[80%]">
      <!-- Blur Background -->
      <div class="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div
          class="absolute top-8 left-0 w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-blue-400 rounded-full blur-xl"
        ></div>
        <div
          class="absolute bottom-1 left-0 w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-purple-400 rounded-full blur-xl"
        ></div>
      </div>

      <!-- Logo and Navigation -->
      <div class="space-y-6">
        <!-- Logo -->
        <div class="flex items-center gap-2 mb-6">
          <div
            class="w-[45px] h-[45px] md:w-[50px] md:h-[50px] rounded-sm flex flex-col items-center justify-center shadow-md p-2 md:p-3"
          >
            <p class="text-[10px] font-bold text-Black tracking-tighter">SANTIM</p>
            <p class="text-sm font-extrabold text-yellow-300 tracking-tighter">PAY</p>
          </div>
          <span class="font-bold pl-2">
            <span class="text-sm md:text-md">SANTIM</span>
            <span class="text-lg md:text-xl text-yellow-300">PAY</span>
          </span>
        </div>

        <!-- Navigation -->
        <nav class="space-y-1 md:space-y-2">
          <RouterLink
            v-for="(navItem, index) in navItems"
            :key="index"
            :to="{ name: 'merchant-dashboard', query: { section: navItem.sectionName } }"
          >
            <div
              class="min-w-[90px] h-[45px] md:h-[50px] flex justify-between items-center cursor-pointer group"
            >
              <a
                class="w-full flex items-center gap-2 h-full rounded-l-xl px-2 md:px-3 transition-colors duration-200"
                :class="setItemClass(navItem.sectionName)"
              >
                <component
                  :is="setNavIcon(navItem.title)"
                  class="w-4 h-4 md:w-5 md:h-5"
                  :class="setIconColor(navItem.sectionName)"
                />
                <span class="text-sm md:text-base">{{ navItem.title }}</span>
              </a>
              <div
                class="w-0 h-full rounded-xl"
                :class="[
                  activeItem === navItem.sectionName ? 'border-l-yellow-500 border-l-[3px]' : '',
                ]"
              ></div>
            </div>
          </RouterLink>
        </nav>
      </div>

      <!-- User Profile and Logout -->
      <div class="mt-auto space-y-4 pb-4">
        <div class="p-2 rounded-lg">
          <div
            class="bg-[url('https://plus.unsplash.com/premium_photo-1681487966346-cb4a0c7a2a72?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] rounded-lg w-full max-w-[150px] aspect-square bg-cover bg-center flex flex-col justify-end px-3 pb-2"
          >
            <Button
              class="bg-[#eab308] transition-all scale-100 duration-100 hover:scale-105 hover:bg-[#eab308]/80 text-xs md:text-sm"
              as="a"
              href="https://t.me/Santimpaysupport"
            >
              Support <CircleHelp class="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
        <button
          class="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm md:text-base px-2"
          @click="logOut"
        >
          <LogOut class="w-4 h-4 md:w-5 md:h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>
