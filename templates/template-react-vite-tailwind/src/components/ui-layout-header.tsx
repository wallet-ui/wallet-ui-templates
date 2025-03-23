import { Link } from 'react-router'
import { UiLogoLink } from './ui-logo-link'

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
      <div>
        <a href="https://github.com/wallet-ui/wallet-ui" target="_blank" rel="noreferrer">
          <img src="https://img.shields.io/github/stars/wallet-ui/wallet-ui?style=social" alt="GitHub Repo stars" />
        </a>
      </div>
    </header>
  )
}
