import { UiGroup, UiPanel, UiStack } from '../../ui'
import { WalletUiClusterDropdown, WalletUiDropdown } from '@wallet-ui/react'
import { UiGuardCluster } from '../../ui-guard-cluster.tsx'
import { PlaygroundAccountBalance } from './playground-account-balance.tsx'
import { UiGuardBalance } from '../../ui-guard-balance.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import { PlaygroundErrorBoundaryNotSupported } from '../playground-error-boundary-not-supported.tsx'
import { PlaygroundSignAndSendTx } from '../playground-sign-and-send-tx.tsx'
import { WalletUiAccountSignMessageLoader } from '../wallet-ui-account-sign-message-loader.tsx'
import { PlaygroundSignMessageBase } from '../playground-sign-message-base.tsx'
import { PlaygroundSignInMenuButtons } from '../playground-sign-in-menu-buttons.tsx'
import { UiGuardAccount } from '../../ui-guard-account.tsx'

export function PlaygroundAccount() {
  return (
    <UiGuardAccount
      fallback={<WalletUiDropdown />}
      render={({ account, accountKeys }) => (
        <UiStack>
          <UiPanel title="Sign And Send Tx">
            <UiGroup>
              <WalletUiDropdown />
              <WalletUiClusterDropdown />
              <UiGuardCluster>
                <PlaygroundAccountBalance />
              </UiGuardCluster>
            </UiGroup>
          </UiPanel>
          <UiPanel title="Sign And Send Tx">
            <UiGuardCluster>
              <UiGuardBalance>
                <ErrorBoundary FallbackComponent={PlaygroundErrorBoundaryNotSupported} resetKeys={accountKeys}>
                  <PlaygroundSignAndSendTx account={account} />
                </ErrorBoundary>
              </UiGuardBalance>
            </UiGuardCluster>
          </UiPanel>
          <UiPanel title="Sign Message">
            <ErrorBoundary FallbackComponent={PlaygroundErrorBoundaryNotSupported} resetKeys={accountKeys}>
              <WalletUiAccountSignMessageLoader
                account={account}
                render={({ signMessage }) => {
                  return <PlaygroundSignMessageBase signMessage={signMessage} />
                }}
              />
            </ErrorBoundary>
          </UiPanel>
          <UiPanel title="Sign In">
            <ErrorBoundary FallbackComponent={PlaygroundErrorBoundaryNotSupported} resetKeys={accountKeys}>
              <PlaygroundSignInMenuButtons />
            </ErrorBoundary>
          </UiPanel>
          <pre className="text-xs font-mono text-center">
            {JSON.stringify(`accountKeys: [${accountKeys.join(', ')}]`)}
          </pre>
        </UiStack>
      )}
    />
  )
}
