import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Menu, X, Code } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { Button } from './ui/Button'

export const Navbar: React.FC = () => {
  const { isMobileMenuOpen, openMobileMenu, closeMobileMenu, openRegisterModal, view, setView } =
    useAppStore()

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'COURSES', href: '#courses' },
  ]

  const handleLinkClick = (href: string) => {
    closeMobileMenu()
    setView('home')
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
  }

  const handleLogoClick = () => {
    setView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100/50 [transform:translate3d(0,0,0)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left/Middle Nav Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                  className="text-sm font-bold tracking-wider text-brand-dark hover:text-brand-pink transition-colors font-sans"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Logo Center */}
            <div
              className="flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2 cursor-pointer"
              onClick={handleLogoClick}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-8 h-8 text-brand-blue" />
                <span className="font-extrabold text-xl tracking-tight text-brand-dark font-sans">
                  Smart <span className="text-brand-blue">Academy</span>
                </span>
              </div>
            </div>

            {/* Right Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Code className="w-4 h-4" />}
                onClick={() => setView(view === 'showcase' ? 'home' : 'showcase')}
                className="border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800"
              >
                {view === 'showcase' ? 'View Home' : 'Showcase UI'}
              </Button>
              <Button variant="pink" size="sm" onClick={openRegisterModal}>
                Registration Now
              </Button>
            </div>

            {/* Hamburger Icon (Mobile) */}
            <div className="flex md:hidden items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Code className="w-4 h-4" />}
                onClick={() => setView(view === 'showcase' ? 'home' : 'showcase')}
                className="border-slate-200 text-slate-600 px-3 py-1.5"
              />
              <button
                onClick={openMobileMenu}
                className="p-2 rounded-xl hover:bg-slate-100 text-brand-dark cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white shadow-2xl p-6 flex flex-col z-10"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-7 h-7 text-brand-blue" />
                  <span className="font-extrabold text-lg tracking-tight text-brand-dark font-sans">
                    Smart <span className="text-brand-blue">Academy</span>
                  </span>
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-6 mb-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(link.href)
                    }}
                    className="text-lg font-bold tracking-wider text-brand-dark hover:text-brand-pink transition-colors font-sans"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <Button
                  variant="pink"
                  className="w-full"
                  onClick={() => {
                    closeMobileMenu()
                    openRegisterModal()
                  }}
                >
                  Registration Now
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
