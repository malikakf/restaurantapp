import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShoppingBag, ArrowLeft, ChevronDown } from 'lucide-react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import { MenuItem, MenuCategory, OrderItem } from '../types';
import TableGrid from '../components/TableGrid';
import MenuGrid from '../components/MenuGrid';
import OrderSidebar from '../components/OrderSidebar';

export default function WaiterView() {
  const navigate = useNavigate();
  const { tables, menuItems, addOrder, selectedTableId, setSelectedTable } = useRestaurantStore();

  const [category, setCategory] = useState<MenuCategory>('Starters');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTables, setShowTables] = useState(true);

  const selectedTable = tables.find((t) => t.id === selectedTableId);
  const totalItems = orderItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleAddItem = useCallback((item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((o) => o.menuItem.id === item.id);
      if (existing) {
        return prev.map((o) =>
          o.menuItem.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  }, []);

  const handleRemoveItem = useCallback((item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((o) => o.menuItem.id === item.id);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((o) => o.menuItem.id !== item.id);
      return prev.map((o) =>
        o.menuItem.id === item.id ? { ...o, quantity: o.quantity - 1 } : o
      );
    });
  }, []);

  const handleSendOrder = () => {
    if (!selectedTableId) {
      toast.error('Please select a table first');
      return;
    }
    if (orderItems.length === 0) {
      toast.error('Add items to the order first');
      return;
    }
    addOrder(selectedTableId, orderItems);
    setOrderItems([]);
    setSidebarOpen(false);
    toast.success(`Order sent for Table ${selectedTable?.number}! 🍽️`, {
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0A0A0A] flex flex-col"
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-white font-bold text-lg">Waiter</h1>
              {selectedTable ? (
                <p className="text-gold text-xs">Table {selectedTable.number} selected</p>
              ) : (
                <p className="text-[#9CA3AF] text-xs">No table selected</p>
              )}
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="relative w-11 h-11 rounded-xl flex items-center justify-center transition-all"
            style={{
              backgroundColor: totalItems > 0 ? 'rgba(212,175,55,0.2)' : '#1A1A1A',
              border: totalItems > 0 ? '1px solid rgba(212,175,55,0.4)' : '1px solid #2A2A2A',
            }}
          >
            <ShoppingBag size={20} style={{ color: totalItems > 0 ? '#D4AF37' : '#9CA3AF' }} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold text-black text-xs font-black flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>

        {/* Table Selector Toggle */}
        <button
          onClick={() => setShowTables((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-2 text-[#9CA3AF] hover:text-white transition-colors"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Tables</span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${showTables ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Tables */}
        <motion.div
          initial={false}
          animate={{ height: showTables ? 'auto' : 0, opacity: showTables ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden px-4 pb-3"
        >
          <TableGrid
            tables={tables}
            selectedId={selectedTableId}
            onSelect={(table) => {
              setSelectedTable(selectedTableId === table.id ? null : table.id);
            }}
          />
        </motion.div>
      </div>

      {/* Menu section label */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-white font-bold text-base">Menu</h2>
      </div>

      {/* Menu Grid - fills remaining space */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <MenuGrid
          items={menuItems}
          currentCategory={category}
          onCategoryChange={setCategory}
          orderItems={orderItems}
          onAdd={handleAddItem}
          onRemove={handleRemoveItem}
        />
      </div>

      {/* Order Sidebar */}
      <OrderSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        items={orderItems}
        tableNumber={selectedTable?.number}
        onSend={handleSendOrder}
        onRemoveItem={(itemId) => {
          setOrderItems((prev) => prev.filter((o) => o.menuItem.id !== itemId));
        }}
      />
    </motion.div>
  );
}
