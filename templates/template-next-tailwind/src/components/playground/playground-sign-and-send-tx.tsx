import {
  BaseButton,
  getUiWalletAccountStorageKey,
  type UiWalletAccount,
  useWalletAccountTransactionSendingSigner,
  useWallets,
  useWalletUi,
  useWalletUiCluster,
} from '@wallet-ui/react'
import {
  assertIsTransactionMessageWithSingleSendingSigner,
  createTransactionMessage,
  pipe,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signAndSendTransactionMessageWithSigners,
} from 'gill'
import { useMemo, useState } from 'react'
import { solStringToLamports } from '../../lib/sol-string-to-lamports'
import { useError } from '../../hooks/use-error'

import { PlaygroundUiErrorPanel } from './ui/playground-ui-error-panel.tsx'
import { PlaygroundTxSuccess } from './playground-tx-success'
import { UiStack } from '../ui'

export function PlaygroundSignAndSendTx({ account }: { account: UiWalletAccount }) {
  const { error, hasError, setError, resetError } = useError()
  const { cluster } = useWalletUiCluster()
  const { client } = useWalletUi()
  const wallets = useWallets()
  const [isSendingTransaction, setIsSendingTransaction] = useState(false)
  const [lastSignature, setLastSignature] = useState<Uint8Array | undefined>()
  const [solQuantityString, setSolQuantityString] = useState<string>('')
  const [recipientAccountStorageKey, setRecipientAccountStorageKey] = useState<string | undefined>()

  const recipientAccount = useMemo(() => {
    if (recipientAccountStorageKey) {
      for (const wallet of wallets) {
        for (const account of wallet.accounts) {
          if (getUiWalletAccountStorageKey(account) === recipientAccountStorageKey) {
            return account
          }
        }
      }
    }
  }, [recipientAccountStorageKey, wallets])
  const transactionSendingSigner = useWalletAccountTransactionSendingSigner(account, cluster.id)

  async function submit() {
    resetError()
    setIsSendingTransaction(true)
    try {
      const amount = solStringToLamports(solQuantityString)
      console.log('amount', amount)
      if (!recipientAccount) {
        throw new Error('The address of the recipient could not be found')
      }
      const { value: latestBlockhash } = await client.rpc.getLatestBlockhash({ commitment: 'confirmed' }).send()
      const message = pipe(
        createTransactionMessage({ version: 0 }),
        (m) => setTransactionMessageFeePayerSigner(transactionSendingSigner, m),
        (m) => setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, m),
        // m =>
        //     appendTransactionMessageInstruction(
        // TODO: Gill does not export this getTransferSolInstruction?
        //         getTransferSolInstruction({
        //             amount,
        //             destination: address(recipientAccount.address),
        //             source: transactionSendingSigner,
        //         }),
        //         m,
        //     ),
      )
      assertIsTransactionMessageWithSingleSendingSigner(message)
      const signature = await signAndSendTransactionMessageWithSigners(message)

      setLastSignature(signature)
      setSolQuantityString('')
    } catch (e) {
      setLastSignature(undefined)
      setError(e as unknown)
    } finally {
      setIsSendingTransaction(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await submit()
        }}
        className="w-full"
      >
        <UiStack>
          <div className="flex items-center gap-2">
            <div className="w-[90px]">
              <input
                disabled={isSendingTransaction}
                placeholder="Amount"
                onChange={(e) => setSolQuantityString(e.currentTarget.value)}
                type="number"
                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                value={solQuantityString}
              />
            </div>

            <select
              disabled={isSendingTransaction}
              value={recipientAccount ? getUiWalletAccountStorageKey(recipientAccount) : undefined}
              onChange={(e) => setRecipientAccountStorageKey(e.currentTarget.value)}
              className="flex-1 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value={undefined}>Select a Connected Account</option>
              {wallets.flatMap((wallet) =>
                wallet.accounts
                  .filter(({ chains }) => chains.includes(cluster.id))
                  .map((account) => {
                    const key = getUiWalletAccountStorageKey(account)
                    return (
                      <option key={key} value={key}>
                        {account.address}
                      </option>
                    )
                  }),
              )}
            </select>

            <BaseButton
              label={isSendingTransaction ? 'Sending...' : 'Transfer'}
              disabled={solQuantityString === '' || !recipientAccount || isSendingTransaction}
              type="submit"
              size="sm"
              className="px-4 py-1 border border-gray-300/50  disabled:bg-gray-400/50 disabled:cursor-not-allowed rounded-md"
            />
          </div>

          {lastSignature && (
            <PlaygroundTxSuccess cluster={cluster} signature={lastSignature} title="You transferred SOL!" />
          )}

          {hasError && <PlaygroundUiErrorPanel error={error} onClose={() => resetError()} title="Transfer failed" />}
        </UiStack>
      </form>
    </div>
  )
}
