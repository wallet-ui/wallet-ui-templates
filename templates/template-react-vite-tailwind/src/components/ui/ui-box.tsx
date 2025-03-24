import { HTMLAttributes } from 'react'

export type BoxProps = HTMLAttributes<HTMLDivElement>

export function UiBox({ children, style = {}, ...props }: BoxProps) {
  return (
    <div style={{ ...style }} {...props}>
      {children}
    </div>
  )
}
