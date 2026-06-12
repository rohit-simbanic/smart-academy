import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'
import { ArrowRight, Mail } from 'lucide-react'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pink', 'blue', 'outline', 'text'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Pink: Story = {
  args: {
    variant: 'pink',
    children: 'Register Now',
  },
}

export const Blue: Story = {
  args: {
    variant: 'blue',
    children: 'Learn More',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Read More',
  },
}

export const WithLeftIcon: Story = {
  args: {
    variant: 'pink',
    leftIcon: <Mail className="w-4 h-4" />,
    children: 'Email Us',
  },
}

export const WithRightIcon: Story = {
  args: {
    variant: 'blue',
    rightIcon: <ArrowRight className="w-4 h-4" />,
    children: 'Get Started',
  },
}

export const Loading: Story = {
  args: {
    variant: 'pink',
    isLoading: true,
    children: 'Submitting',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'pink',
    disabled: true,
    children: 'Unavailable',
  },
}
