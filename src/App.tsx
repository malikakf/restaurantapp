import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import Landing from './pages/Landing'
import WaiterView from './pages/WaiterView'
import KitchenDisplay from './pages/KitchenDisplay'
import BarDisplay from './pages/BarDisplay'
import ManagerDashboard from './pages/ManagerDashboard'

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#FFFFFF',
            border: '1px solid #2A2A2A',
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/waiter" element={<WaiterView />} />
          <Route path="/kitchen" element={<KitchenDisplay />} />
          <Route path="/bar" element={<BarDisplay />} />
          <Route path="/manager" element={<ManagerDashboard />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default App
