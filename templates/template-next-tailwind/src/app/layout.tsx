import type { Metadata } from 'next'
import './globals.css'
import { UiLayout } from '@/components/ui-layout'
import { AppProviders } from '@/components/app-providers'
import { UiLayoutHeaderLink } from '@/components/ui-layout-header'

const name = 'Wallet UI'
const footer = (
  <a href="https://github.com/wallet-ui/wallet-ui" target="_blank" rel="noreferrer">
    github.com/wallet-ui/wallet-ui
  </a>
)
const links: UiLayoutHeaderLink[] = [
  { label: 'Account', to: '/' },
  { label: 'Client', to: '/client' },
  { label: 'Cluster', to: '/cluster' },
]

export const metadata: Metadata = {
  title: `${name} - Next/Tailwind template`,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased h-full">
        <AppProviders>
          <UiLayout links={links} name={name} footer={footer}>
            {children}
          </UiLayout>
        </AppProviders>
      </body>
    </html>
  )
}
