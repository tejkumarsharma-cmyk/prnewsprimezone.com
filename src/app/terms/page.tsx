import type { Metadata } from 'next'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { PressReleaseFooter } from '@/components/shared/press-release-footer'
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  { title: "Account Usage", body: "Keep your account secure and follow community guidelines." },
  {
    title: "Content Ownership",
    body: "You own the content you publish and grant the platform a license to display it.",
  },
  { title: "Acceptable Use", body: "No spam, harassment, or illegal content." },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarShell />
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#411530]">Terms of Service</h1>
          <p className="mt-2 text-gray-600">The rules and guidelines for using {SITE_CONFIG.name}.</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
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
  );
}
