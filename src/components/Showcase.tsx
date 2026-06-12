import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { Modal } from './ui/Modal'
import { BookOpen, Eye } from 'lucide-react'

export const Showcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleTestClick = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <span className="text-brand-pink font-semibold tracking-wider uppercase text-sm">
            Design System
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-brand-blue mt-2 font-sans">
            Smart Academy Component Showcase
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-base font-body">
            A comprehensive overview of our UI design tokens, responsive components, and custom
            states implemented with Tailwind CSS v4.
          </p>
        </div>

        {/* Colors Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Color Palette</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-brand-pink text-white p-6 rounded-2xl shadow-sm">
              <div className="font-bold">Pink / Accent</div>
              <div className="text-sm opacity-80">#ff2a74</div>
            </div>
            <div className="bg-brand-blue text-white p-6 rounded-2xl shadow-sm">
              <div className="font-bold">Blue / Primary</div>
              <div className="text-sm opacity-80">#0082d4</div>
            </div>
            <div className="bg-brand-dark text-white p-6 rounded-2xl shadow-sm">
              <div className="font-bold">Dark Slate</div>
              <div className="text-sm opacity-80">#0f172a</div>
            </div>
            <div className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="font-bold">Light Slate</div>
              <div className="text-sm text-slate-500">#f8fafc</div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Typography</h2>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <span className="text-xs text-slate-400 font-sans block mb-1">
                Heading 1 - Outfit (Bold, Tight Tracking)
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-dark font-sans leading-none">
                Achieve your future With Smart Academy
              </h1>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-sans block mb-1">
                Heading 2 - Outfit (Semi-Bold)
              </span>
              <h2 className="text-3xl font-bold text-brand-blue font-sans">
                Smart Academy offers services like
              </h2>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-sans block mb-1">
                Body Text - Inter (Regular, Relaxed Line Height)
              </span>
              <p className="text-slate-500 leading-relaxed font-body max-w-3xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Interactive Buttons</h2>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center">
              <div className="text-center space-y-2">
                <span className="text-xs text-slate-400 block mb-2 font-sans">
                  Pink Variant (Default)
                </span>
                <Button variant="pink">Registration Now</Button>
              </div>
              <div className="text-center space-y-2">
                <span className="text-xs text-slate-400 block mb-2 font-sans">Blue Variant</span>
                <Button variant="blue">Learn More</Button>
              </div>
              <div className="text-center space-y-2">
                <span className="text-xs text-slate-400 block mb-2 font-sans">Outline Variant</span>
                <Button variant="outline">Read More</Button>
              </div>
              <div className="text-center space-y-2">
                <span className="text-xs text-slate-400 block mb-2 font-sans">
                  Interactive State
                </span>
                <Button variant="pink" isLoading={isLoading} onClick={handleTestClick}>
                  {isLoading ? 'Loading...' : 'Click to Load'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Card Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 block font-sans">
                Service Card (Pink / Center Icon)
              </span>
              <Card
                variant="service"
                icon={<BookOpen className="w-6 h-6" />}
                iconBg="pink"
                title="Online Course"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
              />
            </div>

            {/* Course Card */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 block font-sans">
                Course Card (Square Image / Hover Scale)
              </span>
              <Card
                variant="course"
                title="Kids Science Course"
                image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=400"
              />
            </div>

            {/* Testimonial Card */}
            <div className="space-y-2">
              <span className="text-xs text-slate-400 block font-sans">
                Testimonial Card (Profile Left / Stars Rating)
              </span>
              <Card
                variant="testimonial"
                authorName="Pat J. Jon"
                authorRole="Parent of Bobby"
                rating={5}
                description="Smart Academy has transformed my child's learning experience. The courses are highly engaging!"
                image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
              />
            </div>
          </div>
        </div>

        {/* Modals & Dialogs */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Modals & Overlays</h2>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center">
            <p className="text-slate-500 mb-6 font-body">
              Click the button below to test the backdrop overlay and entrance animation of the
              responsive Modal component.
            </p>
            <Button
              variant="blue"
              leftIcon={<Eye className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Launch Test Modal
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Interactive Showcase Modal"
            >
              <div className="space-y-4">
                <p className="text-slate-600 font-body">
                  Hello! This modal overlays the page using a blur backdrop. It supports keyboard
                  accessibility (Close via ESC key) and layout locking.
                </p>
                <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                    Close
                  </Button>
                  <Button variant="pink" onClick={() => setIsModalOpen(false)}>
                    Submit Details
                  </Button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
