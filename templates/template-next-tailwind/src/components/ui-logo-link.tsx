import Link from 'next/link'
import { UiLogo } from './ui-logo'

export function UiLogoLink({ href = '/', name }: { href?: string; name: string }) {
  return (
    <Link href={href}>
      <UiLogo name={name} />
    </Link>
  )
}
