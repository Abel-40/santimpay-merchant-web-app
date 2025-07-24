import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import DashboardLayout from '@/views/Admins/DashboardLayout.vue'
import LandingPage from '@/components/Santimpay components/sections/LandingPage.vue'
import Login from '@/components/Santimpay components/Login.vue'
import { useUserStore } from '@/stores/useUserStore'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/check-component/',
      name: 'check-component',
      component: Home,
    },
    {
      path: '/merchant-dashboard/',
      name: 'merchant-dashboard',
      component: DashboardLayout,
      meta:{requiresAuth:true},
      children: [
        {
          path: '', 
          name: 'default-landing',
          component: LandingPage, 
          meta:{requiresAuth:true}
        },
      ],
    },
  ],
})


router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})


export default router
