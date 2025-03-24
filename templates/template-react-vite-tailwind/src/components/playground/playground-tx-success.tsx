import { SolanaCluster } from '@wallet-ui/react'
import { getBase58Decoder, getExplorerLink, ReadonlyUint8Array } from 'gill'

export function PlaygroundTxSuccess({
  cluster,
  showExplorer = true,
  signature,
  title,
}: {
  cluster: SolanaCluster
  showExplorer?: boolean
  signature: Uint8Array | ReadonlyUint8Array
  title: string
}) {
  const transaction = getBase58Decoder().decode(signature)
  return (
    <div className="p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ">
      <div className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</div>
      <div className="space-y-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">Signature:</span>
        <blockquote className="text-sm font-mono text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 p-2 rounded border border-gray-200 dark:border-gray-700 break-all">
          {transaction}
        </blockquote>
      </div>
      {showExplorer ? (
        <div className="mt-3">
          <a
            href={getExplorerLink({ cluster: cluster.cluster, transaction })}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline text-sm"
          >
            View this transaction
          </a>{' '}
          <span className="text-sm text-gray-600 dark:text-gray-400">on Explorer</span>
        </div>
      ) : null}
    </div>
  )
}
