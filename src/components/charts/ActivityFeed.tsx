import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, 
  MessageSquare, 
  Calendar, 
  Target, 
  Phone, 
  CheckCircle, 
  Clock, 
  X,
  ChevronDown,
  ChevronUp,
  LucideIcon
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

export interface Activity {
  id: string
  type: 'email' | 'reply' | 'meeting' | 'campaign' | 'call' | 'response'
  title: string
  description: string
  timestamp: string
  status?: 'success' | 'pending' | 'failed'
  metadata?: {
    investor?: string
    amount?: string
    campaign?: string
  }
}

interface ActivityFeedProps {
  activities: Activity[]
  showMore?: boolean
  maxInitialItems?: number
  onShowMore?: () => void
  onActivityClick?: (activity: Activity) => void
  className?: string
}

const getActivityIcon = (type: Activity['type']): LucideIcon => {
  switch (type) {
    case 'email': return Mail
    case 'reply': return MessageSquare
    case 'meeting': return Calendar
    case 'campaign': return Target
    case 'call': return Phone
    case 'response': return CheckCircle
    default: return Mail
  }
}

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'email': return 'text-blue-600 bg-blue-100'
    case 'reply': return 'text-green-600 bg-green-100'
    case 'meeting': return 'text-purple-600 bg-purple-100'
    case 'campaign': return 'text-orange-600 bg-orange-100'
    case 'call': return 'text-red-600 bg-red-100'
    case 'response': return 'text-emerald-600 bg-emerald-100'
    default: return 'text-gray-600 bg-gray-100'
  }
}

const getStatusIcon = (status?: Activity['status']) => {
  switch (status) {
    case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
    case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
    case 'failed': return <X className="h-4 w-4 text-red-600" />
    default: return null
  }
}

export function ActivityFeed({
  activities,
  showMore = true,
  maxInitialItems = 5,
  onShowMore,
  onActivityClick,
  className = ''
}: ActivityFeedProps) {
  const [showAll, setShowAll] = useState(false)
  
  const displayedActivities = showAll ? activities : activities.slice(0, maxInitialItems)
  const hasMoreActivities = activities.length > maxInitialItems

  const handleShowMore = () => {
    setShowAll(!showAll)
    onShowMore?.()
  }

  const formatTimestamp = (timestamp: string) => {
    // Convert relative time to more readable format
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffInHours = Math.floor((now.getTime() - activityTime.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnimatePresence>
            {displayedActivities.map((activity, index) => {
              const Icon = getActivityIcon(activity.type)
              const colorClass = getActivityColor(activity.type)
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`
                    flex items-start space-x-4 p-4 rounded-lg transition-all duration-200
                    ${onActivityClick ? 'hover:bg-gray-50 cursor-pointer' : 'hover:bg-gray-50/50'}
                  `}
                  onClick={() => onActivityClick?.(activity)}
                >
                  <motion.div 
                    className={`p-2 rounded-full ${colorClass} flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        
                        {activity.metadata && (
                          <div className="mt-2 space-y-1">
                            {activity.metadata.investor && (
                              <p className="text-xs text-gray-500">
                                <span className="font-medium">Investor:</span> {activity.metadata.investor}
                              </p>
                            )}
                            {activity.metadata.amount && (
                              <p className="text-xs text-gray-500">
                                <span className="font-medium">Amount:</span> {activity.metadata.amount}
                              </p>
                            )}
                            {activity.metadata.campaign && (
                              <p className="text-xs text-gray-500">
                                <span className="font-medium">Campaign:</span> {activity.metadata.campaign}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-4">
                        {getStatusIcon(activity.status)}
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {formatTimestamp(activity.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {hasMoreActivities && showMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-4 border-t border-gray-200"
            >
              <button
                onClick={handleShowMore}
                className="flex items-center justify-center w-full py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {showAll ? (
                  <>
                    Show Less
                    <ChevronUp className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    Show More ({activities.length - maxInitialItems} more)
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            </motion.div>
          )}
        </div>

        {activities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="text-gray-400 mb-2">
              <Mail className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500 text-sm">No recent activity</p>
            <p className="text-gray-400 text-xs mt-1">Your fundraising activities will appear here</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
