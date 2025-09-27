import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export interface ChartDataPoint {
  date: string
  responseRate: number
  emailsSent: number
  meetingsScheduled: number
  pipelineValue: number
}

interface PerformanceChartProps {
  data: ChartDataPoint[]
  title?: string
  showArea?: boolean
  height?: number
  className?: string
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg"
      >
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Response Rate:</span>
            <span className="text-sm font-semibold text-primary-600">{data.responseRate}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Emails Sent:</span>
            <span className="text-sm font-semibold text-gray-900">{data.emailsSent}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Meetings:</span>
            <span className="text-sm font-semibold text-gray-900">{data.meetingsScheduled}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Pipeline:</span>
            <span className="text-sm font-semibold text-gray-900">${(data.pipelineValue / 1000).toFixed(0)}K</span>
          </div>
        </div>
      </motion.div>
    )
  }
  return null
}

export function PerformanceChart({
  data,
  title = 'Performance Overview',
  showArea = false,
  height = 300,
  className = ''
}: PerformanceChartProps) {
  const [selectedMetric, setSelectedMetric] = useState<'responseRate' | 'emailsSent' | 'meetingsScheduled' | 'pipelineValue'>('responseRate')

  const metrics = [
    {
      key: 'responseRate' as const,
      label: 'Response Rate',
      color: '#3B82F6',
      icon: TrendingUp,
      unit: '%',
      format: (value: number) => `${value}%`
    },
    {
      key: 'emailsSent' as const,
      label: 'Emails Sent',
      color: '#10B981',
      icon: BarChart3,
      unit: '',
      format: (value: number) => value.toString()
    },
    {
      key: 'meetingsScheduled' as const,
      label: 'Meetings',
      color: '#8B5CF6',
      icon: TrendingUp,
      unit: '',
      format: (value: number) => value.toString()
    },
    {
      key: 'pipelineValue' as const,
      label: 'Pipeline Value',
      color: '#F59E0B',
      icon: TrendingUp,
      unit: 'K',
      format: (value: number) => `$${(value / 1000).toFixed(0)}K`
    }
  ]

  const selectedMetricConfig = metrics.find(m => m.key === selectedMetric)
  const latestData = data[data.length - 1]
  const previousData = data[data.length - 2]
  
  const currentValue = latestData?.[selectedMetric] || 0
  const previousValue = previousData?.[selectedMetric] || 0
  const change = currentValue - previousValue
  const changePercent = previousValue > 0 ? ((change / previousValue) * 100) : 0

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(changePercent).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Metric Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const isSelected = selectedMetric === metric.key
            const value = latestData?.[metric.key] || 0
            
            return (
              <motion.button
                key={metric.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedMetric(metric.key)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 text-left
                  ${isSelected 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon className="h-4 w-4" style={{ color: metric.color }} />
                  <span className="text-xs font-medium text-gray-600">{metric.label}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">
                  {metric.format(value)}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Chart */}
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {showArea ? (
              <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id={`gradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={selectedMetricConfig?.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={selectedMetricConfig?.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => {
                    if (selectedMetric === 'pipelineValue') return `$${value/1000}K`
                    if (selectedMetric === 'responseRate') return `${value}%`
                    return value.toString()
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={selectedMetricConfig?.color}
                  strokeWidth={3}
                  fill={`url(#gradient-${selectedMetric})`}
                  dot={{ fill: selectedMetricConfig?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: selectedMetricConfig?.color }}
                />
              </AreaChart>
            ) : (
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="#9ca3af"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#9ca3af"
                  fontSize={12}
                  tickFormatter={(value) => {
                    if (selectedMetric === 'pipelineValue') return `$${value/1000}K`
                    if (selectedMetric === 'responseRate') return `${value}%`
                    return value.toString()
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={selectedMetricConfig?.color}
                  strokeWidth={3}
                  dot={{ fill: selectedMetricConfig?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: selectedMetricConfig?.color }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current {selectedMetricConfig?.label}</p>
              <p className="text-2xl font-bold text-gray-900">
                {selectedMetricConfig?.format(currentValue)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Change from last period</p>
              <div className="flex items-center space-x-1">
                {change >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-600" />
                )}
                <span className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {change >= 0 ? '+' : ''}{selectedMetricConfig?.format(change)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
