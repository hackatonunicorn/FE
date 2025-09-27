import { motion } from 'framer-motion'
import {
  Target,
  Calendar,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import { MetricsCard, ActivityFeed, MeetingsWidget, PerformanceChart } from '@/components/charts'
import type { Activity, Meeting, ChartDataPoint } from '@/components/charts'

// Mock data for charts
const performanceData: ChartDataPoint[] = [
  { date: '2024-01-01', responseRate: 35, emailsSent: 150, meetingsScheduled: 8, pipelineValue: 1800000 },
  { date: '2024-01-08', responseRate: 42, emailsSent: 180, meetingsScheduled: 12, pipelineValue: 2100000 },
  { date: '2024-01-15', responseRate: 38, emailsSent: 165, meetingsScheduled: 10, pipelineValue: 1950000 },
  { date: '2024-01-22', responseRate: 47, emailsSent: 200, meetingsScheduled: 15, pipelineValue: 2300000 },
  { date: '2024-01-29', responseRate: 45, emailsSent: 190, meetingsScheduled: 14, pipelineValue: 2250000 },
  { date: '2024-02-05', responseRate: 52, emailsSent: 220, meetingsScheduled: 18, pipelineValue: 2600000 }
]

export function Dashboard() {

  const metrics = [
    {
      title: 'Active Campaigns',
      value: '3',
      change: '+1 this week',
      changeType: 'positive' as const,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Monthly Meetings',
      value: '12',
      change: '+3 vs last month',
      changeType: 'positive' as const,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Response Rate',
      value: '47%',
      change: '+8% vs last month',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Pipeline Value',
      value: '$2.3M',
      change: '+$400K this week',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ]


  const recentActivity: Activity[] = [
    {
      id: '1',
      type: 'email',
      title: 'Sent pitch email to Sequoia Capital',
      description: 'Series A pitch deck shared with partner John Smith',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      status: 'success',
      metadata: {
        investor: 'John Smith',
        campaign: 'Series A Outreach'
      }
    },
    {
      id: '2',
      type: 'reply',
      title: 'Positive response from Andreessen Horowitz',
      description: 'Partner requested follow-up meeting next week',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      status: 'success',
      metadata: {
        investor: 'Sarah Chen',
        amount: '$2.5M'
      }
    },
    {
      id: '3',
      type: 'meeting',
      title: 'Demo call with Accel Partners',
      description: '45-minute product demonstration completed',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      status: 'success',
      metadata: {
        investor: 'Michael Rodriguez'
      }
    },
    {
      id: '4',
      type: 'campaign',
      title: 'Launched Seed Fund outreach campaign',
      description: 'Targeting 50 early-stage VCs in fintech space',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending'
    },
    {
      id: '5',
      type: 'call',
      title: 'Intro call with Lightspeed Venture Partners',
      description: 'Initial conversation about Series A opportunity',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      status: 'success',
      metadata: {
        investor: 'David Park'
      }
    }
  ]

  const upcomingMeetings: Meeting[] = [
    {
      id: '1',
      vcName: 'Sarah Chen',
      vcCompany: 'Kleiner Perkins',
      time: '10:00 AM',
      date: 'Today',
      type: 'meeting',
      status: 'confirmed',
      agenda: 'Series A pitch presentation and Q&A session',
      participants: ['Sarah Chen', 'John Doe', 'CTO'],
      notes: 'Focus on traction metrics and growth strategy'
    },
    {
      id: '2',
      vcName: 'Michael Rodriguez',
      vcCompany: 'Benchmark Capital',
      time: '2:30 PM',
      date: 'Tomorrow',
      type: 'meeting',
      status: 'confirmed',
      agenda: 'Investment discussion and due diligence review',
      location: 'Zoom Meeting'
    },
    {
      id: '3',
      vcName: 'Emily Watson',
      vcCompany: 'Index Ventures',
      time: '11:15 AM',
      date: 'Friday',
      type: 'meeting',
      status: 'pending',
      agenda: 'Partnership discussion and investment opportunity'
    },
    {
      id: '4',
      vcName: 'David Park',
      vcCompany: 'First Round Capital',
      time: '3:45 PM',
      date: 'Monday',
      type: 'meeting',
      status: 'confirmed',
      agenda: 'Initial investment meeting and market overview'
    },
    {
      id: '5',
      vcName: 'Lisa Thompson',
      vcCompany: 'GV (Google Ventures)',
      time: '1:00 PM',
      date: 'Tuesday',
      type: 'meeting',
      status: 'rescheduled',
      agenda: 'Series A funding discussion and partnership'
    }
  ]


  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-xl text-gray-600 mt-2">Welcome back! Here's your fundraising overview</p>
      </div>

      {/* Metrics Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <MetricsCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              icon={metric.icon}
              iconColor={metric.color}
              iconBgColor={metric.bgColor}
              onClick={() => console.log(`Clicked on ${metric.title}`)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Recent Activity */}
        <div className="lg:col-span-2">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <ActivityFeed
              activities={recentActivity}
              onActivityClick={(activity) => console.log('Activity clicked:', activity)}
              maxInitialItems={4}
            />
          </motion.div>
        </div>

        {/* Right Column - Upcoming Meetings */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <MeetingsWidget
              meetings={upcomingMeetings}
              onMeetingClick={(meeting) => console.log('Meeting clicked:', meeting)}
              onViewAll={() => console.log('View all meetings')}
              maxDisplay={5}
            />
          </motion.div>
        </div>
      </div>

      {/* Performance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <PerformanceChart
          data={performanceData}
          title="Performance Overview"
          showArea={true}
          height={400}
        />
      </motion.div>
    </div>
  )
}
