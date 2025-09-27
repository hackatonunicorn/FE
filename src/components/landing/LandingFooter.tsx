import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sparkles, Mail, Twitter, Linkedin, Github, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui'

export function LandingFooter() {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'API', href: '#' },
      { label: 'Integrations', href: '#' },
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
    Resources: [
      { label: 'Documentation', href: '#' },
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Contact', href: '#contact' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/privacy#gdpr' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  const sendToTelegram = async (email: string) => {
    const message = `
📧 *New Newsletter Subscription*

• Email: ${email}
• Date: ${new Date().toLocaleString()}
• Source: Website Footer
    `

    try {
      const response = await fetch(`https://api.telegram.org/bot8325604808:AAEYsxbMVcX54rg6WzxOWaKs6NXLH8ohoSo/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '-4988139314',
          text: message,
          parse_mode: 'Markdown'
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      return true
    } catch (error) {
      console.error('Error sending to Telegram:', error)
      return false
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    try {
      const success = await sendToTelegram(email)
      if (success) {
        setIsSubscribed(true)
        setEmail('')
        // Reset success state after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000)
      }
    } catch (error) {
      console.error('Subscription error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Unicorn</h3>
                  <p className="text-sm text-gray-400">AI Fundraising Platform</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Transform your fundraising process with AI-powered investor matching, 
                automated outreach, and intelligent analytics. Join 1,200+ startups 
                who've raised over $500M.
              </p>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3">Stay updated</h4>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Button 
                    type="submit"
                    size="sm" 
                    className="px-4"
                    disabled={isSubmitting || !email}
                  >
                    {isSubscribed ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Mail className="h-4 w-4" />
                    )}
                  </Button>
                </form>
                {isSubscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-xs mt-2"
                  >
                    Successfully subscribed!
                  </motion.p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links], index) => (
            <div key={title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h4 className="text-sm font-semibold mb-4">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © {currentYear} Unicorn. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <Link to="/auth/signin" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sign In
              </Link>
              <Link to="/auth/signup">
                <Button size="sm" variant="outline" className="border-gray-600 text-white hover:bg-gray-800" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
