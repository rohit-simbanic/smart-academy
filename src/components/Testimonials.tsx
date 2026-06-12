import React from 'react'

interface Testimonial {
  name: string
  avatar: string
  avatarBg: string
  text: string
}

const row1Testimonials: Testimonial[] = [
  {
    name: 'Park Jee',
    avatar:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150',
    avatarBg: 'bg-[#b8c9d9]',
    text: 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nlacus laoreet tristique.',
  },
  {
    name: 'Jasmine Vandervort',
    avatar:
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=150',
    avatarBg: 'bg-[#f4a1b8]',
    text: 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nlacus laoreet tristique.',
  },
  {
    name: 'Leo Mercer',
    avatar:
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=150',
    avatarBg: 'bg-[#f8c962]',
    text: 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nlacus laoreet tristique.',
  },
]

const row2Testimonials: Testimonial[] = [
  {
    name: 'Elian Smith',
    avatar:
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=150',
    avatarBg: 'bg-[#a3e4d7]',
    text: 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nlacus laoreet tristique.',
  },
  {
    name: 'Husna mawadus',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    avatarBg: 'bg-[#f1948a]',
    text: 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nlacus laoreet tristique.',
  },
  {
    name: 'Jacob Kozey',
    avatar:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=150',
    avatarBg: 'bg-[#f5b041]',
    text: 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nlacus laoreet tristique.',
  },
]

// Duplicate items for continuous scrolling effect
const dblRow1 = [...row1Testimonials, ...row1Testimonials, ...row1Testimonials, ...row1Testimonials]
const dblRow2 = [...row2Testimonials, ...row2Testimonials, ...row2Testimonials, ...row2Testimonials]

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50/50 overflow-hidden">
      <div className="space-y-12">
        {/* Title */}
        <div className="text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-blue font-sans max-w-xl mx-auto leading-tight">
            Our Testimonial at Smart Academy
          </h2>
        </div>

        {/* Scrolling Container */}
        <div className="flex flex-col gap-6 w-full overflow-hidden relative select-none">
          {/* Fading Edge Overlays */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* Row 1 - Moves Left */}
          <div className="flex w-max-content">
            <div className="flex gap-6 animate-marquee-left pause-hover">
              {dblRow1.map((item, idx) => (
                <TestimonialCard key={`row1-${idx}`} item={item} />
              ))}
            </div>
          </div>

          {/* Row 2 - Moves Right */}
          <div className="flex w-max-content">
            <div className="flex gap-6 animate-marquee-right pause-hover">
              {dblRow2.map((item, idx) => (
                <TestimonialCard key={`row2-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <div className="flex items-center gap-5 p-6 w-[360px] sm:w-[400px] bg-white rounded-[2rem] shadow-sm border border-slate-100 flex-shrink-0">
      {/* Avatar Container with solid background */}
      <div
        className={`w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden ${item.avatarBg}`}
      >
        <img
          src={item.avatar}
          alt={item.name}
          className="w-[85%] h-[85%] rounded-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Text Details */}
      <div className="flex flex-col text-left">
        <h4 className="font-extrabold text-brand-blue text-lg sm:text-xl font-sans mb-1 leading-snug">
          {item.name}
        </h4>
        <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed whitespace-pre-line">
          {item.text}
        </p>
      </div>
    </div>
  )
}
