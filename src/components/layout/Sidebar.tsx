import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import {
  Home,
  Settings,
  Sparkles,
  User,
  Target,
  LogOut,
  ChevronDown,
  Brain
} from 'lucide-react'
import { NavItem } from '@/types'

const navigation: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/app/dashboard',
    icon: Home,
  },
  {
    label: 'Campaigns',
    href: '/app/campaigns',
    icon: Target,
  },
  {
    label: 'Pitch Simulator',
    href: '/app/pitch-simulator',
    icon: Brain,
  },
  {
    label: 'Settings',
    href: '/app/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      // Handle logout logic here
      alert('Logged out successfully')
      // You can redirect to login page or clear session
      // window.location.href = '/auth/signin'
    }
  }

  const userMenuItems = [
    {
      label: 'Account Settings',
      icon: Settings,
      action: () => {
        // Navigate to settings page
        window.location.href = '/app/settings'
      }
    },
    {
      label: 'Logout',
      icon: LogOut,
      action: handleLogout,
      className: 'text-red-600 hover:text-red-700'
    }
  ]

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  return (
    <div className="w-64 bg-white shadow-soft border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center px-6 py-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center shadow-glow">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Unicorn</h1>
              <p className="text-xs text-gray-500">AI Fundraising</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500 shadow-soft'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 btn-hover-lift'
                }`
              }
            >
              <div className="flex items-center space-x-3">
                {item.icon && <item.icon className="h-5 w-5" />}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-medium bg-secondary-100 text-secondary-700 rounded-full animate-pulse-slow">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@unicorn.com</p>
              </div>
              <ChevronDown 
                className={`h-4 w-4 text-gray-400 hover:text-gray-600 transition-all duration-200 ${
                  isUserMenuOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  {userMenuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.action()
                        setIsUserMenuOpen(false)
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        item.className || 'text-gray-700'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
