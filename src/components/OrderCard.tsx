import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ChefHat, CheckCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import StatusBadge from './StatusBadge';

interface Props {
  order: Order;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  accentColor?: string;
}

function useElapsedTime(date: Date) {
  const [elapsed, setElapsed] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = Math.floor((Date.now() - date.getTime()) / 1000);
      if (diff < 60) setElapsed(`${diff}s`);
      else if (diff < 3600) setElapsed(`${Math.floor(diff / 60)}m ${diff % 60}s`);
      else setElapsed(`${Math.floor(diff / 3600)}h ${Math.floor((diff % 3600) / 60)}m`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [date]);

  return elapsed;
}

export default function OrderCard({ order, onUpdateStatus, accentColor = '#F97316' }: Props) {
  const elapsed = useElapsedTime(order.createdAt);

  const itemsTotal = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="card overflow-hidden"
      style={{ borderColor: order.status === 'new' ? `${accentColor}40` : '#2A2A2A' }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid #2A2A2A' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            {order.tableNumber}
          </div>
          <div>
            <p className="text-white font-bold">Table {order.tableNumber}</p>
            <p className="text-[#9CA3AF] text-xs">{itemsTotal} item{itemsTotal !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <StatusBadge status={order.status} pulse />
          <div className="flex items-center gap-1 text-[#9CA3AF] text-xs">
            <Clock size={10} />
            <span>{elapsed}</span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-4 space-y-2">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span className="text-base">{item.menuItem.emoji}</span>
            <span className="text-white flex-1">{item.menuItem.name}</span>
            <span className="text-[#9CA3AF] font-medium">×{item.quantity}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      {order.status !== 'served' && (
        <div className="px-4 pb-4 flex gap-2">
          {order.status === 'new' && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onUpdateStatus(order.id, 'in-progress')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
            >
              <ChefHat size={15} />
              Start Cooking
            </motion.button>
          )}
          {order.status === 'in-progress' && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onUpdateStatus(order.id, 'ready')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-green-500/20 text-green-400 border border-green-500/30 transition-all"
            >
              <CheckCircle size={15} />
              Mark Ready
            </motion.button>
          )}
          {order.status === 'ready' && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onUpdateStatus(order.id, 'served')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-gray-500/20 text-gray-300 border border-gray-500/30 transition-all"
            >
              <CheckCircle size={15} />
              Mark Served
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
}
