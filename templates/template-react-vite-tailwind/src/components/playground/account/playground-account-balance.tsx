import { lamportsToSol } from 'gill'
import { useAccountBalance } from '../../../hooks/use-account-balance.tsx'

export function PlaygroundAccountBalance() {
  const balance = useAccountBalance()
  return (
    <span>Balance: {balance.isLoading ? '...' : `${balance.data ? lamportsToSol(balance.data.value) : '0'} SOL`}</span>
  )
}
