import { BaseButton, type UiWallet, type UiWalletAccount, useSignIn, WalletUiIcon } from '@wallet-ui/react'
import React, { useCallback, useState } from 'react'

export function PlaygroundSignInSelectOption({
  beforeSignIn,
  onSignIn,
  onError,
  wallet,
}: {
  onError(err: unknown): void
  beforeSignIn(): void
  onSignIn(account: UiWalletAccount | undefined): void
  wallet: UiWallet
}) {
  const signIn = useSignIn(wallet)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const handleSignInClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault()
      try {
        setIsSigningIn(true)
        beforeSignIn()
        try {
          const { account } = await signIn({
            statement: 'You will enjoy being signed in.',
          })
          onSignIn(account)
        } finally {
          setIsSigningIn(false)
        }
      } catch (e) {
        onError(e)
      }
    },
    [signIn, onSignIn, onError],
  )
  return (
    <BaseButton
      label={wallet.name}
      leftSection={<WalletUiIcon wallet={wallet} />}
      onClick={handleSignInClick}
      value={wallet.name}
      disabled={isSigningIn}
    />
  )
}
