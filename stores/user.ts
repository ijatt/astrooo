import { defineStore } from 'pinia'
import type { UserData } from '~/types/user'

export const userStore = defineStore("user", () => {
  const user = ref<UserData | null>(null)
  const setUser = (newUser: UserData) => {
    user.value = newUser
  }
  const clearUser = () => {
    user.value = null
  }
  return {
    user,
    setUser,
    clearUser
  };
}, {persist: true})
