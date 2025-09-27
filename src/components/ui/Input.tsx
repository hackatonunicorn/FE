import { InputHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  leftElement?: ReactNode
  rightElement?: ReactNode
  variant?: 'default' | 'filled' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    leftElement,
    rightElement,
    variant = 'default',
    size = 'md',
    fullWidth,
    disabled,
    id,
    ...props
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const baseStyles = 'w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      default: 'border border-gray-300 rounded-lg bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
      filled: 'border-0 rounded-lg bg-gray-100 focus:bg-white focus:ring-2 focus:ring-primary-500/20',
      underline: 'border-0 border-b-2 border-gray-300 bg-transparent rounded-none focus:border-primary-500 focus:ring-0',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    }

    const errorStyles = error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20'
    const disabledStyles = disabled && 'bg-gray-50 cursor-not-allowed'

    return (
      <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          {leftElement && (
            <div className="absolute left-0 top-0 h-full flex items-center pointer-events-none">
              {leftElement}
            </div>
          )}
          
          <input
            id={inputId}
            type={type}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              errorStyles,
              disabledStyles,
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              leftElement && 'pl-12',
              rightElement && 'pr-12',
              className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
          
          {rightElement && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div className="text-sm">
            {error && (
              <span className="text-error-600 flex items-center gap-1">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </span>
            )}
            {!error && helperText && (
              <span className="text-gray-500">{helperText}</span>
            )}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
