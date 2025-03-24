'use client'
import '@wallet-ui/tailwind/index.css'
import { ReactQueryProvider } from './react-query-provider'
import {
  createSolanaDevnet,
  createSolanaLocalnet,
  createSolanaTestnet,
  createWalletUiConfig,
  WalletUi,
} from '@wallet-ui/react'

const config = createWalletUiConfig({
  clusters: [createSolanaDevnet(), createSolanaLocalnet(), createSolanaTestnet()],
})

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <WalletUi config={config}>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </WalletUi>
  )
}

declare global {
  interface BigInt {
    toJSON(): string
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString()
}
