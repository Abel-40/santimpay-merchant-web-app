<script setup lang="ts">
import {
  Search,
  Bell,
  Calendar,
  ChevronDown,
} from "lucide-vue-next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
</script>

<template>
          <!-- Header -->
          
          <div
            class="flex justify-between"
          >
          <span class="w-full flex gap-2">
              <div class="relative w-full md:w-1/2 max-w-md">
              <Input
                id="search"
                type="text"
                placeholder="Enter Terminal Code"
                class="pl-10 bg-white h-12 shadow-sm focus:none"
              />
              <Search
                class="absolute left-3 top-3 size-5 text-muted-foreground"
              />
              </div>
              <Button class="
                  h-12 px-8
                  bg-gradient-to-r from-[#eab308] to-[#facc15]
                  text-black font-semibold
                  rounded-xl
                  shadow-lg hover:shadow-yellow-400/60
                  hover:bg-[#eab308]/20 
                  transition-all duration-300 ease-in-out
                  active:scale-[.97] active:shadow-inner
                  border-2 border-yellow-300/30 hover:border-yellow-400/40
                  hover:brightness-105
                  ring-1 ring-yellow-400/30 hover:ring-yellow-300/50
                  backdrop-blur-sm bg-opacity-90
                ">
                  Search
              </Button>

            </span>



            <!-- User Controls -->
            <div class="flex items-center gap-3">
              <div
                class="flex items-center gap-2 bg-white px-2 py-3 rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <p class="text-sm whitespace-nowrap tracking-tighter">Merchant Id:  965523</p>
                <ChevronDown class="w-4 h-4"/>
              </div>
            </div>
          </div>
</template>