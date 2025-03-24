import { useWalletUi } from '@wallet-ui/react'
import { useQuery } from '@tanstack/react-query'
import { address } from 'gill'

export function useAccountBalance() {
  const { account, accountKeys, client } = useWalletUi()

  return useQuery({
    queryKey: ['account-balance', accountKeys],
    queryFn: async () => {
      if (!account) {
        return undefined
      }
      return await client.rpc.getBalance(address(account.address)).send()
    },
  })
}
