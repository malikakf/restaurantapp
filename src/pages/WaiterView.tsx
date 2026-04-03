import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, History } from 'lucide-react';
import toast from 'react-hot-toast';
import { Layout } from '../components/Layout';
import { TableGrid } from '../components/TableGrid';
import { MenuGrid } from '../components/MenuGrid';
import { OrderSidebar } from '../components/OrderSidebar';
import { StatusBadge } from '../components/StatusBadge';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { MenuCategory, OrderItem } from '../types';

const CATEGORIES: MenuCategory[] = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Coffee'];

export default function WaiterView() {
  const { tables, menuItems, orders, addOrder } = useRestaurantStore();
  const [selectedTableId, setSelectedTableId] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('Starters');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'menu' | 'history'>('menu');

  const selectedTable = tables.find(t => t.id === selectedTableId);

  const orderItems: OrderItem[] = useMemo(() => {
    return Object.entries(quantities)
      .filter(([, qty]) => qty > 0)
      .map(([itemId, quantity]) => ({
        menuItem: menuItems.find(m => m.id === itemId)!,
        quantity,
      }))
      .filter(item => item.menuItem !== undefined);
  }, [quantities, menuItems]);

  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const tableOrders = orders.filter(o => o.tableId === selectedTableId);

  const handleAddItem = (itemId: string) => {
    setQuantities(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const handleRemoveItem = (itemId: string) => {
    setQuantities(prev => {
      const next = { ...prev };
      if (next[itemId] > 1) next[itemId]--;
      else delete next[itemId];
      return next;
    });
  };

  const handleRemoveFromSidebar = (itemId: string) => {
    setQuantities(prev => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const handleSendOrder = () => {
    if (!selectedTableId || orderItems.length === 0) return;
    addOrder(selectedTableId, orderItems);
    setQuantities({});
    setSidebarOpen(false);
    toast.success(`🍽️ Order sent for Table ${selectedTable?.number}!`, {
      icon: '🔥',
      duration: 3000,
    });
  };

  const handleSelectTable = (tableId: string) => {
    setSelectedTableId(tableId);
    setQuantities({});
    setActiveTab('menu');
  };

  return (
    <Layout title="Waiter View" subtitle="Select a table to start">
      <div className="p-4 space-y-5">
        {/* Table Grid */}
        <div>
          <h2 className="text-sm text-gray-400 uppercase tracking-wider font-medium mb-3">Tables</h2>
          <TableGrid
            tables={tables}
            selectedTableId={selectedTableId}
            onSelectTable={handleSelectTable}
          />
        </div>

        {/* Legend */}
        <div className="flex gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Available</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Occupied</div>
          <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> Waiting</div>
        </div>

        {/* Selected table content */}
        {selectedTable && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-lg">Table {selectedTable.number}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`pill-button text-xs ${activeTab === 'menu' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-white/5 text-gray-400 border border-white/10'}`}
                >
                  Menu
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`pill-button text-xs flex items-center gap-1 ${activeTab === 'history' ? 'bg-[#D4AF37] text-black font-bold' : 'bg-white/5 text-gray-400 border border-white/10'}`}
                >
                  <History size={12} />
                  History {tableOrders.length > 0 && `(${tableOrders.length})`}
                </button>
              </div>
            </div>

            {activeTab === 'menu' && (
              <MenuGrid
                items={menuItems}
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                orderQuantities={quantities}
                onAdd={handleAddItem}
                onRemove={handleRemoveItem}
              />
            )}

            {activeTab === 'history' && (
              <div className="space-y-3">
                {tableOrders.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No orders for this table yet</p>
                ) : (
                  tableOrders.map(order => (
                    <div key={order.id} className="glass-card p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleTimeString()}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-white">{item.menuItem.emoji} {item.menuItem.name} ×{item.quantity}</span>
                          <span className="text-gray-400">€{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-white/10 pt-2 flex justify-between">
                        <span className="text-gray-400 text-sm">Total</span>
                        <span className="text-[#D4AF37] font-bold">€{order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </motion.div>
        )}

        {!selectedTable && (
          <div className="text-center py-10 text-gray-600">
            <p className="text-lg">👆 Select a table to begin</p>
          </div>
        )}
      </div>

      {/* Floating cart button */}
      {totalItems > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-[#D4AF37] hover:bg-[#F0D060] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 z-20"
        >
          <ShoppingCart size={24} className="text-black" />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
            {totalItems}
          </span>
        </motion.button>
      )}

      <OrderSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        items={orderItems}
        tableNumber={selectedTable?.number}
        onSendOrder={handleSendOrder}
        onRemoveItem={handleRemoveFromSidebar}
      />
    </Layout>
  );
}
