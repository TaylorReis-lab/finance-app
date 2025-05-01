import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from './components/shared/Loading'

const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Transactions = lazy(() => import('@/pages/Transactions'))
const Reports = lazy(() => import('@/pages/Reports'))
const Import = lazy(() => import('@/pages/Import'))
const Settings = lazy(() => import('@/pages/Settings'))

const AppRoutes = () => (
  <Suspense fallback={<Loading fullScreen />}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/import" element={<Import />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </Suspense>
)

export default AppRoutes