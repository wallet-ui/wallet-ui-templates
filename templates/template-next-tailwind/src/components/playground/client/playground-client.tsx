'use client'
import { useWalletUi } from '@wallet-ui/react'
import { getMonikerFromGenesisHash } from 'gill'
import { UiCard } from '../../ui/'
import { PlaygroundRunCommand } from './playground-run-command'
import { ErrorBoundary } from 'react-error-boundary'
import { PlaygroundError } from '../playground-error'

export function PlaygroundClient() {
  const { client } = useWalletUi()

  const commandMap = new Map<string, () => Promise<unknown>>()
    .set('getLatestBlockhash', () =>
      client.rpc
        .getLatestBlockhash()
        .send()
        .then((blockhash) => blockhash.value),
    )
    .set('getGenesisHash', () =>
      client.rpc
        .getGenesisHash()
        .send()
        .then((genesisHash) => ({
          genesisHash,
          cluster: getMonikerFromGenesisHash(genesisHash),
        })),
    )

  return (
    <UiCard title="Solana Client" open>
      <ErrorBoundary
        FallbackComponent={({ error }) => (
          <div>
            <PlaygroundError error={error} />
          </div>
        )}
        resetKeys={[]}
      >
        {Array.from(commandMap.entries()).map(([label, command]) => (
          <PlaygroundRunCommand key={label} command={command} label={label} />
        ))}
      </ErrorBoundary>
    </UiCard>
  )
}
