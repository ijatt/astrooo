import { defineStore } from 'pinia'

interface State {
  accessToken: string | null;
}

export const useTokenStore = defineStore({
  id: 'useToken',
  state: (): State => ({
    accessToken: null
  }),
})
