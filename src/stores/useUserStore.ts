import type { UserType } from "@/types/Types";
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [
      {
        merchantId: 'abel12',
        pin: '1234',
        role: 'admin',
        isAuthenticated:false
      }
    ] ,
    currentUserId: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.currentUserId,
    currentUser: (state) =>
      state.users.find(user => user.merchantId === state.currentUserId) || null
  },

  actions: {
    login(userPassed: UserType): boolean {
      console.log('Attempting login with:', userPassed)
      console.log('stored user',this.users[0])
      const user = this.users.find(u => 
        u.merchantId === userPassed.merchantId && 
        u.pin === userPassed.pin
      )
      console.log('Found user:', user)
      
      if (user) {
        this.currentUserId = user.merchantId
        console.log('Login successful. Current state:', this.$state)
        return true
      }
      return false
    }, logout() {
      this.currentUserId =null;
    }
  },

  persist: {
    key: 'pinia-user',  
    storage: localStorage
  }
});
