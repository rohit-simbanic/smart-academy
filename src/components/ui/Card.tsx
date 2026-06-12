import React from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export interface CardProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  variant?: 'default' | 'service' | 'course' | 'testimonial'
  image?: string
  icon?: React.ReactNode
  iconBg?: 'pink' | 'blue'
  title?: string
  description?: string
  rating?: number
  authorName?: string
  authorRole?: string
  children?: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = 'default',
  image,
  icon,
  iconBg = 'blue',
  title,
  description,
  rating,
  authorName,
  authorRole,
  children,
  ...props
}) => {
  const baseCardStyles = 'bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden'

  // Render based on variant
  if (variant === 'service') {
    return (
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}
        className={twMerge(
          clsx(
            baseCardStyles,
            'flex flex-col items-center text-center p-8 transition-shadow',
            className,
          ),
        )}
        {...props}
      >
        <div
          className={clsx(
            'flex items-center justify-center w-14 h-14 rounded-2xl mb-5 text-white',
            iconBg === 'pink' ? 'bg-brand-pink' : 'bg-brand-blue',
          )}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-brand-blue mb-3 font-sans">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed font-body">{description}</p>
        {children}
      </motion.div>
    )
  }

  if (variant === 'course') {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        className={twMerge(clsx('flex flex-col group cursor-pointer', className))}
        {...props}
      >
        <div className="overflow-hidden rounded-3xl mb-4 aspect-square bg-slate-100 border border-slate-100 shadow-sm relative">
          {image ? (
            <img
              src={image}
              alt={title || 'Course Image'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </div>
        <h4 className="text-lg font-bold text-brand-blue text-center group-hover:text-brand-pink transition-colors font-sans px-2">
          {title}
        </h4>
        {children}
      </motion.div>
    )
  }

  if (variant === 'testimonial') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={twMerge(
          clsx(baseCardStyles, 'flex items-start gap-4 p-6 md:p-8 max-w-md mx-auto', className),
        )}
        {...props}
      >
        <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden border-2 border-brand-pink/20 bg-slate-100">
          {image ? (
            <img
              src={image}
              alt={authorName || 'User'}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-slate-200" />
          )}
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-brand-blue text-lg font-sans leading-none">
              {authorName}
            </h4>
            {rating && (
              <div className="flex items-center gap-0.5 text-amber-400">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            )}
          </div>
          {authorRole && (
            <span className="text-xs text-slate-400 font-sans block mb-3">{authorRole}</span>
          )}
          <p className="text-slate-500 text-sm leading-relaxed font-body italic">"{description}"</p>
          {children}
        </div>
      </motion.div>
    )
  }

  // Default card
  return (
    <motion.div className={twMerge(clsx(baseCardStyles, 'p-6', className))} {...props}>
      {children}
    </motion.div>
  )
}
