import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Modal } from './Modal'
import { Button } from './Button'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

const ModalWrapper = (args: Omit<React.ComponentProps<typeof Modal>, 'isOpen' | 'onClose'>) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="space-y-4">
          <p className="text-slate-600">
            This is a fully styled and animated modal dialog. It is built using Framer Motion and
            uses React Portals for layout isolation.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="pink" onClick={() => setIsOpen(false)}>
              Confirm Actions
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Registration Form',
  },
}
