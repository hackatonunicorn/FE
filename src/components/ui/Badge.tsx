import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
  removable?: boolean
  onRemove?: () => void
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    dot = false,
    removable = false,
    onRemove,
    children,
    ...props 
  }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-primary-100 text-primary-800',
      secondary: 'bg-secondary-100 text-secondary-800',
      success: 'bg-success-100 text-success-800',
      warning: 'bg-warning-100 text-warning-800',
      error: 'bg-error-100 text-error-800',
      outline: 'border border-gray-300 bg-transparent text-gray-700',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
      lg: 'px-3 py-1.5 text-sm',
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 font-medium rounded-full transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <div className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'default' && 'bg-gray-400',
            variant === 'primary' && 'bg-primary-500',
            variant === 'secondary' && 'bg-secondary-500',
            variant === 'success' && 'bg-success-500',
            variant === 'warning' && 'bg-warning-500',
            variant === 'error' && 'bg-error-500',
            variant === 'outline' && 'bg-gray-400'
          )} />
        )}
        
        {children}
        
        {removable && onRemove && (
          <button
            onClick={onRemove}
            className={cn(
              'ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors',
              'focus:outline-none focus:ring-1 focus:ring-offset-1',
              variant === 'default' && 'focus:ring-gray-400',
              variant === 'primary' && 'focus:ring-primary-400',
              variant === 'secondary' && 'focus:ring-secondary-400',
              variant === 'success' && 'focus:ring-success-400',
              variant === 'warning' && 'focus:ring-warning-400',
              variant === 'error' && 'focus:ring-error-400',
              variant === 'outline' && 'focus:ring-gray-400'
            )}
            aria-label="Remove badge"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

// Status Badge Component
interface StatusBadgeProps {
  status: 'online' | 'offline' | 'away' | 'busy' | 'pending' | 'approved' | 'rejected'
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig = {
    online: { variant: 'success' as const, label: 'Online' },
    offline: { variant: 'default' as const, label: 'Offline' },
    away: { variant: 'warning' as const, label: 'Away' },
    busy: { variant: 'error' as const, label: 'Busy' },
    pending: { variant: 'warning' as const, label: 'Pending' },
    approved: { variant: 'success' as const, label: 'Approved' },
    rejected: { variant: 'error' as const, label: 'Rejected' },
  }

  const config = statusConfig[status]

  return (
    <Badge 
      variant={config.variant} 
      dot 
      size="sm"
      className={className}
    >
      {config.label}
    </Badge>
  )
}
