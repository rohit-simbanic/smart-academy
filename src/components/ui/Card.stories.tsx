import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { GraduationCap, BookOpen } from 'lucide-react'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <div>
        <h3 className="text-lg font-bold mb-2">Standard Card</h3>
        <p className="text-slate-600">This is a default styled card block.</p>
      </div>
    ),
  },
}

export const ServiceBlue: Story = {
  args: {
    variant: 'service',
    icon: <GraduationCap className="w-6 h-6" />,
    iconBg: 'blue',
    title: 'Teacher Training',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  },
}

export const ServicePink: Story = {
  args: {
    variant: 'service',
    icon: <BookOpen className="w-6 h-6" />,
    iconBg: 'pink',
    title: 'Online Course',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  },
}

export const CourseCard: Story = {
  args: {
    variant: 'course',
    title: 'Kids Science Course',
    image:
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400',
  },
}

export const TestimonialCard: Story = {
  args: {
    variant: 'testimonial',
    authorName: 'Pat J. Jon',
    authorRole: 'Parent of Bobby',
    rating: 5,
    description:
      "Smart Academy has transformed my child's learning experience. The courses are highly engaging and interactive!",
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
}
