import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, ShoppingBag, Users, Clock, CheckCircle2 } from 'lucide-react';
import { useRestaurantStore } from '../store/useRestaurantStore';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import { TableStatus } from '../types';

const tableStatusColor: Record<TableStatus, string> = {
  available: '#22C55E',
  occupied: '#EF4444',
  waiting: '#F59E0B',
};

const tableStatusBg: Record<TableStatus, string> = {
  available: 'bg-green-500/20 border-green-500/30',
  occupied: 'bg-red-500/20 border-red-500/30',
  waiting: 'bg-yellow-500/20 border-yellow-500/30',
};

export default function ManagerDashboard() {
  const navigate = useNavigate();
  const { tables, orders, clearTable } = useRestaurantStore();

  const totalRevenue = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, i) => s + i.menuItem.price * i.quantity, 0),
    0
  );
  const activeTables = tables.filter((t) => t.status !== 'available').length;

  const completedOrders = orders.filter((o) => o.status === 'served');
  const avgOrderTimeMs =
    completedOrders.length > 0
      ? completedOrders.reduce((sum, o) => sum + (o.updatedAt.getTime() - o.createdAt.getTime()), 0) /
        completedOrders.length
      : 0;
  const avgOrderTimeMins = Math.round(avgOrderTimeMs / 60000);

  const itemCounts: Record<string, { name: string; emoji: string; count: number }> = {};
  orders.forEach((o) => {
    o.items.forEach((i) => {
      if (!itemCounts[i.menuItem.id]) {
        itemCounts[i.menuItem.id] = { name: i.menuItem.name, emoji: i.menuItem.emoji, count: 0 };
      }
      itemCounts[i.menuItem.id].count += i.quantity;
    });
  });
  const topItems = Object.values(itemCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recentOrders = [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0A0A0A]"
      style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.06) 0%, transparent 60%)',
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#2A2A2A]">
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-white font-bold text-lg">Manager</h1>
            <p className="text-[#9CA3AF] text-xs">Dashboard overview</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 pb-10">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard title="Orders Today" value={orders.length} icon={ShoppingBag} color="#D4AF37" />
          <StatsCard title="Revenue" value={`€${totalRevenue.toFixed(0)}`} icon={TrendingUp} color="#22C55E" />
          <StatsCard title="Active Tables" value={`${activeTables}/12`} icon={Users} color="#3B82F6" />
          <StatsCard title="Avg. Order Time" value={`${avgOrderTimeMins}m`} icon={Clock} color="#F97316" />
        </div>

        {/* Floor Plan */}
        <div>
          <h2 className="text-white font-bold text-base mb-3">Floor Plan</h2>
          <div className="grid grid-cols-4 gap-2">
            {tables.map((table) => (
              <motion.div
                key={table.id}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 ${tableStatusBg[table.status]}`}
              >
                <span className="text-white font-bold text-lg">{table.number}</span>
                <div
                  className="w-1.5 h-1.5 rounded-full mt-1"
                  style={{ backgroundColor: tableStatusColor[table.status] }}
                />
                {table.status !== 'available' && (
                  <button
                    onClick={() => clearTable(table.id)}
                    className="absolute top-1 right-1 text-[#9CA3AF] hover:text-green-400 transition-colors"
                    title="Clear table"
                  >
                    <CheckCircle2 size={10} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mt-3">
            {(['available', 'occupied', 'waiting'] as const).map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tableStatusColor[s] }} />
                <span className="text-[#9CA3AF] text-xs capitalize">{s}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Items */}
        {topItems.length > 0 && (
          <div>
            <h2 className="text-white font-bold text-base mb-3">Top Selling Items</h2>
            <div className="card divide-y divide-[#2A2A2A]">
              {topItems.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3 p-4">
                  <span className="text-[#9CA3AF] font-bold text-sm w-5 text-center">#{i + 1}</span>
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-white flex-1 text-sm font-medium">{item.name}</span>
                  <span className="text-gold font-bold text-sm">{item.count}×</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div>
          <h2 className="text-white font-bold text-base mb-3">Recent Orders</h2>
          <div className="space-y-2">
            {recentOrders.map((order) => (
              <div key={order.id} className="card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#141414] flex items-center justify-center font-bold text-white">
                  {order.tableNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">Table {order.tableNumber}</p>
                  <p className="text-[#9CA3AF] text-xs truncate">
                    {order.items.map((i) => i.menuItem.name).join(', ')}
                  </p>
                </div>
                <StatusBadge status={order.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
