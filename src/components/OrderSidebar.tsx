import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ShoppingBag } from 'lucide-react';
import { OrderItem } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  tableNumber?: number;
  onSend: () => void;
  onRemoveItem: (itemId: string) => void;
}

export default function OrderSidebar({ isOpen, onClose, items, tableNumber, onSend, onRemoveItem }: Props) {
  const subtotal = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-[#141414] z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#2A2A2A]">
              <div>
                <h2 className="text-white font-bold text-xl">Order</h2>
                {tableNumber && (
                  <p className="text-[#9CA3AF] text-sm">Table {tableNumber}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 text-[#9CA3AF]"
                  >
                    <ShoppingBag size={40} className="mb-3 opacity-30" />
                    <p className="text-sm">No items added yet</p>
                    <p className="text-xs mt-1">Select items from the menu</p>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.menuItem.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex items-center gap-3 card p-3"
                    >
                      <span className="text-xl">{item.menuItem.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{item.menuItem.name}</p>
                        <p className="text-[#9CA3AF] text-xs">×{item.quantity} · €{(item.menuItem.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="text-[#9CA3AF] hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 border-t border-[#2A2A2A] space-y-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] font-medium">Subtotal</span>
                  <span className="text-gold font-bold text-xl">€{subtotal.toFixed(2)}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={onSend}
                  className="btn-gold w-full flex items-center justify-center gap-2 text-base"
                >
                  <Send size={18} />
                  Send Order to Kitchen
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
