import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Button, Modal } from '@/components/ui'

export interface Meeting {
  id: string
  vcName: string
  vcCompany: string
  vcAvatar?: string
  time: string
  date: string
  type: 'meeting'
  status: 'confirmed' | 'pending' | 'rescheduled' | 'cancelled'
  location?: string
  agenda?: string
  participants?: string[]
  notes?: string
}

interface MeetingsWidgetProps {
  meetings: Meeting[]
  onMeetingClick?: (meeting: Meeting) => void
  onViewAll?: () => void
  maxDisplay?: number
  className?: string
}


const formatTime = (time: string, date: string) => {
  const meetingDateTime = new Date(`${date} ${time}`)
  const now = new Date()
  const diffInHours = Math.floor((meetingDateTime.getTime() - now.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 0) return 'Past'
  if (diffInHours < 24) return `Today at ${time}`
  if (diffInHours < 48) return `Tomorrow at ${time}`
  return `${date} at ${time}`
}

function MeetingDetailModal({ 
  meeting, 
  isOpen, 
  onClose 
}: { 
  meeting: Meeting | null
  isOpen: boolean
  onClose: () => void 
}) {
  if (!meeting) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Meeting Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-primary-700">
                {meeting.vcName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900">{meeting.vcName}</h4>
              <p className="text-gray-600">{meeting.vcCompany}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {meeting.type}
                </span>
              </div>
            </div>
          </div>

          {/* Meeting Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Time & Date</h5>
              <p className="text-gray-600">{formatTime(meeting.time, meeting.date)}</p>
            </div>
            {meeting.location && (
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Location</h5>
                <p className="text-gray-600">{meeting.location}</p>
              </div>
            )}
          </div>

          {/* Agenda */}
          {meeting.agenda && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Agenda</h5>
              <p className="text-gray-600">{meeting.agenda}</p>
            </div>
          )}

          {/* Participants */}
          {meeting.participants && meeting.participants.length > 0 && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Participants</h5>
              <div className="space-y-1">
                {meeting.participants.map((participant, index) => (
                  <p key={index} className="text-gray-600">• {participant}</p>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {meeting.notes && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
              <p className="text-gray-600">{meeting.notes}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Join Meeting
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export function MeetingsWidget({
  meetings,
  onMeetingClick,
  onViewAll,
  maxDisplay = 5,
  className = ''
}: MeetingsWidgetProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const displayedMeetings = meetings.slice(0, maxDisplay)

  const handleMeetingClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting)
    setIsModalOpen(true)
    onMeetingClick?.(meeting)
  }

  const upcomingMeetings = meetings.filter(meeting => {
    const meetingDateTime = new Date(`${meeting.date} ${meeting.time}`)
    return meetingDateTime > new Date()
  })

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-900">Upcoming Meetings</CardTitle>
            {upcomingMeetings.length > 0 && (
              <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                {upcomingMeetings.length} upcoming
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence>
              {displayedMeetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer group"
                  onClick={() => handleMeetingClick(meeting)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-gray-700">
                          {meeting.vcName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {meeting.vcName}
                        </h4>
                        <p className="text-sm text-gray-600 truncate">{meeting.vcCompany}</p>
                      </div>
                    </div>
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </motion.div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{meeting.time}</span>
                    <span className="text-xs text-gray-500">{meeting.date}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {meetings.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="text-gray-400 mb-4">
                <Calendar className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming meetings</h3>
              <p className="text-gray-500 text-sm mb-4">
                Schedule your first investor meeting to get started
              </p>
              <Button size="sm">
                Schedule Meeting
              </Button>
            </motion.div>
          )}

          {meetings.length > maxDisplay && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <Button 
                variant="outline" 
                fullWidth 
                className="text-sm"
                onClick={onViewAll}
              >
                View All Meetings ({meetings.length})
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <MeetingDetailModal
        meeting={selectedMeeting}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
