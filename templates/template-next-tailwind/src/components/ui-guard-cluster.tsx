import { useWalletUi, useWalletUiCluster } from '@wallet-ui/react'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

/**
 * Guards the cluster by checking if the client is connected to the cluster.
 * @param children - The node to render if the cluster is connected.
 * @param fallback - The node to render if the cluster is not connected.
 *
 * @example
 * <UiGuardCluster fallback={<div>Can't connect to cluster</div>}>
 *   <div>Connected to cluster</div>
 * </UiGuardCluster>
 */
export function UiGuardCluster({
  children,
  fallback = <UiGuardFallback />,
}: {
  fallback?: React.ReactNode
  children?: React.ReactNode
}) {
  const query = useGuardCluster()
  if (query.isLoading) {
    return null
  }
  if (query.isError || !query.data) {
    return fallback
  }
  return children ?? null
}

function UiGuardFallback() {
  const { cluster } = useWalletUiCluster()

  return `Error connecting to cluster ${cluster.label}`
}

function useGuardCluster() {
  const { cluster } = useWalletUiCluster()
  const { client } = useWalletUi()

  return useQuery({
    queryKey: ['cluster', cluster.id],
    queryFn: async () => {
      return await client.rpc
        .getGenesisHash()
        .send()
        .then((genesisHash) => !!genesisHash)
    },
    retry: false,
  })
}
