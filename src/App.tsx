import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import WaiterView from './pages/WaiterView';
import KitchenDisplay from './pages/KitchenDisplay';
import BarDisplay from './pages/BarDisplay';
import ManagerDashboard from './pages/ManagerDashboard';

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid #2A2A2A',
            borderRadius: '12px',
          },
          success: {
            iconTheme: { primary: '#D4AF37', secondary: '#000' },
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
  );
}
