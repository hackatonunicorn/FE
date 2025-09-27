import { motion } from 'framer-motion'
import { Building2, Target, BarChart3, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { RevenueChart, IndustryChart } from '@/components/charts'

export function DashboardPageOld() {
  const metrics = [
    {
      title: 'Capital Raised',
      value: '$127.3M',
      change: '+18.2%',
      changeType: 'positive' as const,
      icon: Building2,
      color: 'text-blue-600',
    },
    {
      title: 'Active Startups',
      value: '1,247',
      change: '+15.4%',
      changeType: 'positive' as const,
      icon: Target,
      color: 'text-green-600',
    },
    {
      title: 'Investor Response Rate',
      value: '23.8%',
      change: '+5.2%',
      changeType: 'positive' as const,
      icon: BarChart3,
      color: 'text-purple-600',
    },
    {
      title: 'Deals Closed',
      value: '89',
      change: '+12.1%',
      changeType: 'positive' as const,
      icon: CheckCircle2,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-8 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-xl text-gray-600 mt-2">Overview of your fundraising platform performance</p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gray-50 ${metric.color}`}>
                  <metric.icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <p className={`text-sm font-medium ${
                  metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <RevenueChart />
        <IndustryChart />
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Series A completed', company: 'TechFlow Inc.', time: '2 hours ago', amount: '$15M' },
                { action: 'Investor meeting scheduled', company: 'DataVision', time: '4 hours ago', amount: 'Seed' },
                { action: 'Pitch deck reviewed', company: 'GreenTech', time: '6 hours ago', amount: '$8M' },
                { action: 'AI insights generated', company: 'FinTech Pro', time: '8 hours ago', amount: 'Series B' },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-primary-600">{activity.amount}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
