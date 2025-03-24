import { SolanaSignIn, type UiWallet, useWallets, useWalletUiAccount } from '@wallet-ui/react'
import { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { PlaygroundError } from './playground-error'
import { PlaygroundUiErrorPanel } from './ui/playground-ui-error-panel.tsx'
import { PlaygroundSignInSelectOption } from './playground-sign-in-select-option'
import { useError } from '../../hooks/use-error.tsx'
import { UiStack } from '../ui'

export function PlaygroundSignInList() {
  const wallets = useWallets()
  const [isSuccess, setIsSuccess] = useState(false)
  const { setAccount } = useWalletUiAccount()
  const { error, hasError, setError, resetError } = useError()

  function renderItem(wallet: UiWallet, index: number) {
    return (
      <ErrorBoundary fallbackRender={({ error }) => <PlaygroundError error={error} />} key={`wallet:${wallet.name}`}>
        <PlaygroundSignInSelectOption
          key={index}
          beforeSignIn={() => {
            setIsSuccess(false)
            resetError()
          }}
          onSignIn={(account) => {
            setAccount(account)
            setIsSuccess(true)
          }}
          onError={setError}
          wallet={wallet}
        />
      </ErrorBoundary>
    )
  }

  const supportedWallets = wallets.filter((wallet) => wallet.features.includes(SolanaSignIn))

  return (
    <UiStack>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {supportedWallets.map((wallet, index) => renderItem(wallet, index))}
      </div>
      {isSuccess ? "You've successfully signed in" : null}
      {hasError ? <PlaygroundUiErrorPanel error={error} onClose={() => resetError()} /> : null}
    </UiStack>
  )
}
