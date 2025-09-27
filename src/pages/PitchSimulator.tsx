import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Square,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  Target,
  Zap,
  Brain,
  History,
  Settings,
  ChevronUp,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
  User
} from 'lucide-react'
import { Card, CardContent, Button, Badge, Avatar } from '@/components/ui'

interface InvestorPersona {
  id: string
  name: string
  title: string
  firm: string
  avatar: string
  personality: 'skeptical' | 'friendly' | 'tough'
  tone: string
  specialties: string[]
  typicalQuestions: string[]
  responseStyle: string
}

interface ConversationMessage {
  id: string
  speaker: 'user' | 'investor'
  content: string
  timestamp: Date
  type: 'message' | 'audio'
}

interface PitchScore {
  clarity: number
  confidence: number
  engagement: number
  structure: number
  overall: number
  feedback: string[]
}

const investorPersonas: InvestorPersona[] = [
  {
    id: 'sarah-chen',
    name: 'Imaguru',
    title: 'Partner',
    firm: 'Kleiner Perkins',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    personality: 'friendly',
    tone: 'Supportive and encouraging, asks clarifying questions',
    specialties: ['FinTech', 'AI/ML', 'B2B SaaS'],
    typicalQuestions: [
      'Tell me about your traction metrics',
      'What makes your solution unique?',
      'How do you plan to scale?',
      'What are your key milestones?'
    ],
    responseStyle: 'Helpful feedback with constructive suggestions'
  },
  {
    id: 'michael-rodriguez',
    name: 'Michael Rodriguez',
    title: 'Managing Director',
    firm: 'Benchmark Capital',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    personality: 'tough',
    tone: 'Direct and challenging, pushes for specifics',
    specialties: ['Enterprise Software', 'Infrastructure', 'Security'],
    typicalQuestions: [
      'What\'s your competitive advantage?',
      'How defensible is your moat?',
      'What are your unit economics?',
      'Who are your main competitors?'
    ],
    responseStyle: 'Critical analysis with tough questions'
  },
  {
    id: 'david-park',
    name: 'David Park',
    title: 'Principal',
    firm: 'First Round Capital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    personality: 'skeptical',
    tone: 'Analytical and questioning, focuses on risks',
    specialties: ['Early Stage', 'Marketplaces', 'Consumer Apps'],
    typicalQuestions: [
      'What evidence do you have for market demand?',
      'How will you acquire customers?',
      'What are the biggest risks?',
      'Why now for this market?'
    ],
    responseStyle: 'Skeptical analysis with risk-focused questions'
  }
]

const practiceModes = [
  {
    id: 'elevator',
    name: 'Elevator Pitch',
    duration: '30-60 seconds',
    description: 'Quick overview of your company and value proposition',
    icon: Zap
  },
  {
    id: 'deep-dive',
    name: 'Deep Dive',
    duration: '10-15 minutes',
    description: 'Comprehensive pitch covering all aspects of your business',
    icon: Target
  },
  {
    id: 'qa',
    name: 'Q&A Session',
    duration: 'Variable',
    description: 'Practice answering investor questions and objections',
    icon: MessageSquare
  }
]

const mockConversations = [
  {
    id: '1',
    title: 'Practice with Sarah Chen',
    mode: 'elevator',
    date: new Date('2024-02-10'),
    duration: '2:34',
    score: 85,
    investor: investorPersonas[0]
  },
  {
    id: '2',
    title: 'Deep Dive with Michael Rodriguez',
    mode: 'deep-dive',
    date: new Date('2024-02-08'),
    duration: '12:45',
    score: 72,
    investor: investorPersonas[1]
  },
  {
    id: '3',
    title: 'Q&A with David Park',
    mode: 'qa',
    date: new Date('2024-02-05'),
    duration: '8:12',
    score: 91,
    investor: investorPersonas[2]
  }
]

export function PitchSimulator() {
  const [selectedInvestor] = useState<InvestorPersona>(investorPersonas[0])
  const [selectedMode, setSelectedMode] = useState(practiceModes[0])
  const [isRecording, setIsRecording] = useState(false)
  const [isMicOn, setIsMicOn] = useState(true)
  const [isCameraOn, setIsCameraOn] = useState(true)
  const [currentScore, setCurrentScore] = useState<PitchScore | null>(null)
  const [conversation, setConversation] = useState<ConversationMessage[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [currentStep, setCurrentStep] = useState<'setup' | 'practice' | 'results'>('setup')
  const [showEndConfirmModal, setShowEndConfirmModal] = useState(false)
  const [userVideoStream, setUserVideoStream] = useState<MediaStream | null>(null)
  const [cameraPermission, setCameraPermission] = useState<'requesting' | 'granted' | 'denied' | null>(null)
  
  const recordingIntervalRef = useRef<number | null>(null)
  const userVideoRef = useRef<HTMLVideoElement>(null)

  // Effect to handle video stream
  useEffect(() => {
    if (userVideoStream && userVideoRef.current) {
      userVideoRef.current.srcObject = userVideoStream
    }
  }, [userVideoStream])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (userVideoStream) {
        userVideoStream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Camera functions
  const requestCameraPermission = async () => {
    if (cameraPermission === 'requesting') return
    
    setCameraPermission('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 }
        }, 
        audio: false 
      })
      setUserVideoStream(stream)
      setCameraPermission('granted')
    } catch (error) {
      console.error('Camera permission denied:', error)
      setCameraPermission('denied')
    }
  }

  const stopCamera = () => {
    if (userVideoStream) {
      userVideoStream.getTracks().forEach(track => track.stop())
      setUserVideoStream(null)
    }
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null
    }
    setCameraPermission(null)
  }

  // Simulate AI response
  const generateAIResponse = (): string => {
    const responses = {
      skeptical: [
        "That's interesting, but I need to see more concrete data to validate that claim.",
        "How do you plan to address the obvious competitive threats in this space?",
        "I'm concerned about the scalability of this approach. Can you elaborate?",
        "What makes you think the market timing is right for this solution?"
      ],
      friendly: [
        "That sounds promising! I'd love to hear more about your traction metrics.",
        "Great point! How are you thinking about scaling this solution?",
        "I'm excited about the potential here. What are your key milestones?",
        "This is fascinating! What's your biggest challenge right now?"
      ],
      tough: [
        "I need specific numbers, not just concepts. What are your unit economics?",
        "That's all well and good, but what's your competitive moat?",
        "How exactly do you plan to execute this strategy?",
        "Show me the data that proves this will work at scale."
      ]
    }
    
    const personaResponses = responses[selectedInvestor.personality]
    return personaResponses[Math.floor(Math.random() * personaResponses.length)]
  }

  // Simulate scoring
  const calculateScore = (conversation: ConversationMessage[]): PitchScore => {
    const userMessages = conversation.filter(msg => msg.speaker === 'user')
    const clarity = Math.min(90, 60 + userMessages.length * 5)
    const confidence = Math.min(95, 70 + Math.random() * 25)
    const engagement = Math.min(88, 65 + Math.random() * 23)
    const structure = Math.min(92, 68 + Math.random() * 24)
    
    const overall = Math.round((clarity + confidence + engagement + structure) / 4)
    
    const feedback = [
      'Good use of specific metrics and data points',
      'Clear value proposition presentation',
      'Strong confidence in delivery',
      'Could improve on competitive differentiation',
      'Consider adding more customer testimonials'
    ]
    
    return { clarity, confidence, engagement, structure, overall, feedback }
  }

  const startRecording = () => {
    if (!isMicOn) return // Don't start if mic is off
    setIsRecording(true)
    setRecordingDuration(0)
    recordingIntervalRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    console.log('Stop recording clicked, showing modal')
    setShowEndConfirmModal(true)
  }

  const confirmEndRecording = () => {
    setShowEndConfirmModal(false)
    setIsRecording(false)
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current)
    }
    
    // Simulate processing
    setIsSimulating(true)
    setTimeout(() => {
      const userMessage: ConversationMessage = {
        id: Date.now().toString(),
        speaker: 'user',
        content: `[Audio recording - ${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, '0')}]`,
        timestamp: new Date(),
        type: 'audio'
      }
      
      const aiResponse: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        speaker: 'investor',
        content: generateAIResponse(),
        timestamp: new Date(),
        type: 'message'
      }
      
      const newConversation = [...conversation, userMessage, aiResponse]
      setConversation(newConversation)
      setCurrentScore(calculateScore(newConversation))
      setIsSimulating(false)
      setCurrentStep('results')
    }, 2000)
  }

  const startPractice = () => {
    setCurrentStep('practice')
    setConversation([])
    setCurrentScore(null)
    // Request camera permission when starting practice
    if (isCameraOn && cameraPermission === null) {
      requestCameraPermission()
    }
  }

  const resetSession = () => {
    setCurrentStep('setup')
    setConversation([])
    setCurrentScore(null)
    setRecordingDuration(0)
    setIsRecording(false)
    setIsSimulating(false)
    setIsMicOn(true)
    setIsCameraOn(true)
    setShowEndConfirmModal(false)
    stopCamera()
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50'
    if (score >= 70) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  // If we're in practice or results mode, show fullscreen interface
  if (currentStep === 'practice' || currentStep === 'results') {
    return (
      <div className="fixed inset-0 z-50 bg-gray-900">
        <AnimatePresence mode="wait">
          {(currentStep === 'practice' || currentStep === 'results') && (
            <motion.div
              key="meeting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col bg-gray-900"
            >
              {/* Top Bar */}
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetSession}
                      leftIcon={<ArrowLeft className="h-4 w-4" />}
                    >
                      Back to Setup
                    </Button>
                    <div>
                      <h1 className="text-xl font-semibold text-gray-900">
                        {currentStep === 'practice' && 'Practice with ' + selectedInvestor.name}
                        {currentStep === 'results' && 'Session Results'}
                      </h1>
                      <p className="text-sm text-gray-600">
                        {currentStep === 'practice' && selectedMode.name + ' • ' + formatDuration(recordingDuration)}
                        {currentStep === 'results' && 'Review your performance and feedback'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {currentScore && (
                      <Badge className={getScoreColor(currentScore.overall)}>
                        {currentScore.overall}%
                      </Badge>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Settings className="h-4 w-4" />}
                    >
                      Settings
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Video/Content Area */}
              <div className="flex-1 flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {currentStep === 'practice' && (
                    <motion.div
                      key="practice-main"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="text-center space-y-8"
                    >
                      {/* Video Conference Layout - Equal Size */}
                      <div className="relative max-w-8xl mx-auto">
                        {/* Main Video Grid - Equal Size */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                          
                          {/* Investor Video */}
                          <div className="relative">
                            <div className="w-full aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center shadow-2xl border-2 border-gray-600">
                              <div className="text-white text-center px-8 py-12">
                                <div className="text-7xl font-bold mb-6">Imaguru</div>
                                <div className="text-3xl text-gray-300">
                                  {isRecording ? 'Listening to your pitch...' : 'Waiting for your pitch...'}
                                </div>
                              </div>
                            </div>
                            
                            {/* Recording Indicator */}
                            {isRecording && (
                              <motion.div
                                className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              >
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                                <span>REC</span>
                              </motion.div>
                            )}

                            {/* Duration Display */}
                            <div className="absolute bottom-8 left-8 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full text-base">
                              {formatDuration(recordingDuration)}
                            </div>
                          </div>

                          {/* User Video */}
                          <div className="relative w-full aspect-square">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-gray-600 overflow-hidden">
                              {isCameraOn && cameraPermission === 'granted' && userVideoStream ? (
                                <video
                                  ref={userVideoRef}
                                  autoPlay
                                  muted
                                  playsInline
                                  className="w-full h-full object-cover rounded-2xl"
                                  style={{ transform: 'scaleX(-1)' }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                                  <div className="h-64 w-64 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <User className="h-32 w-32 text-primary-600" />
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Camera Permission Status */}
                            {isCameraOn && cameraPermission === 'requesting' && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center z-10">
                                <div className="text-white text-center">
                                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-6"></div>
                                  <p className="text-xl">Requesting camera access...</p>
                                </div>
                              </div>
                            )}

                            {isCameraOn && cameraPermission === 'denied' && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center z-10">
                                <div className="text-white text-center">
                                  <VideoOff className="h-16 w-16 mx-auto mb-6 text-red-400" />
                                  <p className="text-xl">Camera access denied</p>
                                </div>
                              </div>
                            )}
                            
                            {/* Mic Status Indicator */}
                            <div className="absolute top-8 right-8 z-20">
                              {isMicOn ? (
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                  <Mic className="h-8 w-8 text-white" />
                                </div>
                              ) : (
                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                                  <MicOff className="h-8 w-8 text-white" />
                                </div>
                              )}
                            </div>

                            {/* User Name */}
                            <div className="absolute bottom-8 left-8 bg-black bg-opacity-50 text-white px-6 py-3 rounded-full text-base z-20">
                              You
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status Message */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-semibold text-white">
                          {selectedInvestor.name} is {isRecording ? 'listening' : 'waiting'}...
                        </h3>
                        <p className="text-gray-300 text-lg">
                          {isSimulating ? 'Processing your pitch with AI...' : 
                           isRecording ? 'Speak clearly into your microphone' : 
                           !isMicOn ? 'Turn on your microphone to start recording' :
                           'Click the play button when you\'re ready'}
                        </p>
                      </div>

                      {/* Meeting Controls - Google Meet Style */}
                      <div className="flex justify-center items-center space-x-3 bg-black bg-opacity-50 rounded-full px-6 py-3 backdrop-blur-sm">
                        {/* Mic Toggle */}
                        <button
                          onClick={() => setIsMicOn(!isMicOn)}
                          className={`p-3 rounded-full transition-all duration-200 hover:scale-105 ${
                            isMicOn 
                              ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                              : 'bg-red-500 hover:bg-red-400 text-white'
                          }`}
                          title={isMicOn ? 'Turn off microphone' : 'Turn on microphone'}
                        >
                          {isMicOn ? (
                            <Mic className="h-5 w-5" />
                          ) : (
                            <MicOff className="h-5 w-5" />
                          )}
                        </button>

                        {/* Camera Toggle */}
                        <button
                          onClick={() => {
                            if (!isCameraOn && cameraPermission === null) {
                              requestCameraPermission()
                            } else if (isCameraOn) {
                              stopCamera()
                            }
                            setIsCameraOn(!isCameraOn)
                          }}
                          className={`p-3 rounded-full transition-all duration-200 hover:scale-105 ${
                            isCameraOn 
                              ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                              : 'bg-red-500 hover:bg-red-400 text-white'
                          }`}
                          title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
                        >
                          {isCameraOn ? (
                            <Video className="h-5 w-5" />
                          ) : (
                            <VideoOff className="h-5 w-5" />
                          )}
                        </button>

                        {/* Divider */}
                        <div className="w-px h-8 bg-gray-600"></div>

                        {/* Start/Stop Recording */}
                        {!isRecording ? (
                          <button
                            onClick={startRecording}
                            disabled={!isMicOn}
                            className={`p-3 rounded-full transition-all duration-200 hover:scale-105 ${
                              isMicOn
                                ? 'bg-green-500 hover:bg-green-400 text-white'
                                : 'bg-gray-500 text-gray-300 cursor-not-allowed hover:scale-100'
                            }`}
                            title={isMicOn ? 'Start recording' : 'Turn on microphone to start recording'}
                          >
                            <Play className="h-5 w-5" />
                          </button>
                        ) : (
                          <button
                            onClick={stopRecording}
                            className="p-3 rounded-full bg-red-500 hover:bg-red-400 text-white transition-all duration-200 hover:scale-105"
                            title="Stop recording"
                          >
                            <Square className="h-5 w-5" />
                          </button>
                        )}
                      </div>

                      {isSimulating && (
                        <motion.div
                          className="flex items-center justify-center space-x-3 text-primary-400 py-6"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          <Brain className="h-6 w-6" />
                          <span className="text-lg">AI is analyzing your pitch...</span>
                        </motion.div>
                      )}

                      {/* Conversation Display */}
                      {conversation.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="max-w-3xl mx-auto bg-black bg-opacity-30 rounded-xl p-8 backdrop-blur-sm"
                        >
                          <h4 className="text-white font-medium mb-6 text-lg">Conversation</h4>
                          <div className="space-y-4 max-h-60 overflow-y-auto">
                            {conversation.slice(-4).map((message) => (
                              <div key={message.id} className={`flex ${message.speaker === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-md px-6 py-3 rounded-xl ${
                                  message.speaker === 'user'
                                    ? 'bg-primary-500 text-white'
                                    : 'bg-gray-700 text-gray-100'
                                }`}>
                                  <p className="text-sm">{message.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {currentStep === 'results' && (
                    <motion.div
                      key="results-main"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="max-w-5xl mx-auto px-6 space-y-8"
                    >
                      {/* Score Visualization */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Overall Score */}
                        <div className="bg-white rounded-3xl p-10 text-center shadow-2xl">
                          <div className="space-y-6">
                            <div className={`text-8xl font-bold ${getScoreColor(currentScore?.overall || 0).split(' ')[0]}`}>
                              {currentScore?.overall ?? 0}%
                            </div>
                            <h3 className="text-3xl font-semibold text-gray-900">Overall Score</h3>
                            <p className="text-gray-600 text-lg">
                              Great job! Your pitch showed strong {currentScore?.overall && currentScore.overall > 80 ? 'performance' : 'potential'}.
                            </p>
                          </div>
                        </div>

                        {/* Detailed Breakdown */}
                        <div className="bg-white rounded-3xl p-10 shadow-2xl">
                          <h3 className="text-2xl font-semibold text-gray-900 mb-8">Performance Breakdown</h3>
                          <div className="space-y-6">
                            {[
                              { label: 'Clarity', value: currentScore?.clarity ?? 0, color: 'blue' },
                              { label: 'Confidence', value: currentScore?.confidence ?? 0, color: 'green' },
                              { label: 'Engagement', value: currentScore?.engagement ?? 0, color: 'purple' },
                              { label: 'Structure', value: currentScore?.structure ?? 0, color: 'orange' }
                            ].map((metric) => (
                              <div key={metric.label} className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-gray-900 text-lg">{metric.label}</span>
                                  <span className={`font-bold text-${metric.color}-600 text-xl`}>{metric.value}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div 
                                    className={`bg-${metric.color}-500 h-3 rounded-full transition-all duration-1000`}
                                    style={{ width: `${metric.value}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Feedback */}
                      <div className="bg-white rounded-3xl p-10 shadow-2xl">
                        <h3 className="text-2xl font-semibold text-gray-900 mb-8">Detailed Feedback</h3>
                        <div className="space-y-6">
                          {currentScore?.feedback?.map((item, index) => (
                            <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                              <AlertCircle className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700 text-lg">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-center space-x-6">
                        <Button
                          size="lg"
                          onClick={resetSession}
                          className="px-12 py-4 text-lg"
                          leftIcon={<RefreshCw className="h-6 w-6" />}
                        >
                          Practice Again
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setShowHistory(!showHistory)}
                          className="px-12 py-4 text-lg"
                          leftIcon={<History className="h-6 w-6" />}
                        >
                          View History
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 overflow-y-auto z-50"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Practice History</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHistory(false)}
                  >
                    <ChevronUp className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {mockConversations.map((conv) => (
                    <Card key={conv.id} className="cursor-pointer hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <img src={conv.investor.avatar} alt={conv.investor.name} className="h-12 w-12 rounded-full object-cover" />
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{conv.title}</h3>
                            <p className="text-gray-600 mt-1">{conv.mode} • {conv.duration}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge className={getScoreColor(conv.score)}>
                                {conv.score}%
                              </Badge>
                              <span className="text-sm text-gray-500">
                                {conv.date.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  // Setup mode with sidebar
  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Pitch Practice Simulator</h1>
          <p className="text-xl text-gray-600 mt-2">AI-powered investor call training</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowHistory(!showHistory)}
          leftIcon={<History className="h-5 w-5" />}
        >
          View History
        </Button>
      </div>

      {/* Main Setup Content */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Practice Mode</h2>
          <p className="text-xl text-gray-600">Select the type of practice session you want to start</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {practiceModes.map((mode) => (
            <motion.div
              key={mode.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMode(mode)}
              className={`p-8 border-2 rounded-2xl cursor-pointer transition-all ${
                selectedMode.id === mode.id
                  ? 'border-primary-500 bg-primary-50 shadow-xl'
                  : 'border-gray-200 hover:border-gray-300 bg-white shadow-lg'
              }`}
            >
              <div className="text-center">
                <div className={`p-4 rounded-xl mx-auto mb-6 w-fit ${
                  selectedMode.id === mode.id ? 'bg-primary-100' : 'bg-gray-100'
                }`}>
                  <mode.icon className={`h-8 w-8 ${
                    selectedMode.id === mode.id ? 'text-primary-600' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{mode.name}</h3>
                <p className="text-gray-600 mb-4">{mode.description}</p>
                <p className="text-sm text-gray-500 font-medium">Duration: {mode.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Start Button */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={startPractice}
            className="px-16 py-5 text-xl"
            leftIcon={<Play className="h-7 w-7" />}
          >
            Start Practice Session
          </Button>
        </div>
      </div>

      {/* History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l border-gray-200 overflow-y-auto z-50"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Practice History</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(false)}
                >
                  <ChevronUp className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {mockConversations.map((conv) => (
                  <Card key={conv.id} className="cursor-pointer hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <img src={conv.investor.avatar} alt={conv.investor.name} className="h-12 w-12 rounded-full object-cover" />
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{conv.title}</h3>
                          <p className="text-gray-600 mt-1">{conv.mode} • {conv.duration}</p>
                          <div className="flex items-center justify-between mt-3">
                            <Badge className={getScoreColor(conv.score)}>
                              {conv.score}%
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {conv.date.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End Recording Confirmation Modal */}
      <AnimatePresence>
        {showEndConfirmModal && (
          console.log('Rendering confirmation modal'),
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
            onClick={() => setShowEndConfirmModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  End Recording?
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to end this pitch recording? This action cannot be undone.
                </p>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowEndConfirmModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={confirmEndRecording}
                    className="flex-1 bg-red-500 hover:bg-red-600"
                  >
                    End Recording
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}