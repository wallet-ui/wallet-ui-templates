import { UiCard } from '../../ui/'
import { PlaygroundClusterDropdown } from './playground-cluster-dropdown'
import { useWalletUiCluster } from '@wallet-ui/react'

export function PlaygroundCluster() {
  const { cluster, clusters } = useWalletUiCluster()
  return (
    <UiCard title="Clusters" open>
      <PlaygroundClusterDropdown />
      <pre>{JSON.stringify({ cluster, clusters }, null, 4)}</pre>
    </UiCard>
  )
}
