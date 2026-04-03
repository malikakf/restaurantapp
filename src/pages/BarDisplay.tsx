import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, GlassWater } from 'lucide-react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { OrderStatus } from '../types';
import OrderCard from '../components/OrderCard';

export default function BarDisplay() {
  const navigate = useNavigate();
  const { orders, updateOrderStatus } = useRestaurantStore();
  const [flash, setFlash] = useState(false);
  const [prevCount, setPrevCount] = useState(0);

  const barOrders = orders
    .filter((o) => o.type !== 'food' && o.status !== 'served')
    .sort((a, b) => {
      const priority: Record<OrderStatus, number> = { new: 0, 'in-progress': 1, ready: 2, served: 3 };
      return priority[a.status] - priority[b.status] || a.createdAt.getTime() - b.createdAt.getTime();
    });

  const newCount = barOrders.filter((o) => o.status === 'new').length;

  useEffect(() => {
    if (newCount > prevCount) {
      setFlash(true);
      setTimeout(() => setFlash(false), 600);
    }
    setPrevCount(newCount);
  }, [newCount, prevCount]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen bg-[#0A0A0A] flex flex-col transition-colors duration-300 ${flash ? 'bg-blue-950/30' : ''}`}
      style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)',
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              <GlassWater size={22} className="text-blue-400" />
              <div>
                <h1 className="text-white font-bold text-lg">Bar</h1>
                <p className="text-[#9CA3AF] text-xs">{barOrders.length} active orders</p>
              </div>
            </div>
          </div>
          {newCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-blue-400 font-bold text-sm">{newCount} new</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Orders */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence mode="popLayout">
          {barOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-[#9CA3AF]"
            >
              <GlassWater size={48} className="mb-4 opacity-20" />
              <p className="font-medium">Bar is clear!</p>
              <p className="text-sm mt-1">No active drink orders</p>
            </motion.div>
          ) : (
            barOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={updateOrderStatus}
                accentColor="#3B82F6"
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
