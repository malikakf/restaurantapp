import { motion } from 'framer-motion';
import { OrderStatus } from '../types';

interface StatusBadgeProps {
  status: OrderStatus;
}

const statusConfig = {
  new: { label: 'NEW', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50', pulse: true },
  'in-progress': { label: 'IN PROGRESS', bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50', pulse: false },
  ready: { label: 'READY', bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50', pulse: false },
  delivered: { label: 'DELIVERED', bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/50', pulse: false },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <div className={`relative inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold tracking-wider ${config.bg} ${config.text} ${config.border}`}>
      {config.pulse && (
        <motion.span
          className="absolute inset-0 rounded-full bg-red-500/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <span className="relative">{config.label}</span>
    </div>
  );
}
