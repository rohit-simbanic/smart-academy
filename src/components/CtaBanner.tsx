import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from './ui/Button'
import { Check } from 'lucide-react'

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type SubscribeFormValues = z.infer<typeof subscribeSchema>

export const CtaBanner: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: { email: '' },
  })

  const onSubmit = async (data: SubscribeFormValues) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    console.log('Subscribed email:', data.email)
    setLoading(false)
    setSubscribed(true)
    reset()
    setTimeout(() => setSubscribed(false), 4000) // reset success state
  }

  return (
    <section className="bg-brand-pink py-16 text-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans leading-tight">
          Ignite Your Child's Potential Take{' '}
          <span className="block mt-1">the Leap with an Online Course</span>
        </h2>

        {subscribed ? (
          <div className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 max-w-md mx-auto animate-fade-in">
            <Check className="w-5 h-5 text-brand-blue" />
            <span className="font-bold text-sm font-sans">
              Thank you! You have successfully registered.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-col sm:flex-row items-stretch justify-center max-w-lg mx-auto gap-3">
              <div className="flex-grow flex flex-col text-left">
                <input
                  type="email"
                  {...register('email')}
                  placeholder="Your email address..."
                  className="w-full px-6 py-3 rounded-full text-slate-800 placeholder-slate-400 bg-white focus:outline-none border-2 border-transparent focus:border-brand-blue font-body"
                />
              </div>
              <Button
                type="submit"
                variant="blue"
                isLoading={loading}
                className="rounded-full px-8 py-3 whitespace-nowrap shadow-md"
              >
                Register
              </Button>
            </div>
            {errors.email && (
              <span className="block text-xs font-bold text-white/90 animate-pulse pt-1">
                {errors.email.message}
              </span>
            )}
          </form>
        )}
      </div>

      {/* Visual background patterns */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
    </section>
  )
}
