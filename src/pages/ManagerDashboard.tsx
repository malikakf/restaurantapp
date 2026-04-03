import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, DollarSign, Users, Clock, TrendingUp, XCircle } from 'lucide-react';
import { Layout } from '../components/Layout';
import { StatsCard } from '../components/StatsCard';
import { StatusBadge } from '../components/StatusBadge';
import { useRestaurantStore } from '../store/useRestaurantStore';

export default function ManagerDashboard() {
  const { tables, orders, clearTable } = useRestaurantStore();

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const activeTables = tables.filter(t => t.status === 'occupied').length;
    const avgTime = orders.length > 0
      ? Math.round(orders.reduce((sum, o) => {
          const mins = (o.updatedAt.getTime() - o.createdAt.getTime()) / 60000;
          return sum + mins;
        }, 0) / orders.length)
      : 0;
    return { total: orders.length, revenue: totalRevenue, activeTables, avgTime };
  }, [orders, tables]);

  const topItems = useMemo(() => {
    const counts: Record<string, { name: string; emoji: string; count: number; revenue: number }> = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        if (!counts[item.menuItem.id]) {
          counts[item.menuItem.id] = { name: item.menuItem.name, emoji: item.menuItem.emoji, count: 0, revenue: 0 };
        }
        counts[item.menuItem.id].count += item.quantity;
        counts[item.menuItem.id].revenue += item.menuItem.price * item.quantity;
      });
    });
    return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [orders]);

  const recentOrders = [...orders]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);

  const tableStatusConfig = {
    available: 'bg-green-500/20 border-green-500/40 text-green-400',
    occupied: 'bg-red-500/20 border-red-500/40 text-red-400',
    waiting: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400',
  };

  return (
    <Layout title="Manager Dashboard" subtitle="Live overview">
      <div className="p-4 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard title="Total Orders" value={stats.total} icon={ShoppingBag} color="#D4AF37" />
          <StatsCard title="Revenue" value={`€${stats.revenue.toFixed(0)}`} icon={DollarSign} color="#22C55E" />
          <StatsCard title="Active Tables" value={stats.activeTables} icon={Users} color="#F97316" />
          <StatsCard title="Avg Time" value={`${stats.avgTime}m`} icon={Clock} color="#3B82F6" subtitle="per order" />
        </div>

        {/* Floor Plan */}
        <div>
          <h2 className="text-sm text-gray-400 uppercase tracking-wider font-medium mb-3">Floor Plan</h2>
          <div className="grid grid-cols-4 gap-2">
            {tables.map(table => (
              <div
                key={table.id}
                className={`relative p-3 rounded-xl border text-center ${tableStatusConfig[table.status]}`}
              >
                <div className="text-xl font-black">{table.number}</div>
                <div className="text-xs capitalize opacity-70">{table.status}</div>
                {table.status === 'occupied' && (
                  <button
                    onClick={() => clearTable(table.id)}
                    className="absolute top-1 right-1 text-gray-600 hover:text-red-400 transition-colors"
                    title="Clear table"
                  >
                    <XCircle size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Selling Items */}
        <div>
          <h2 className="text-sm text-gray-400 uppercase tracking-wider font-medium mb-3">
            <span className="flex items-center gap-2"><TrendingUp size={14} /> Top Sellers</span>
          </h2>
          <div className="glass-card divide-y divide-white/5">
            {topItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-bold text-sm w-4">#{idx + 1}</span>
                  <span className="text-lg">{item.emoji}</span>
                  <span className="text-white text-sm font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-[#D4AF37] font-bold text-sm">{item.count}x</p>
                  <p className="text-gray-500 text-xs">€{item.revenue.toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="text-sm text-gray-400 uppercase tracking-wider font-medium mb-3">Recent Orders</h2>
          <div className="space-y-2">
            {recentOrders.map(order => (
              <motion.div
                key={order.id}
                className="glass-card p-3 flex items-center justify-between"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center font-black text-white">
                    {order.tableNumber}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{order.items.length} items</p>
                    <p className="text-gray-500 text-xs">{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#D4AF37] font-bold">€{order.total.toFixed(2)}</span>
                  <StatusBadge status={order.status} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
