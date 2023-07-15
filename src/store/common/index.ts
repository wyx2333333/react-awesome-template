import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useCommonStore = create<STORE.CommonStore>()(
  devtools(
    persist(set => ({ token: '', setToken: token => set({ token }) }), { name: 'common-store' }),
    { name: 'common-store' }
  )
)
