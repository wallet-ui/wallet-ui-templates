import { Link } from 'react-router'
import { UiLogo } from './ui-logo'

export function UiLogoLink({ href = '/', name }: { href?: string; name: string }) {
  return (
    <Link to={href}>
      <UiLogo name={name} />
    </Link>
  )
}
