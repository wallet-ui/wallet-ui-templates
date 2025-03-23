import { UiLayoutHeader, UiLayoutHeaderLink } from '@/components/ui-layout-header'

export function UiLayout({
  children,
  footer,
  links,
  name,
}: {
  children: React.ReactNode
  footer: React.ReactNode
  links: UiLayoutHeaderLink[]
  name: string
}) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <UiLayoutHeader links={links} name={name} />
      <main className="p-4 flex-1 h-full overflow-y-auto">{children}</main>
      <footer className="p-4 flex justify-center items-center border-t border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
        {footer}
      </footer>
    </div>
  )
}
