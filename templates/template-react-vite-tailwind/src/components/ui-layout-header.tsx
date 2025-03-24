import { Link } from 'react-router'
import { UiLogoLink } from './ui-logo-link'
import { WalletUiClusterDropdown, WalletUiDropdown } from '@wallet-ui/react'

export interface UiLayoutHeaderLink {
  label: string
  to: string
}

export function UiLayoutHeader({ links, name }: { links: UiLayoutHeaderLink[]; name: string }) {
  return (
    <header className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
      <div className="flex justify-start items-center gap-4">
        <UiLogoLink name={name} />
        <nav className="flex gap-4">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
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
