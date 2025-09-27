import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Landing } from '@/pages/Landing'
import { HomePage } from '@/pages/HomePage'
import { Dashboard } from '@/pages/Dashboard'
import { Campaigns } from '@/pages/Campaigns'
import { CampaignCreate } from '@/pages/CampaignCreate'
import { CampaignEdit } from '@/pages/CampaignEdit'
import { PitchSimulator } from '@/pages/PitchSimulator'
import { SettingsPage } from '@/pages/SettingsPage'
import { DesignSystemPage } from '@/pages/DesignSystemPage'
import { UIComponentsPage } from '@/pages/UIComponentsPage'
import { SignIn, SignUp, ForgotPassword } from '@/pages/auth'
import { PrivacyPolicy, TermsOfService, CookiePolicy } from '@/pages/legal'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/app/*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/new" element={<CampaignCreate />} />
            <Route path="/campaigns/edit/:id" element={<CampaignEdit />} />
            <Route path="/pitch-simulator" element={<PitchSimulator />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/ui-components" element={<UIComponentsPage />} />
          </Routes>
        </Layout>
        
      } />
    </Routes>
  )
}

export default App
