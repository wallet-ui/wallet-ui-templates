'use client'
import Link from 'next/link'
import { UiLogoLink } from './ui-logo-link'
import dynamic from 'next/dynamic'

const WalletUiClusterDropdown = dynamic(() => import('@wallet-ui/react').then((mod) => mod.WalletUiClusterDropdown), {
  ssr: false,
})
const WalletUiDropdown = dynamic(() => import('@wallet-ui/react').then((mod) => mod.WalletUiDropdown), {
  ssr: false,
})

export interface UiLayoutHeaderLink {
  label: string
  to: string
}

export function UiLayoutHeader({ links, name }: { links: UiLayoutHeaderLink[]; name: string }) {
  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
      <div className="flex justify-start items-center gap-4">
        <UiLogoLink name={name} to="/" />
        <nav className="flex gap-4">
          {links.map((link) => (
            <Link key={link.to} href={link.to}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex gap-4">
        <WalletUiDropdown size="sm" />
        <WalletUiClusterDropdown size="sm" />
      </div>
    </header>
  )
}
