import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Send } from 'lucide-react';
import { OrderItem } from '../types';

interface OrderSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  tableNumber?: number;
  onSendOrder: () => void;
  onRemoveItem: (itemId: string) => void;
}

export function OrderSidebar({ isOpen, onClose, items, tableNumber, onSendOrder, onRemoveItem }: OrderSidebarProps) {
  const total = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-80 bg-[#141414] border-l border-white/10 z-50 flex flex-col"
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-[#D4AF37]" />
                <h2 className="text-white font-bold">Order{tableNumber ? ` — Table ${tableNumber}` : ''}</h2>
              </div>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {items.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                  <ShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
                  <p>No items added yet</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.menuItem.id} className="flex items-center justify-between bg-white/5 rounded-xl p-3">
                    <div>
                      <p className="text-white text-sm font-medium">{item.menuItem.emoji} {item.menuItem.name}</p>
                      <p className="text-gray-400 text-xs">€{item.menuItem.price} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#D4AF37] font-bold text-sm">€{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                      <button
                        onClick={() => onRemoveItem(item.menuItem.id)}
                        className="text-gray-600 hover:text-red-400 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-bold text-lg">€{total.toFixed(2)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSendOrder}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#D4AF37] hover:bg-[#F0D060] text-black font-bold rounded-xl transition-colors"
                >
                  <Send size={18} />
                  Send Order to Kitchen
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
