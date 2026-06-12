import { GraduationCap, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import { COURSES } from '../constants/courses'

export const Footer: React.FC = () => {
  const { setView } = useAppStore()

  const socialIcons = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com' },
    { icon: <Youtube className="w-5 h-5" />, href: 'urn:youtube' },
  ]

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Featured Courses', href: '#courses' },
    { label: 'Terms & Conditions', href: '#terms' },
  ]

  const coursesLinks = COURSES.slice(0, 4).map((c) => ({
    label: c.title,
    href: '#courses',
  }))

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href === '#terms') {
      setView('terms')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setView('home')
      setTimeout(() => {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 50)
    }
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-brand-blue text-white pt-16 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10 text-left">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-9 h-9 text-white" />
              <span className="font-extrabold text-2xl tracking-tight font-sans">
                Smart Academy
              </span>
            </div>
            <p className="text-white/80 text-sm font-body leading-relaxed max-w-sm">
              Smart Academy is a place where children can learn, play, and grow in a safe,
              supportive and stimulating environment.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:bg-white hover:text-brand-blue hover:border-white transition-all hover:scale-105 duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 md:pl-10">
            <h3 className="text-lg font-bold font-sans uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 font-body text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-transform"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Courses Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-sans uppercase tracking-wider">Courses</h3>
            <ul className="space-y-3 font-body text-sm">
              {coursesLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-transform"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-sm text-white/70">
          <p className="font-body">
            © {new Date().getFullYear()} Smart Academy. All rights reserved.
          </p>
          <button
            onClick={handleScrollTop}
            className="mt-4 sm:mt-0 flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}
