import React, { useState } from 'react'
import { FileText, ArrowLeft, ShieldCheck, Scale, Globe, UserCheck, HelpCircle } from 'lucide-react'
import { Button } from './ui/Button'
import { useAppStore } from '../store/useAppStore'

export const Terms: React.FC = () => {
  const { setView } = useAppStore()
  const [activeSection, setActiveSection] = useState('welcome')

  const sections = [
    { id: 'welcome', label: '1. Welcome & Acceptance', icon: <Globe className="w-4 h-4" /> },
    {
      id: 'eligibility',
      label: '2. Eligibility & Accounts',
      icon: <UserCheck className="w-4 h-4" />,
    },
    { id: 'usage', label: '3. Use of Services', icon: <FileText className="w-4 h-4" /> },
    { id: 'privacy', label: '4. Privacy & Safety', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'liability', label: '5. Liability & Warranty', icon: <Scale className="w-4 h-4" /> },
    { id: 'support', label: '6. Support & Contact', icon: <HelpCircle className="w-4 h-4" /> },
  ]

  const handleScrollTo = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // offset for fixed header
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb & Back button */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="text"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => {
              setView('home')
              window.scrollTo(0, 0)
            }}
            className="text-slate-600 hover:text-brand-pink p-0"
          >
            Back to Home
          </Button>
          <span className="text-xs font-semibold text-slate-400 font-sans uppercase">
            Last updated: June 12, 2026
          </span>
        </div>

        {/* Header Title */}
        <div className="text-left mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-brand-blue font-sans">
            Terms & Conditions
          </h1>
          <p className="text-slate-500 mt-3 text-base font-body max-w-2xl">
            Please read these terms and conditions carefully before using the Smart Academy
            platform. By using our website and services, you agree to comply with and be bound by
            these terms.
          </p>
        </div>

        {/* Layout: Sidebar + Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sticky Sidebar (Desktop only) */}
          <div className="hidden lg:block sticky top-24 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
              Table of Contents
            </h4>
            <div className="space-y-1">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleScrollTo(sec.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all ${
                    activeSection === sec.id
                      ? 'bg-brand-pink/10 text-brand-pink'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-blue'
                  }`}
                >
                  {sec.icon}
                  {sec.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Section 1 */}
            <div
              id="welcome"
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 text-brand-blue">
                <Globe className="w-6 h-6" />
                <h3 className="text-xl font-extrabold font-sans">1. Welcome & Acceptance</h3>
              </div>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                Welcome to Smart Academy. By accessing or using our website, services, and online
                learning modules, you agree to be bound by these Terms and Conditions. If you do not
                agree with any part of these terms, please do not use our services.
              </p>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                We reserve the right, at our sole discretion, to change, modify, add, or remove
                portions of these Terms and Conditions at any time. We recommend checking this page
                periodically for updates. Continued use of the website following the posting of
                changes constitutes acceptance of those changes.
              </p>
            </div>

            {/* Section 2 */}
            <div
              id="eligibility"
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 text-brand-blue">
                <UserCheck className="w-6 h-6" />
                <h3 className="text-xl font-extrabold font-sans">2. Eligibility & Accounts</h3>
              </div>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                Our services are designed for students of varying age groups. Parents or legal
                guardians must register on behalf of students under the age of 18. By registering,
                you confirm that all information provided is accurate, current, and complete.
              </p>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials
                (username and password) and for restricting access to your devices. You agree to
                accept responsibility for all activities that occur under your account.
              </p>
            </div>

            {/* Section 3 */}
            <div
              id="usage"
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 text-brand-blue">
                <FileText className="w-6 h-6" />
                <h3 className="text-xl font-extrabold font-sans">3. Use of Services</h3>
              </div>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                Smart Academy grants you a limited, non-exclusive, non-transferable, revocable
                license to access and use our resources strictly for personal, non-commercial
                education.
              </p>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of
                the service, use of the service, or access to the service without express written
                permission by us. Any unauthorized use terminates the permission or license granted
                by us.
              </p>
            </div>

            {/* Section 4 */}
            <div
              id="privacy"
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 text-brand-blue">
                <ShieldCheck className="w-6 h-6" />
                <h3 className="text-xl font-extrabold font-sans">4. Privacy & Safety</h3>
              </div>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                Your privacy and the safety of our students are of paramount importance. Please
                refer to our Privacy Policy to understand how we collect, use, and protect personal
                information.
              </p>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                Interactions within classes must remain respectful, collaborative, and safe. Smart
                Academy maintains a zero-tolerance policy against cyberbullying, harassment, and
                inappropriate content. Violators may have their accounts suspended immediately
                without a refund.
              </p>
            </div>

            {/* Section 5 */}
            <div
              id="liability"
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 text-brand-blue">
                <Scale className="w-6 h-6" />
                <h3 className="text-xl font-extrabold font-sans">5. Liability & Warranty</h3>
              </div>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                Smart Academy services are provided on an "as is" and "as available" basis without
                warranties of any kind. We do not guarantee uninterrupted access or that all
                learning materials will be error-free.
              </p>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                To the fullest extent permitted by applicable law, Smart Academy shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages arising
                out of your access to or use of our services.
              </p>
            </div>

            {/* Section 6 */}
            <div
              id="support"
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3 text-brand-blue">
                <HelpCircle className="w-6 h-6" />
                <h3 className="text-xl font-extrabold font-sans">6. Support & Contact</h3>
              </div>
              <p className="text-slate-500 font-body text-sm leading-relaxed">
                For any questions regarding these Terms & Conditions, support tickets, or billing
                inquiries, please contact our help desk at:
              </p>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-150 text-sm font-sans font-semibold text-slate-700 space-y-1">
                <div>Email: support@smartacademy.com</div>
                <div>Phone: +1 (800) 123-4567</div>
                <div>Address: 123 Education Lane, Learning City, LC 90210</div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="flex justify-center pt-4">
              <Button
                variant="pink"
                size="lg"
                onClick={() => {
                  setView('home')
                  window.scrollTo(0, 0)
                }}
              >
                Accept & Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
