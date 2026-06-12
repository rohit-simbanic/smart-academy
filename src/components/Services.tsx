import React from 'react'
import { Card } from './ui/Card'
import { Button } from './ui/Button'
import { useAppStore } from '../store/useAppStore'
import { Users, Laptop, Award, Monitor } from 'lucide-react'

export const Services: React.FC = () => {
  const { openRegisterModal } = useAppStore()

  const services = [
    {
      icon: <Users className="w-6 h-6" />,
      iconBg: 'blue' as const,
      title: 'Teacher Training',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      iconBg: 'pink' as const,
      title: 'Online Course',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      iconBg: 'blue' as const,
      title: 'Certificate Course',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      iconBg: 'pink' as const,
      title: 'Digital Class',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
    },
  ]

  return (
    <section className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-brand-blue font-sans max-w-xl mx-auto leading-tight">
            Smart Academy offers services like
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              variant="service"
              icon={service.icon}
              iconBg={service.iconBg}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        {/* Read More Button */}
        <div className="flex justify-center pt-4">
          <Button variant="pink" size="md" onClick={openRegisterModal}>
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
