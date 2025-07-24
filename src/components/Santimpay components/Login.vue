<script setup lang="ts">
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'
import type { UserType } from '@/types/Types'
import { ref } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import Button from '@/components/ui/button/Button.vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UserRound } from 'lucide-vue-next'

const UserForm = ref<UserType>({
  merchantId: '',
  pin: '',
  role: 'admin',
  isAuthenticated: false
})
const {toast} = useToast()
const router = useRouter()
const store = useUserStore()
const handleLogin = () => {
  if (!UserForm.value.merchantId || !UserForm.value.pin) {
    toast({
      title: 'Error',
      description: 'Please fill all fields',
      variant: 'destructive'
    })
    return
  }

  
  const success = store.login(UserForm.value)
  
  if (success) {
    toast({ title: 'Login successful' })
    router.push('merchant-dashboard/?section=landing')

  } else {
    toast({
      title: 'Login failed',
      description: 'Wrong merchant ID or PIN',
      variant: 'destructive'
    })
  }
}
</script>

<template>
  <div class="rleative min-h-screen flex justify-center p-8 bg-[#eff5fb] ">
  
    <div class="w-[80%] flex  rounded-2xl shadow-2xl ">
       <!-- Background blur gradient -->
      <div class="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div class="absolute top-0 w-full h-1/2 bg-[#dfdac9] blur-lg"></div>
        <div class="absolute bottom-0 w-full h-1/2 bg-[#c7a43b] blur-2xl"></div>
      </div>
      <!-- Form Section -->
    <div class="w-1/2 flex flex-col items-center gap-4 justify-center p-10 z-10 relative">
      <div class="flex  justify-between items-center gap-8">
          <span class=" font-bold ">
                <span class="text-xl">
                  SANTIM 
                </span>
                <span class="text-2xl text-yellow-300">
                  PAY
                </span>
          </span>
          <span>
            <span class="text-md">
                  So 
                </span>
                <span class="text-md text-yellow-300">
                  Simple
                </span>
          </span>
        </div>
      <form @submit.prevent="handleLogin" class="w-1/2 max-w-md space-y-6">
        <!-- <h3 class="text-xl font-bold text-center">Welcome Back</h3> -->

        <div class="space-y-2">
          <Label for="merchantId" class="text-gray-500 ml-2">Merchant Id</Label>
          <Input
            id="merchantId"
            type="text"
            placeholder="Enter Your Id"
            v-model="UserForm.merchantId"
            class="rounded-2xl border border-[#eab308] focus-visible:ring-0"
            
          />
        </div>

        <div class="space-y-2">
          <Label for="pin" class="text-gray-500 ml-2">Pin</Label>
          <Input id="pin" placeholder="******"  type="password" v-model="UserForm.pin"  class="rounded-2xl border border-[#eab308] focus-visible:ring-0"/>
        </div>

        <Button class="bg-[#eab308] transition-all scale-100 duration-100 hover:scale-105 hover:bg-[#eab308]/80 w-full" type="submit">Login</Button>
      </form>
    </div>

    <!-- Image and Decorative Section -->
    <div class="w-1/2 relative overflow-hidden p-5">
      <div class="relative z-10 bg-[url('@/assets/cashier.jpg')] bg-cover bg-center bg-no-repeat h-full w-full p-5 flex flex-col justify-between rounded-xl">
          <!-- upper -->
          <div class="h-1/4 mt-20 ml-12">
            <!-- trans Card -->
            <div class="relative w-full max-w-[250px] max-h-[90px] bg-[#F4F9FD] flex itmes-center rounded-xl px-3 p-2 shadow-lg -mb-24 ml-6 border">
              <!-- Blurred background decoration -->
              <div class="w-full h-full absolute inset-0 opacity-20 pointer-events-none">
                <div class="absolute top-0 right-0 w-24 h-24 bg-[#eab308] rounded-full blur-xl"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
              </div>

              <div class="w-full flex gap-2">
                <div class="w-[50px] h-[50px] border rounded-full bg-black"></div>
                <div class=" flex flex-col gap-4 justify-start items-start">
                  <div class="w-full grid grid-cols-2 justify-items-start space-x-6">
                    <p class="flex gap-2 text-blue-400 text-xs">0934*****4 </p>
                    <p class="text-yellow-400 text-xs">Abc</p>
                  </div>

                  <div class="w-full  grid grid-cols-2 gap-4 justify-items-start space-x-3">
                    <p class="text-green-400 text-[10px]">ETB 2000.00</p>
                    <p class="text-yellow-400 text-[10px] font-semibold">2025-05-01</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="relative w-full max-w-[250px] max-h-[90px] bg-[#F4F9FD] flex itmes-center rounded-xl px-3 p-2 shadow-lg border">
              <!-- Blurred background decoration -->
              <div class="w-full h-full absolute inset-0 opacity-20 pointer-events-none">
                <div class="absolute top-0 right-0 w-24 h-24 bg-[#eab308] rounded-full blur-xl"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-purple-400 rounded-full blur-xl"></div>
              </div>

              <div class="w-full flex gap-2">
                <div class="w-[50px] h-[50px] border rounded-full bg-black"></div>
                <div class=" flex flex-col gap-2 justify-start items-start">
                  <div class="w-full grid grid-cols-2 justify-items-start space-x-6">
                    <p class="flex gap-2 text-blue-400 text-[10px]">0934*****4 </p>
                    <p class="text-yellow-400 text-[10px]">Abc</p>
                  </div>

                  <div class="w-full  grid grid-cols-2 gap-4 justify-items-start space-x-3">
                    <p class="text-green-400 text-[10px]">ETB 5000.00</p>
                    <p class="text-yellow-400 text-[10px] font-semibold ">2025-05-01</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- lower -->
          <div class="w-full h-3/4 flex-flex-col space-y-16">
              <div class=" flex justify-end mr-12">
                <div class="flex items-center justify-center">
                  <div class="flex flex-col gap-1">
                    <div class="w-[40px] h-[40px] rounded-full bg-black bg-[url('@/assets/piechart.jpg')] bg-no-repeat bg-cover bg-center"></div>
                    <div class="w-[40px] h-[40px] rounded-full bg-black bg-[url('@/assets/chart.png')] bg-no-repeat bg-cover bg-center"></div>
                  </div>
                  <div class="w-[40px] h-[40px] rounded-full bg-white bg-[url('@/assets/file.png')] bg-no-repeat bg-contain bg-center"></div>
              </div>
            </div>

            
            <div class="relative h-1/2 flex flex-col items-start ml-12 ">
              <!-- calendar -->
              <div class="relative max-w-[400px] h-[100px] grid grid-cols-7 bg-white/30 backdrop-blur-sm bg-opacity-2 p-4 gap-3 rounded-xl text-sm">
                <div class="text-white  flex flex-col gap-1">
                  <p class="">Sun</p>
                  <p>22</p>
                </div>

                <div class="text-white flex flex-col gap-1">
                  <p>Mon</p>
                  <p>23</p>
                </div>

                <div class="text-white flex flex-col gap-1">
                  <p>Tue</p>
                  <p>24</p>
                </div>

                <div class="text-white flex flex-col gap-1">
                  <p>Wed</p>
                  <p>25</p>
                </div>

                <div class="text-white flex flex-col gap-1">
                  <p>Thur</p>
                  <p>26</p>
                </div>
                <div class="text-white flex flex-col gap-1">
                  <p>Fri</p>
                  <p>27</p>
                </div>

                <div class="text-white flex flex-col gap-1">
                  <p>Satur</p>
                  <p>28</p>
                </div>
              </div>

              <div class="absolute top-16 -left-9 max-w-[250px] rounded-xl bg-white/30 backdrop-blur-sm flex flex-col gap-2 px-2 py-2  ">
                <div class="flex justify-between px-2 items-center gap-8">
                  <p class="text-black text-sm">Get your Report</p>
                  <div class="w-2 h-2 border-black border-[1px] rounded-full bg-black"></div>
                </div>

                <div class="max-w-[300px] max-h-[90px] flex gap-1 ">
                  <div class="bg-[#F4F9FD] w-[40px] h-[40px] rounded-full text-[10px] flex justify-center items-center p-1 border -mr-4">Daily</div>
                  <div class="bg-[#F4F9FD] w-[40px] h-[40px] rounded-full text-[8px] flex justify-center items-center border -mr-4">Weekly</div>
                  <div class="bg-[#F4F9FD] w-[40px] h-[40px] rounded-full text-[8px] flex justify-center items-center border -mr-4">Monthly</div>
                  <div class="bg-[#F4F9FD] w-[40px] h-[40px] rounded-full text-[8px] flex justify-center items-center border ">Yearly</div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    </div>

  </div>

</template>


