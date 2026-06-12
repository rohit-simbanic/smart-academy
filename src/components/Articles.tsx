import React from 'react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { useAppStore } from '../store/useAppStore'

export const Articles: React.FC = () => {
  const { openRegisterModal } = useAppStore()

  const posts = [
    {
      title: 'Personalities of enrolling kids in Online Courses',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image:
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: 'Critical thinking: essential skill online learning for kids',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image:
        'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400',
    },
    {
      title: '10 ways of improve the behavior of children learn in home',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image:
        'https://images.unsplash.com/photo-1564982752979-3f7bc974d29a?auto=format&fit=crop&q=80&w=400',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-blue font-sans max-w-xl mx-auto leading-tight">
            Articles And Insight
          </h2>
          <p className="text-slate-400 mt-3 font-body text-sm max-w-md mx-auto">
            Stay updated with educational tips, child psychology, and the latest news from our
            faculty.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Card
              key={index}
              className="flex flex-col h-full bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow group"
            >
              {/* Image */}
              <div className="overflow-hidden aspect-video bg-slate-100 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <h3 className="text-lg font-bold text-brand-blue group-hover:text-brand-pink transition-colors leading-snug font-sans">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed font-body flex-grow">
                  {post.description}
                </p>

                <div className="pt-2">
                  <Button variant="pink" size="sm" onClick={openRegisterModal}>
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
