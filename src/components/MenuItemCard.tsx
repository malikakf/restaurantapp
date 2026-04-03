import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';

interface Props {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export default function MenuItemCard({ item, quantity, onAdd, onRemove }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-4 flex items-center gap-3"
    >
      <div className="w-12 h-12 rounded-xl bg-[#141414] flex items-center justify-center text-2xl flex-shrink-0">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm truncate">{item.name}</p>
        <p className="text-[#9CA3AF] text-xs truncate mt-0.5">{item.description}</p>
        <p className="text-gold font-bold text-sm mt-1">€{item.price}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {quantity > 0 && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.85 }}
            onClick={onRemove}
            className="w-7 h-7 rounded-full bg-[#2A2A2A] flex items-center justify-center text-white hover:bg-[#3A3A3A] transition-colors"
          >
            <Minus size={12} />
          </motion.button>
        )}
        {quantity > 0 && (
          <motion.span
            key={quantity}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            className="text-gold font-bold text-sm w-5 text-center"
          >
            {quantity}
          </motion.span>
        )}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onAdd}
          className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-black hover:bg-[#F0D060] transition-colors"
          style={{ boxShadow: '0 0 10px rgba(212,175,55,0.3)' }}
        >
          <Plus size={12} />
        </motion.button>
      </div>
    </motion.div>
  );
}
