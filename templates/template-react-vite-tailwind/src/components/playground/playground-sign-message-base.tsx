import { BaseButton, useWalletUiCluster } from '@wallet-ui/react'
import type { ReadonlyUint8Array } from 'gill'
import { useState } from 'react'
import { useError } from '../../hooks/use-error.tsx'

import { PlaygroundUiErrorPanel } from './ui/playground-ui-error-panel.tsx'
import { PlaygroundTxSuccess } from './playground-tx-success'
import { UiStack } from '../ui'

export function PlaygroundSignMessageBase({
  signMessage,
}: {
  signMessage(message: ReadonlyUint8Array): Promise<ReadonlyUint8Array>
}) {
  const { error, hasError, setError, resetError } = useError()
  const { cluster } = useWalletUiCluster()
  const [isSigningMessage, setIsSigningMessage] = useState(false)
  const [lastSignature, setLastSignature] = useState<ReadonlyUint8Array | undefined>()
  const [text, setText] = useState<string>()

  async function submit() {
    resetError()
    setIsSigningMessage(true)
    try {
      const signature = await signMessage(new TextEncoder().encode(text))
      setLastSignature(signature)
    } catch (e) {
      setLastSignature(undefined)
      setError(e)
    } finally {
      setIsSigningMessage(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await submit()
        }}
      >
        <UiStack>
          <div className="flex items-center gap-3">
            <input
              placeholder="Write a message to sign"
              onChange={(e) => setText(e.currentTarget.value)}
              value={text}
              className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <BaseButton
              label={isSigningMessage ? 'Signing...' : 'Sign Message'}
              disabled={!text || isSigningMessage}
              type="submit"
              size="sm"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            />
          </div>

          {lastSignature && (
            <PlaygroundTxSuccess
              cluster={cluster}
              showExplorer={false}
              signature={lastSignature}
              title="You Signed a Message!"
            />
          )}

          {hasError && (
            <PlaygroundUiErrorPanel error={error} onClose={() => resetError()} title="Failed to sign message" />
          )}
        </UiStack>
      </form>
    </div>
  )
}
