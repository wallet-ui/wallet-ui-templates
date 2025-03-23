import { AppRoutes } from './app-routes.tsx'
import { AppProviders } from '../components/app-providers.tsx'
import { UiLayout } from '../components/ui-layout.tsx'
import { UiLayoutHeaderLink } from '../components/ui-layout-header.tsx'

const name = 'Wallet UI'
const footer = (
  <a href="https://github.com/wallet-ui/wallet-ui" target="_blank" rel="noreferrer">
    github.com/wallet-ui/wallet-ui
  </a>
)
const links: UiLayoutHeaderLink[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
]

export function App() {
  return (
    <AppProviders>
      <UiLayout footer={footer} links={links} name={name}>
        <AppRoutes />
      </UiLayout>
    </AppProviders>
  )
}
