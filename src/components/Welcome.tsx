import React from 'react'
import { Button } from './ui/Button'
import { useAppStore } from '../store/useAppStore'

export const Welcome: React.FC = () => {
  const { openRegisterModal } = useAppStore()

  const stats = [
    { value: '10+', label: 'Years Established' },
    { value: '20+', label: 'Total Course' },
    { value: '50k+', label: 'Student Active' },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
          {/* Left: Text intro */}
          <div className="space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-blue font-sans leading-tight">
              Welcome to <span className="block text-brand-pink">Smart Academy</span>
            </h2>
            <p className="text-slate-500 font-body leading-relaxed">
              We provide a nurturing, fun, and highly educational space for children to explore
              science, art, cooking, and academic excellence. Our courses are designed by child
              experts to foster critical thinking and practical skills.
            </p>
            <Button variant="pink" size="md" onClick={openRegisterModal}>
              Read More
            </Button>
          </div>

          {/* Center: Arched Boy Photo */}
          <div className="flex justify-center relative">
            {/* Outer pink arch outline/border */}
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] arch-clip bg-brand-pink p-1.5 shadow-lg">
              {/* Inner container */}
              <div className="w-full h-full arch-clip bg-brand-light overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=600"
                  alt="Smart Academy Student"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Right: Mission and Stats */}
          <div className="space-y-8 text-left lg:pl-4">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-brand-blue font-sans">Our Mission</h3>
              <p className="text-slate-500 font-body leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              {stats.map((stat, i) => (
                <div key={i} className="text-center space-y-1">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-brand-blue font-sans">
                    {stat.value}
                  </span>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider font-body leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
