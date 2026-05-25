import type { Metadata } from 'next'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { PressReleaseFooter } from '@/components/shared/press-release-footer'
import { Card, CardContent } from '@/components/ui/card'

const sections = [
  { title: 'Data We Collect', body: 'Account information, usage analytics, and content you submit.' },
  { title: 'How We Use Data', body: 'To personalize your experience, improve search, and keep the platform secure.' },
  { title: 'Your Choices', body: 'You can manage email preferences and delete your account at any time.' },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarShell />
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#411530]">Privacy Policy</h1>
          <p className="mt-2 text-gray-600">How we collect, use, and protect your information.</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border-border bg-card">
          <CardContent className="p-6 space-y-4">
            <p className="text-xs text-muted-foreground">Last updated: March 16, 2026</p>
            {sections.map((section) => (
              <div key={section.title} className="rounded-lg border border-border bg-secondary/40 p-4">
                <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
      <PressReleaseFooter />
    </div>
  )
}
