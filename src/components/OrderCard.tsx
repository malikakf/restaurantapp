import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChefHat, CheckCircle } from 'lucide-react';
import { Order } from '../types';
import { StatusBadge } from './StatusBadge';
import { useRestaurantStore } from '../store/useRestaurantStore';
import toast from 'react-hot-toast';

interface OrderCardProps {
  order: Order;
  accentColor?: string;
}

function useTimer(startTime: Date) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const update = () => setElapsed(Math.floor((Date.now() - startTime.getTime()) / 1000));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startTime]);

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function OrderCard({ order, accentColor = '#F97316' }: OrderCardProps) {
  const updateOrderStatus = useRestaurantStore(s => s.updateOrderStatus);
  const timer = useTimer(order.createdAt);

  const handleStart = () => {
    updateOrderStatus(order.id, 'in-progress');
    toast.success(`Table ${order.tableNumber} order started!`);
  };

  const handleReady = () => {
    updateOrderStatus(order.id, 'ready');
    toast.success(`Table ${order.tableNumber} order is ready! 🎉`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="glass-card p-5 flex flex-col gap-4"
      style={{ borderColor: order.status === 'new' ? `${accentColor}40` : undefined }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wider">Table</p>
          <p className="text-4xl font-black text-white">{order.tableNumber}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={order.status} />
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <Clock size={14} />
            <span className="font-mono">{timer}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-2">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <span className="text-white text-sm">{item.menuItem.emoji} {item.menuItem.name}</span>
            <span className="text-gray-400 text-sm font-medium">×{item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-1">
        {order.status === 'new' && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm text-white"
            style={{ backgroundColor: accentColor }}
          >
            <ChefHat size={16} />
            Start Cooking
          </motion.button>
        )}
        {order.status === 'in-progress' && (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleReady}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm bg-green-500 text-white"
          >
            <CheckCircle size={16} />
            Mark Ready
          </motion.button>
        )}
        {order.status === 'ready' && (
          <div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCircle size={16} />
            Ready for Pickup
          </div>
        )}
      </div>
    </motion.div>
  );
}
