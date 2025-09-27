import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'

interface MetricsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  isLoading?: boolean
  onClick?: () => void
  className?: string
}

export function MetricsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-blue-600',
  iconBgColor = 'bg-blue-50',
  isLoading = false,
  onClick,
  className = ''
}: MetricsCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-3 w-3" />
      case 'negative':
        return <TrendingDown className="h-3 w-3" />
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <Card className={`${className} h-32 ${onClick ? 'cursor-pointer' : ''}`}>
        <CardContent className="p-3 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 flex flex-col justify-center">
              <div>
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-24"></div>
                <div className="h-6 bg-gray-200 rounded animate-pulse mb-1 w-16"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            </div>
            <div className={`p-2 rounded-lg ${iconBgColor} animate-pulse flex-shrink-0 ml-3`}>
              <div className="h-5 w-5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`
          transition-all duration-300 h-32
          ${onClick ? 'cursor-pointer hover:shadow-lg' : ''} 
          ${isHovered && onClick ? 'ring-2 ring-primary-500/20' : ''}
          ${className}
        `}
        onClick={onClick}
      >
        <CardContent className="p-3 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex-1 flex flex-col justify-center">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1 leading-tight">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
                {change && (
                  <div className={`flex items-center space-x-1 text-xs font-medium ${getChangeColor()}`}>
                    {getChangeIcon()}
                    <span>{change}</span>
                  </div>
                )}
              </div>
            </div>
            <motion.div 
              className={`p-2 rounded-lg ${iconBgColor} transition-transform duration-200 flex-shrink-0 ml-3`}
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            >
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
