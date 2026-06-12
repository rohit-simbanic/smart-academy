import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppStore } from '../store/useAppStore'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'
import { CheckCircle2 } from 'lucide-react'
import { COURSES as COURSES_DATA } from '../constants/courses'

// Define validation schema using Zod
const registerSchema = z.object({
  childName: z.string().min(2, "Child's name must be at least 2 characters"),
  parentName: z.string().min(2, "Parent's name must be at least 2 characters"),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g., +1234567890)'),
  childAge: z
    .number()
    .refine((val) => !isNaN(val), { message: 'Age is required' })
    .refine((val) => val >= 2, { message: 'Age must be at least 2' })
    .refine((val) => val <= 18, { message: 'Age must be 18 or under' }),
  course: z.string().min(1, 'Please select a course'),
})

type RegisterFormValues = z.infer<typeof registerSchema>

const COURSES = COURSES_DATA.map((c) => c.title)

export const RegisterModal: React.FC = () => {
  const { isRegisterModalOpen, closeRegisterModal } = useAppStore()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      childName: '',
      parentName: '',
      email: '',
      phone: '',
      childAge: '' as unknown as number,
      course: '',
    },
  })

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true)
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Registration details:', data)
    setLoading(false)
    setIsSubmitted(true)
  }

  const handleClose = () => {
    closeRegisterModal()
    // Reset success state and form after a brief delay
    setTimeout(() => {
      setIsSubmitted(false)
      reset()
    }, 300)
  }

  return (
    <Modal
      isOpen={isRegisterModalOpen}
      onClose={handleClose}
      title={isSubmitted ? '' : 'Registration Now'}
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
          <h3 className="text-2xl font-bold text-brand-blue font-sans">Registration Successful!</h3>
          <p className="text-slate-500 max-w-sm font-body">
            Thank you for enrolling! We have received your inquiry and our academic advisor will
            contact you within 24 hours.
          </p>
          <Button variant="pink" size="md" className="mt-4" onClick={handleClose}>
            Back to Home
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <p className="text-slate-500 text-sm font-body mb-4">
            Ignite your child's potential! Register today and get a free trial class.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Parent Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                Parent's Name
              </label>
              <input
                type="text"
                {...register('parentName')}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-pink transition-colors font-body text-sm bg-slate-50/50"
              />
              {errors.parentName && (
                <span className="text-xs text-brand-pink mt-1 font-body">
                  {errors.parentName.message}
                </span>
              )}
            </div>

            {/* Child's Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                Child's Name
              </label>
              <input
                type="text"
                {...register('childName')}
                placeholder="Enter child's name"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-pink transition-colors font-body text-sm bg-slate-50/50"
              />
              {errors.childName && (
                <span className="text-xs text-brand-pink mt-1 font-body">
                  {errors.childName.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                Parent's Email
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="Enter email address"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-pink transition-colors font-body text-sm bg-slate-50/50"
              />
              {errors.email && (
                <span className="text-xs text-brand-pink mt-1 font-body">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                Phone Number
              </label>
              <input
                type="tel"
                {...register('phone')}
                placeholder="e.g. +1234567890"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-pink transition-colors font-body text-sm bg-slate-50/50"
              />
              {errors.phone && (
                <span className="text-xs text-brand-pink mt-1 font-body">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                Child's Age
              </label>
              <input
                type="number"
                {...register('childAge', { valueAsNumber: true })}
                placeholder="Age (2-18)"
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-pink transition-colors font-body text-sm bg-slate-50/50"
              />
              {errors.childAge && (
                <span className="text-xs text-brand-pink mt-1 font-body">
                  {errors.childAge.message}
                </span>
              )}
            </div>

            {/* Course Select */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">
                Choose Course
              </label>
              <select
                {...register('course')}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:border-brand-pink transition-colors font-body text-sm bg-slate-50/50 appearance-none cursor-pointer"
              >
                <option value="">Select a course</option>
                {COURSES.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              {errors.course && (
                <span className="text-xs text-brand-pink mt-1 font-body">
                  {errors.course.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="pink" type="submit" isLoading={loading}>
              Submit Registration
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
