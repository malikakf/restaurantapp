import { motion, AnimatePresence } from 'framer-motion';
import { Wine } from 'lucide-react';
import { Layout } from '../components/Layout';
import { OrderCard } from '../components/OrderCard';
import { useRestaurantStore } from '../store/useRestaurantStore';

export default function BarDisplay() {
  const orders = useRestaurantStore(s => s.orders);

  const barOrders = orders
    .filter(o => o.type !== 'food' && o.status !== 'delivered')
    .map(order => ({
      ...order,
      items: order.items.filter(item => item.menuItem.type === 'drink'),
    }))
    .filter(o => o.items.length > 0)
    .sort((a, b) => {
      const statusOrder = { new: 0, 'in-progress': 1, ready: 2, delivered: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

  const newCount = barOrders.filter(o => o.status === 'new').length;

  return (
    <Layout
      title="Bar Display"
      subtitle={`${barOrders.length} orders • ${newCount} new`}
    >
      <div className="p-4">
        {barOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-gray-600"
          >
            <Wine size={48} className="opacity-20" />
            <p className="text-lg font-medium">No drink orders in queue</p>
            <p className="text-sm">Drink orders will appear here automatically</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {barOrders.map(order => (
                <OrderCard key={order.id} order={order} accentColor="#3B82F6" />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </Layout>
  );
}
