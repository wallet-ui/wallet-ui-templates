import { useWalletUiAccount, WalletUiAccountInfo, WalletUiDropdown } from '@wallet-ui/react'
import React from 'react'

/**
 * Guards the account by checking if the account is connected.
 * @param children - The node to render if the account is connected.
 * @param fallback - The node to render if the account is not connected.
 *
 * @example
 * <UiGuardAccount
 *   fallback={<div>Connect your wallet to continue</div>}
 *   render={({ account, accountKeys, wallet }) => (
 *     <div>
 *       <span>Account: {account.address}</span>
 *       <span>Wallet: {wallet.name}</span>
 *       <span>Account keys: {accountKeys.join(', ')}</span>
 *     </div>
 *   )}
 * />
 */
export function UiGuardAccount({
  fallback = <WalletUiDropdown />,
  render,
}: {
  fallback?: React.ReactNode
  render: (info: WalletUiAccountInfo) => React.ReactNode
}) {
  const { account, accountKeys, wallet } = useWalletUiAccount()

  return account ? render({ account, accountKeys, wallet }) : fallback
}
