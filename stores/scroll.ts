import { defineStore } from 'pinia'

interface State {
  scroll: number;
}

export const useScrollStore = defineStore({
  id: 'useScroll',
  state: (): State => ({
    scroll: 0
  }),
})
