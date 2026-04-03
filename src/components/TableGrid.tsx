import { motion } from 'framer-motion';
import { Table } from '../types';
import { Users } from 'lucide-react';

interface TableGridProps {
  tables: Table[];
  selectedTableId?: string;
  onSelectTable: (tableId: string) => void;
}

const statusConfig = {
  available: { bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400', dot: 'bg-green-500' },
  occupied: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400', dot: 'bg-red-500' },
  waiting: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400', dot: 'bg-yellow-500' },
};

export function TableGrid({ tables, selectedTableId, onSelectTable }: TableGridProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {tables.map((table) => {
        const config = statusConfig[table.status];
        const isSelected = table.id === selectedTableId;
        return (
          <motion.button
            key={table.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectTable(table.id)}
            className={`relative p-3 rounded-xl border transition-all ${config.bg} ${config.border} ${
              isSelected ? 'ring-2 ring-[#D4AF37]' : ''
            }`}
          >
            {isSelected && (
              <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/10" />
            )}
            <div className={`text-xl font-black ${config.text}`}>{table.number}</div>
            <div className="flex items-center gap-1 mt-0.5">
              <Users size={10} className="text-gray-500" />
              <span className="text-xs text-gray-500">{table.seats}</span>
            </div>
            <div className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${config.dot}`} />
          </motion.button>
        );
      })}
    </div>
  );
}
