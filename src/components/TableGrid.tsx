import { motion } from 'framer-motion';
import { Table, TableStatus } from '../types';
import { Users } from 'lucide-react';

interface Props {
  tables: Table[];
  selectedId?: string | null;
  onSelect: (table: Table) => void;
}

const statusColor: Record<TableStatus, string> = {
  available: 'border-green-500/50 bg-green-500/10 hover:border-green-400',
  occupied: 'border-red-500/50 bg-red-500/10 hover:border-red-400',
  waiting: 'border-yellow-500/50 bg-yellow-500/10 hover:border-yellow-400',
};

const statusDot: Record<TableStatus, string> = {
  available: 'bg-green-500',
  occupied: 'bg-red-500 animate-pulse',
  waiting: 'bg-yellow-500 animate-pulse',
};

const statusLabel: Record<TableStatus, string> = {
  available: 'Free',
  occupied: 'Busy',
  waiting: 'Order',
};

export default function TableGrid({ tables, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2 p-1">
      {tables.map((table, i) => (
        <motion.button
          key={table.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.04 }}
          whileTap={{ scale: 0.93 }}
          onClick={() => onSelect(table)}
          className={`
            relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200
            ${statusColor[table.status]}
            ${selectedId === table.id ? 'ring-2 ring-gold border-gold' : ''}
          `}
        >
          <div className={`w-2 h-2 rounded-full ${statusDot[table.status]} mb-1`} />
          <span className="text-white font-bold text-base">{table.number}</span>
          <span className="text-[#9CA3AF] text-[10px] mt-0.5">{statusLabel[table.status]}</span>
          <div className="flex items-center gap-0.5 mt-1 text-[#9CA3AF]">
            <Users size={8} />
            <span className="text-[9px]">{table.seats}</span>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
