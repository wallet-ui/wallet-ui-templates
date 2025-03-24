'use client'

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
