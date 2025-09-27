import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'elevated' | 'glass'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  interactive?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    hover = false,
    interactive = false,
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200 shadow-soft',
      outline: 'bg-white border-2 border-gray-200',
      elevated: 'bg-white border border-gray-200 shadow-medium',
      glass: 'glass border border-white/20',
    }

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg transition-all duration-200',
          variants[variant],
          paddings[padding],
          hover && 'hover:shadow-medium hover:-translate-y-0.5',
          interactive && 'cursor-pointer hover:shadow-medium hover:-translate-y-0.5 active:translate-y-0',
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, padding = 'md', ...props }, ref) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-1.5',
          padding !== 'none' && paddings[padding],
          className
        )}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: 'sm' | 'md' | 'lg'
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'text-base font-semibold',
      md: 'text-lg font-semibold',
      lg: 'text-xl font-semibold',
    }

    return (
      <h3
        ref={ref}
        className={cn(
          'leading-none tracking-tight text-gray-900',
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'md'
}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'text-xs',
      md: 'text-sm',
    }

    return (
      <p
        ref={ref}
        className={cn(
          'text-gray-600',
          sizes[size],
          className
        )}
        {...props}
      />
    )
  }
)

CardDescription.displayName = 'CardDescription'

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, padding = 'md', ...props }, ref) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          padding !== 'none' && paddings[padding],
          className
        )}
        {...props}
      />
    )
  }
)

CardContent.displayName = 'CardContent'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, padding = 'md', ...props }, ref) => {
    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center border-t border-gray-100',
          padding !== 'none' && paddings[padding],
          className
        )}
        {...props}
      />
    )
  }
)

CardFooter.displayName = 'CardFooter'