// Common types for the Unicorn application

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'viewer'
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  name: string
  description: string
  industry: string
  stage: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'growth'
  valuation?: number
  fundingRaised?: number
  employees?: number
  location: string
  website?: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

export interface FundraisingRound {
  id: string
  companyId: string
  roundType: 'pre-seed' | 'seed' | 'series-a' | 'series-b' | 'series-c' | 'growth'
  targetAmount: number
  raisedAmount: number
  minimumInvestment: number
  maximumInvestment?: number
  status: 'planning' | 'active' | 'completed' | 'cancelled'
  startDate: Date
  endDate?: Date
  investors: Investor[]
  documents: Document[]
  createdAt: Date
  updatedAt: Date
}

export interface Investor {
  id: string
  name: string
  type: 'angel' | 'vc' | 'pe' | 'corporate' | 'individual'
  investmentAmount: number
  status: 'interested' | 'committed' | 'invested' | 'declined'
  notes?: string
  contactInfo: ContactInfo
  createdAt: Date
  updatedAt: Date
}

export interface ContactInfo {
  email: string
  phone?: string
  linkedin?: string
  twitter?: string
  website?: string
}

export interface Document {
  id: string
  name: string
  type: 'pitch-deck' | 'financial-model' | 'business-plan' | 'term-sheet' | 'other'
  url: string
  size: number
  uploadedAt: Date
}

export interface AnalyticsData {
  totalCompanies: number
  activeRounds: number
  totalRaised: number
  averageRoundSize: number
  conversionRate: number
  topIndustries: IndustryStats[]
  monthlyTrends: MonthlyTrend[]
}

export interface IndustryStats {
  industry: string
  count: number
  percentage: number
  averageValuation: number
}

export interface MonthlyTrend {
  month: string
  companies: number
  funding: number
  rounds: number
}

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  company?: string
}

export interface CompanyForm {
  name: string
  description: string
  industry: string
  stage: string
  valuation?: number
  fundingRaised?: number
  employees?: number
  location: string
  website?: string
}

export interface FundraisingForm {
  companyId: string
  roundType: string
  targetAmount: number
  minimumInvestment: number
  maximumInvestment?: number
  startDate: string
  endDate?: string
}

// Navigation types
export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: NavItem[]
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Component props types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}
