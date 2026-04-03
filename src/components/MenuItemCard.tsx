import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export function MenuItemCard({ item, quantity, onAdd, onRemove }: MenuItemCardProps) {
  return (
    <motion.div
      layout
      className="glass-card p-4 flex flex-col gap-2"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{item.emoji}</span>
            <div>
              <h3 className="text-white font-semibold text-sm leading-tight">{item.name}</h3>
              <p className="text-[#D4AF37] font-bold text-sm">€{item.price}</p>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-1">
        {quantity > 0 ? (
          <>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onRemove}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <Minus size={14} />
            </motion.button>
            <span className="text-white font-bold w-6 text-center">{quantity}</span>
          </>
        ) : null}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onAdd}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#F0D060] text-black text-xs font-semibold rounded-lg transition-colors"
        >
          <Plus size={14} />
          {quantity === 0 ? 'Add' : 'More'}
        </motion.button>
      </div>
    </motion.div>
  );
}
