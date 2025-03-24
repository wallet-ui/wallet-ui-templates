import { useRoutes } from 'react-router'
import { PlaygroundAccount } from '../components/playground/account/playground-account.tsx'
import { PlaygroundClient } from '../components/playground/client/playground-client.tsx'
import { PlaygroundCluster } from '../components/playground/cluster/playground-cluster.tsx'

export function AppRoutes() {
  return useRoutes([
    { path: '/', element: <PlaygroundAccount /> },
    { path: '/client', element: <PlaygroundClient /> },
    { path: '/cluster', element: <PlaygroundCluster /> },
  ])
}
