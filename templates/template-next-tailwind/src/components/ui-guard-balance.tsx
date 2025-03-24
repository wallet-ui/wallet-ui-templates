import React from 'react'
import {useAccountBalance} from '../hooks/use-account-balance.tsx'

/**
 * Guards the account by checking if the account has a balance greater than 0.
 * @param children - The node to render if the balance is greater than 0.
 * @param fallback - The node to render if the balance is less than or equal to 0.
 *
 * @example
 * <UiGuardBalance fallback={<div>You don't have any SOL</div>}>
 *   <div>Use your balance here!</div>
 * </UiGuardBalance>
 */
export function UiGuardBalance({
  children,
  fallback = 'Send or airdrop some SOL to your account to continue',
}: {
  fallback?: React.ReactNode
  children?: React.ReactNode
}) {
  const query = useAccountBalance()
  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data?.value || Number(query.data.value) <= 0) {
    return fallback
  }
  return children ?? null
}
