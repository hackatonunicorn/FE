import { motion } from 'framer-motion'
import { 
  Sparkles, 
  TrendingUp, 
  Users, 
  Building2, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Info
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@/components/ui'

export function DesignSystemPage() {
  const colors = [
    { name: 'Primary Blue', class: 'bg-primary-500', hex: '#3b82f6' },
    { name: 'Secondary Violet', class: 'bg-secondary-500', hex: '#8b5cf6' },
    { name: 'Success Emerald', class: 'bg-success-500', hex: '#10b981' },
    { name: 'Warning Amber', class: 'bg-warning-500', hex: '#f59e0b' },
    { name: 'Error Red', class: 'bg-error-500', hex: '#ef4444' },
    { name: 'Gray 500', class: 'bg-gray-500', hex: '#64748b' },
  ]

  const shadows = [
    { name: 'Soft', class: 'shadow-soft' },
    { name: 'Soft Large', class: 'shadow-soft-lg' },
    { name: 'Medium', class: 'shadow-medium' },
    { name: 'Hard', class: 'shadow-hard' },
    { name: 'Glow', class: 'shadow-glow' },
    { name: 'Glow Secondary', class: 'shadow-glow-secondary' },
  ]

  const animations = [
    { name: 'Fade In', class: 'animate-fade-in' },
    { name: 'Slide Up', class: 'animate-slide-up' },
    { name: 'Scale In', class: 'animate-scale-in' },
    { name: 'Bounce In', class: 'animate-bounce-in' },
    { name: 'Float', class: 'animate-float' },
    { name: 'Pulse Slow', class: 'animate-pulse-slow' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Design System
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Professional B2B SaaS design system with modern components and utilities
        </p>
      </motion.div>

      {/* Color Palette */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {colors.map((color, index) => (
                <motion.div
                  key={color.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 ${color.class} rounded-lg mx-auto mb-2 shadow-medium`}></div>
                  <p className="text-sm font-medium text-gray-900">{color.name}</p>
                  <p className="text-xs text-gray-500">{color.hex}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Shadow System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Shadow System</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {shadows.map((shadow, index) => (
                <motion.div
                  key={shadow.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-white rounded-lg mx-auto mb-2 ${shadow.class}`}></div>
                  <p className="text-sm font-medium text-gray-900">{shadow.name}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Button Variants */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Button Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" className="btn-hover-lift">Primary</Button>
              <Button variant="secondary" className="btn-hover-lift">Secondary</Button>
              <Button variant="outline" className="btn-hover-glow">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button isLoading>Loading</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Animation Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Animations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {animations.map((animation, index) => (
                <motion.div
                  key={animation.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-primary-100 rounded-lg mx-auto mb-2 ${animation.class} flex items-center justify-center`}>
                    <Sparkles className="h-6 w-6 text-primary-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{animation.name}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Glassmorphism Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Glassmorphism Effects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative h-full flex items-center justify-center space-x-8">
                <div className="glass rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Glass Card</h3>
                  <p className="text-white/80">Beautiful glassmorphism effect</p>
                </div>
                <div className="glass-dark rounded-lg p-6 text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Dark Glass</h3>
                  <p className="text-white/80">Dark glassmorphism variant</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Status Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Status Indicators</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-success-500" />
                <span className="text-sm font-medium text-gray-900">Success</span>
              </div>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-warning-500" />
                <span className="text-sm font-medium text-gray-900">Warning</span>
              </div>
              <div className="flex items-center space-x-3">
                <XCircle className="h-6 w-6 text-error-500" />
                <span className="text-sm font-medium text-gray-900">Error</span>
              </div>
              <div className="flex items-center space-x-3">
                <Info className="h-6 w-6 text-primary-500" />
                <span className="text-sm font-medium text-gray-900">Info</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Interactive Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary-600" />
                </div>
                <CardTitle>Companies</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Manage your company portfolio</p>
              <Button variant="outline" size="sm" className="btn-hover-glow">
                View Details
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-success-600" />
                </div>
                <CardTitle>Analytics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Track your fundraising progress</p>
              <Button variant="outline" size="sm" className="btn-hover-glow">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <Users className="h-5 w-5 text-secondary-600" />
                </div>
                <CardTitle>Investors</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Connect with potential investors</p>
              <Button variant="outline" size="sm" className="btn-hover-glow">
                Find Investors
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
