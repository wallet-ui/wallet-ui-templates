import '@wallet-ui/tailwind/index.css'
import {
  createSolanaDevnet,
  createSolanaLocalnet,
  createSolanaTestnet,
  createWalletUiConfig,
  WalletUi,
} from '@wallet-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const config = createWalletUiConfig({
  clusters: [createSolanaDevnet(), createSolanaLocalnet(), createSolanaTestnet()],
})
const queryClient = new QueryClient()

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <WalletUi config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WalletUi>
  )
}
