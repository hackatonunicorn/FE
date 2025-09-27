import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Users, Building2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export function HomePage() {
  const stats = [
    {
      title: 'Total Companies',
      value: '1,234',
      change: '+12%',
      icon: Building2,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      title: 'Active Rounds',
      value: '89',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
    {
      title: 'Total Investors',
      value: '456',
      change: '+15%',
      icon: Users,
      color: 'text-accent-600',
      bgColor: 'bg-accent-50',
    },
    {
      title: 'AI Insights',
      value: '2,847',
      change: '+23%',
      icon: Sparkles,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="h-16 w-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-secondary-900 mb-4">
          Welcome to Unicorn
        </h1>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
          Your AI-powered fundraising platform for modern startups. Get insights, connect with investors, and grow your business.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm font-medium text-success-600">
                    {stat.change}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary-600">
                  {stat.title}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 text-left border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
                <Building2 className="h-6 w-6 text-primary-600 mb-2" />
                <div className="font-medium text-secondary-900">Add Company</div>
                <div className="text-sm text-secondary-600">Register a new company</div>
              </button>
              <button className="p-4 text-left border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
                <TrendingUp className="h-6 w-6 text-success-600 mb-2" />
                <div className="font-medium text-secondary-900">Start Fundraising</div>
                <div className="text-sm text-secondary-600">Launch a new round</div>
              </button>
              <button className="p-4 text-left border border-secondary-200 rounded-lg hover:bg-secondary-50 transition-colors">
                <Sparkles className="h-6 w-6 text-accent-600 mb-2" />
                <div className="font-medium text-secondary-900">AI Insights</div>
                <div className="text-sm text-secondary-600">Get recommendations</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
