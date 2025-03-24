import { useWalletUiAccount } from '@wallet-ui/react'

import { ErrorBoundary } from 'react-error-boundary'
import { useError } from '../../hooks/use-error'

import { PlaygroundError } from './playground-error'
import { PlaygroundUiErrorPanel } from './ui/playground-ui-error-panel'
import { PlaygroundSignInSelectOption } from './playground-sign-in-select-option'
import { useState } from 'react'

export function PlaygroundSignInMenuButtons() {
  const { setAccount, wallet } = useWalletUiAccount()
  const [isSuccess, setIsSuccess] = useState(false)
  const { error, setError, hasError, resetError } = useError()

  if (!wallet) {
    return <PlaygroundError error={'No wallet selected'} />
  }

  return (
    <>
      <ErrorBoundary fallbackRender={({ error }) => <PlaygroundError error={error} />} key={`wallet:${wallet.name}`}>
        <PlaygroundSignInSelectOption
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
      {isSuccess ? "You've successfully signed in" : null}
      {hasError ? <PlaygroundUiErrorPanel error={error} onClose={() => resetError()} /> : null}
    </>
  )
}
