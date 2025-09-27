import { HTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/utils'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fallback?: ReactNode
  status?: 'online' | 'offline' | 'away' | 'busy'
  shape?: 'circle' | 'square'
  bordered?: boolean
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({
    src,
    alt = 'Avatar',
    size = 'md',
    fallback,
    status,
    shape = 'circle',
    bordered = false,
    className,
    ...props
  }, ref) => {
    const sizes = {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
      xl: 'h-16 w-16 text-lg',
    }

    const statusSizes = {
      xs: 'h-1.5 w-1.5',
      sm: 'h-2 w-2',
      md: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
      xl: 'h-4 w-4',
    }

    const statusColors = {
      online: 'bg-success-500',
      offline: 'bg-gray-400',
      away: 'bg-warning-500',
      busy: 'bg-error-500',
    }

    const statusPositions = {
      xs: 'bottom-0 right-0',
      sm: 'bottom-0 right-0',
      md: 'bottom-0 right-0',
      lg: 'bottom-0.5 right-0.5',
      xl: 'bottom-1 right-1',
    }

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    const renderFallback = () => {
      if (fallback) return fallback
      if (alt) return getInitials(alt)
      return '?'
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-medium text-gray-700 bg-gray-100 overflow-hidden',
          sizes[size],
          shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          bordered && 'ring-2 ring-white shadow-soft',
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                parent.innerHTML = `<span>${renderFallback()}</span>`
              }
            }}
          />
        ) : (
          <span>{renderFallback()}</span>
        )}
        
        {status && (
          <span
            className={cn(
              'absolute rounded-full border-2 border-white',
              statusSizes[size],
              statusColors[status],
              statusPositions[size]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

// Avatar Group Component
interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  spacing?: 'tight' | 'normal' | 'loose'
}

export function AvatarGroup({ 
  children, 
  max = 5, 
  size = 'md',
  spacing = 'normal',
  className,
  ...props 
}: AvatarGroupProps) {
  const spacingClasses = {
    tight: '-space-x-2',
    normal: '-space-x-1',
    loose: 'space-x-1',
  }

  const childrenArray = Array.isArray(children) ? children : [children]
  const visibleChildren = childrenArray.slice(0, max)
  const remainingCount = childrenArray.length - max

  return (
    <div
      className={cn(
        'flex items-center',
        spacing !== 'loose' && spacingClasses[spacing],
        className
      )}
      {...props}
    >
      {visibleChildren}
      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center font-medium text-gray-700 bg-gray-200 border-2 border-white',
            size === 'xs' && 'h-6 w-6 text-xs',
            size === 'sm' && 'h-8 w-8 text-sm',
            size === 'md' && 'h-10 w-10 text-sm',
            size === 'lg' && 'h-12 w-12 text-base',
            size === 'xl' && 'h-16 w-16 text-lg',
            'rounded-full'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}
