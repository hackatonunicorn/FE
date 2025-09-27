import { useState, useEffect, useCallback } from 'react'
import { motion, useInView, useAnimation, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { LandingHeader, LandingFooter, CalendlyModal, ContactSalesModal } from '@/components/landing'
import {
  TrendingUp,
  Users,
  Target,
  Zap,
  Shield,
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Sparkles,
  Building2,
  DollarSign,
  Clock,
  Globe,
  Award,
  MessageCircle
} from 'lucide-react'
import { Button, Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui'

// Enhanced Animated Counter Component
function AnimatedCounter({ end, duration = 2, suffix = "", prefix = "" }: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeOutCubic * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, isInView])

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Enhanced scroll-triggered animation hook
function useScrollAnimation(threshold = 0.3) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return [ref, controls] as const
}

// Floating element component
function FloatingElement({ children, delay = 0, duration = 3 }: { 
  children: React.ReactNode; 
  delay?: number; 
  duration?: number; 
}) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [-10, 10, -10],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Testimonial carousel component
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const testimonials = [
    {
      name: "Sarah Martinez",
      role: "CEO, TechFlow",
      content: "Unicorn's AI matching helped us identify 47 qualified investors in 2 weeks instead of 6 months. We closed our $12M Series A in 8 weeks with a 15% response rate.",
      initials: "SM",
    },
    {
      name: "David Johnson", 
      role: "Founder, DataVault",
      content: "The automated outreach sequences achieved a 23% response rate vs our previous 3%. We went from 2 meetings to 18 qualified investor meetings in 30 days.",
      initials: "DJ"
    },
    {
      name: "Lisa Chen",
      role: "Co-founder, HealthTech AI", 
      content: "Unicorn saved us 400+ hours of manual research and outreach. We raised our $8M seed round in 10 weeks instead of the typical 6-9 months.",
      initials: "LC"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Card className="h-full hover:shadow-medium transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-warning-400 text-warning-400" />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">{testimonials[currentIndex].initials}</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonials[currentIndex].name}</div>
                  <div className="text-sm text-gray-600">{testimonials[currentIndex].role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      {/* Carousel indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-primary-500 w-8' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export function Landing() {
  const [heroRef, heroControls] = useScrollAnimation()
  const [statsRef, statsControls] = useScrollAnimation()
  const [problemsRef, problemsControls] = useScrollAnimation()
  const [solutionsRef, solutionsControls] = useScrollAnimation()
  const [testimonialsRef, testimonialsControls] = useScrollAnimation()
  const [pricingRef, pricingControls] = useScrollAnimation()
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const [isContactSalesOpen, setIsContactSalesOpen] = useState(false)

  // Parallax scroll effects
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 1000], [0, -100])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
      }
    }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  // Micro-interaction variants
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
    transition: { duration: 0.2 }
  }

  const cardHover = {
    y: -8,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={heroControls}
        variants={containerVariants}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
        style={{ y: heroY }}
      >
        {/* Subtle Background Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-100 rounded-full opacity-20" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-secondary-100 rounded-full opacity-30" />
        
        <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="primary" className="mb-6 animate-pulse-slow">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI-Powered Fundraising Platform
                </Badge>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold mb-6 text-gray-900"
            >
              Transform 6-9 Months of
              <br />
              <span className="text-primary-600">
                Chaotic Fundraising
              </span>
              <br />
              Into Weeks
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Unicorn's AI-powered platform automates investor matching, personalized outreach, 
              and deal flow management to help startups close funding rounds 5x faster with proven results.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 items-center"
            >
              <motion.div
                whileHover={buttonHover}
                whileTap={{ scale: 0.98 }}
              >
                <Link to="/auth/signup">
                  <Button size="lg" className="text-lg px-8 py-3 btn-hover-lift" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Start Free Trial
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" size="lg" className="text-lg px-8 py-3" leftIcon={<Play className="h-4 w-4" />}>
                  Watch Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Used in 50+ countries</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Industry Leader</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Animated Statistics */}
      <motion.section
        ref={statsRef}
        initial="hidden"
        animate={statsControls}
        variants={containerVariants}
        className="py-20 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                <AnimatedCounter end={400} suffix="+" />
              </div>
              <div className="text-gray-600">Hours Saved</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary-600 mb-2">
                <AnimatedCounter end={5} suffix="x" />
              </div>
              <div className="text-gray-600">Response Rate</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-success-600 mb-2">
                <AnimatedCounter end={500} prefix="$" suffix="M+" duration={3} />
              </div>
              <div className="text-gray-600">Capital Raised</div>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                <AnimatedCounter end={1200} suffix="+" />
              </div>
              <div className="text-gray-600">Startups Funded</div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Problem Statement */}
      <motion.section
        ref={problemsRef}
        initial="hidden"
        animate={problemsControls}
        variants={containerVariants}
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Fundraising Process is <span className="text-error-600">Fundamentally Broken</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founders waste months on manual outreach, get minimal responses, and fail not because of bad ideas, 
              but because of inefficient processes that could be automated.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
            >
              <Card className="h-full hover:shadow-medium transition-all duration-300 border-l-4 border-l-error-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-error-600" />
                  </div>
                  <CardTitle>400+ Hours Wasted</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Founders spend 6-9 months on fundraising activities: researching investors, 
                    crafting personalized emails, and managing follow-ups instead of building their product.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
            >
              <Card className="h-full hover:shadow-medium transition-all duration-300 border-l-4 border-l-warning-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-warning-600" />
                  </div>
                  <CardTitle>2% Response Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Manual outreach to 118+ investors yields minimal results. Founders send hundreds of cold emails 
                    only to receive 2-5% response rates, wasting months on inefficient processes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={cardHover}
            >
              <Card className="h-full hover:shadow-medium transition-all duration-300 border-l-4 border-l-gray-500">
                <CardHeader>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-6 w-6 text-gray-600" />
                  </div>
                  <CardTitle>99% Fail Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Most startups fail due to inefficient fundraising processes, not bad ideas. 
                    Without systematic approaches and data-driven insights, even great companies struggle to secure funding.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Solution Features */}
      <motion.section
        id="features"
        ref={solutionsRef}
        initial="hidden"
        animate={solutionsControls}
        variants={containerVariants}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet the <span className="text-primary-600">Future</span> of Fundraising
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unicorn's AI-powered platform automates every aspect of fundraising, 
              from investor matching to pitch optimization and deal flow management.
            </p>
          </motion.div>

          <div className="space-y-24 mb-20">
            {/* Feature 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                variants={slideInLeft}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <motion.div 
                    className="w-16 h-16 bg-primary-500 rounded-lg flex items-center justify-center mb-6"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Zap className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Smart Investor Matching
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our AI analyzes 10,000+ investor profiles, portfolio companies, and investment patterns 
                    to identify the perfect matches for your startup's stage, industry, and funding requirements.
                  </p>
                  <div className="space-y-3">
                    {[
                      "AI-powered investor database",
                      "Portfolio fit analysis", 
                      "Investment stage matching",
                      "Geographic preferences"
                    ].map((feature, index) => (
                      <motion.div 
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-success-500" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={slideInRight}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop&crop=center"
                      alt="AI Dashboard"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <motion.div 
                      className="absolute bottom-4 left-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="font-semibold">Investor Matching Dashboard</h4>
                      <p className="text-sm opacity-90">Real-time AI recommendations</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                variants={slideInRight}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <motion.div 
                    className="w-16 h-16 bg-secondary-500 rounded-lg flex items-center justify-center mb-6"
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BarChart3 className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Automated Outreach
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Generate personalized emails, LinkedIn messages, and follow-up sequences that achieve 
                    3-5x higher response rates than manual outreach through data-driven personalization.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Personalized email generation",
                      "LinkedIn outreach automation",
                      "Follow-up sequence management",
                      "Response rate optimization"
                    ].map((feature, index) => (
                      <motion.div 
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-success-500" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={slideInLeft}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop&crop=center"
                      alt="Analytics Dashboard"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <motion.div 
                      className="absolute bottom-4 left-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="font-semibold">Advanced Analytics</h4>
                      <p className="text-sm opacity-90">Data-driven insights</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Feature 3 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                variants={slideInLeft}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <motion.div 
                    className="w-16 h-16 bg-success-500 rounded-lg flex items-center justify-center mb-6"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Users className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Meeting Pipeline
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Automate follow-ups, meeting scheduling, and pipeline management to ensure no opportunity 
                    falls through the cracks and maintain momentum throughout your fundraising process.
                  </p>
                  <div className="space-y-3">
                    {[
                      "Automated follow-up sequences",
                      "Meeting scheduling integration",
                      "Pipeline tracking & analytics",
                      "Deal flow management"
                    ].map((feature, index) => (
                      <motion.div 
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-success-500" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={slideInRight}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="aspect-video bg-gray-100 rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=450&fit=crop&crop=center"
                      alt="Meeting Pipeline Dashboard"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <motion.div 
                      className="absolute bottom-4 left-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h4 className="font-semibold">Meeting Pipeline Dashboard</h4>
                      <p className="text-sm opacity-90">Automated follow-ups & scheduling</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        id="testimonials"
        ref={testimonialsRef}
        initial="hidden"
        animate={testimonialsControls}
        variants={containerVariants}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by <span className="text-primary-600">Industry Leaders</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of successful startups who've accelerated their fundraising with Unicorn.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <TestimonialCarousel />
          </div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        id="pricing"
        ref={pricingRef}
        initial="hidden"
        animate={pricingControls}
        variants={containerVariants}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent <span className="text-primary-600">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your startup's stage and fundraising goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div 
              variants={slideInLeft}
              whileHover={cardHover}
            >
              <Card className="h-full hover:shadow-medium transition-all duration-300">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-xl">Starter</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">$149</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Perfect for pre-seed & seed startups</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Up to 200 investor contacts",
                      "AI-powered matching",
                      "Personalized email sequences",
                      "Basic pipeline tracking"
                    ].map((feature, index) => (
                      <motion.li 
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-success-500" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline" 
                      fullWidth
                      onClick={() => {
                        console.log('Starter plan clicked - redirecting to Stripe')
                        window.open('https://buy.stripe.com/bJe00j7DU2gtcwOaK597G00', '_blank')
                      }}
                    >
                      Start Free Trial
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              variants={scaleIn}
              whileHover={cardHover}
            >
              <Card className="h-full hover:shadow-medium transition-all duration-300 border-2 border-primary-500 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <motion.div animate={pulseAnimation}>
                    <Badge variant="primary" className="px-4 py-1 text-sm font-medium">
                      Most Popular
                    </Badge>
                  </motion.div>
                </div>
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-xl">Professional</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">$399</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">For Series A & B startups</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Unlimited investor contacts",
                      "Advanced AI matching",
                      "Automated LinkedIn outreach",
                      "Meeting pipeline automation",
                      "Advanced analytics & reporting"
                    ].map((feature, index) => (
                      <motion.li 
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-success-500" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    whileHover={buttonHover}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      fullWidth
                      onClick={() => {
                        console.log('Professional plan clicked - redirecting to Stripe')
                        window.open('https://buy.stripe.com/6oU3cvbUa1cp68qbO997G01', '_blank')
                      }}
                    >
                      Start Free Trial
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div 
              variants={slideInRight}
              whileHover={cardHover}
            >
              <Card className="h-full hover:shadow-medium transition-all duration-300">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900">Custom</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">For late-stage & enterprise</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Everything in Professional",
                      "Custom CRM integrations",
                      "Dedicated fundraising consultant",
                      "Custom deal flow analytics",
                      "White-label investor portal"
                    ].map((feature, index) => (
                      <motion.li 
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="h-5 w-5 text-success-500" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" fullWidth onClick={() => setIsContactSalesOpen(true)}>
                      Contact Sales
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20 bg-primary-600 text-white"
      >
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Transform Your Fundraising?
              </h2>
            </motion.div>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 opacity-90"
            >
              Join 1,200+ startups who've raised over $500M using Unicorn's AI-powered fundraising platform.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12 items-center"
            >
              <motion.div
                whileHover={buttonHover}
                whileTap={{ scale: 0.98 }}
                animate={pulseAnimation}
              >
                <Link to="/auth/signup">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-3" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Start Your Free Trial
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600" 
                  leftIcon={<MessageCircle className="h-4 w-4" />}
                  onClick={() => setIsCalendlyOpen(true)}
                >
                  Schedule Demo
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <LandingFooter />

      {/* Calendly Modal */}
      <CalendlyModal 
        isOpen={isCalendlyOpen} 
        onClose={() => setIsCalendlyOpen(false)} 
      />

      {/* Contact Sales Modal */}
      <ContactSalesModal 
        isOpen={isContactSalesOpen} 
        onClose={() => setIsContactSalesOpen(false)} 
      />
    </div>
  )
}
