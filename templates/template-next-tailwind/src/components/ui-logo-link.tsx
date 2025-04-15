import Link from 'next/link'
import { UiLogo } from './ui-logo'

export function UiLogoLink({ to = '/', name }: { to?: string; name: string }) {
  return (
    <Link href={to}>
      <UiLogo name={name} />
    </Link>
  )
}
