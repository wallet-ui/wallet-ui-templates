export function UiLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2">
      <img src="/logo.png" alt={`${name} logo`} className="w-8 h-8" />
      <span className="text-2xl font-bold">{name}</span>
    </div>
  )
}
