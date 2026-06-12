import { create } from 'zustand'

export type AppView = 'home' | 'showcase' | 'terms'

interface AppState {
  isRegisterModalOpen: boolean
  isMobileMenuOpen: boolean
  view: AppView

  openRegisterModal: () => void
  closeRegisterModal: () => void

  openMobileMenu: () => void
  closeMobileMenu: () => void

  setView: (view: AppView) => void
}

export const useAppStore = create<AppState>((set) => ({
  isRegisterModalOpen: false,
  isMobileMenuOpen: false,
  view: 'home',

  openRegisterModal: () => set({ isRegisterModalOpen: true }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),

  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  setView: (view) => set({ view, isMobileMenuOpen: false }),
}))
