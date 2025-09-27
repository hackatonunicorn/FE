import { Search, Bell, Settings, User } from 'lucide-react'
import { useTheme } from '@/hooks'
import { Theme } from '@/types'

export function Header() {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'light') return 'dark'
      if (current === 'dark') return 'system'
      return 'light'
    })
  }

  return (
    <header className="bg-white shadow-soft border-b border-gray-200">
      <div className="flex items-center justify-end px-6 py-4">
        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors btn-hover-lift"
            title={`Current theme: ${theme}`}
          >
            {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '💻'}
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors btn-hover-lift">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-error-500 rounded-full animate-ping"></span>
          </button>
        </div>
      </div>
    </header>
  )
}
