import { ReactNode, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utils'

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  size?: 'sm' | 'md' | 'lg'
  closeOnSelect?: boolean
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

export function Dropdown({
  trigger,
  children,
  placement = 'bottom-start',
  size = 'md',
  closeOnSelect = true,
  className,
  triggerClassName,
  contentClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const sizes = {
    sm: 'min-w-32',
    md: 'min-w-48',
    lg: 'min-w-64',
  }

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return

    const triggerRect = triggerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth

    let top = triggerRect.bottom + 8
    let left = triggerRect.left

    // Adjust position based on placement
    switch (placement) {
      case 'bottom-start':
        top = triggerRect.bottom + 8
        left = triggerRect.left
        break
      case 'bottom-end':
        top = triggerRect.bottom + 8
        left = triggerRect.right
        break
      case 'top-start':
        top = triggerRect.top - 8
        left = triggerRect.left
        break
      case 'top-end':
        top = triggerRect.top - 8
        left = triggerRect.right
        break
    }

    // Ensure dropdown stays within viewport
    if (top + 200 > viewportHeight && placement.includes('bottom')) {
      top = triggerRect.top - 8
    }
    if (left + 200 > viewportWidth) {
      left = viewportWidth - 200 - 16
    }
    if (left < 16) {
      left = 16
    }

    setPosition({ top, left })
  }, [isOpen, placement])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleTriggerClick = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = () => {
    if (closeOnSelect) {
      setIsOpen(false)
    }
  }

  return (
    <div className={cn('relative', className)}>
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        className={cn('cursor-pointer', triggerClassName)}
      >
        {trigger}
      </div>

      {isOpen && createPortal(
        <div
          ref={contentRef}
          className="fixed z-50"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: placement.includes('end') ? 'translateX(-100%)' : undefined,
          }}
        >
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'bg-white border border-gray-200 rounded-lg shadow-soft overflow-hidden',
                sizes[size],
                contentClassName
              )}
            >
              <div onClick={handleItemClick}>
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>,
        document.body
      )}
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  icon?: ReactNode
  shortcut?: string
  className?: string
}

export function DropdownItem({
  children,
  onClick,
  disabled = false,
  icon,
  shortcut,
  className,
}: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors flex items-center gap-3',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
      {shortcut && (
        <span className="text-xs text-gray-400 font-mono">{shortcut}</span>
      )}
    </button>
  )
}

interface DropdownSeparatorProps {
  className?: string
}

export function DropdownSeparator({ className }: DropdownSeparatorProps) {
  return <div className={cn('h-px bg-gray-200 my-1', className)} />
}

interface DropdownLabelProps {
  children: ReactNode
  className?: string
}

export function DropdownLabel({ children, className }: DropdownLabelProps) {
  return (
    <div className={cn('px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider', className)}>
      {children}
    </div>
  )
}

interface DropdownContentProps {
  children: ReactNode
  className?: string
}

export function DropdownContent({ children, className }: DropdownContentProps) {
  return (
    <div className={cn('py-1', className)}>
      {children}
    </div>
  )
}
