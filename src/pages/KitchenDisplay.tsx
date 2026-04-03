import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';
import { Layout } from '../components/Layout';
import { OrderCard } from '../components/OrderCard';
import { useRestaurantStore } from '../store/useRestaurantStore';

export default function KitchenDisplay() {
  const orders = useRestaurantStore(s => s.orders);

  const kitchenOrders = orders
    .filter(o => o.type !== 'drink' && o.status !== 'delivered')
    .sort((a, b) => {
      const statusOrder = { new: 0, 'in-progress': 1, ready: 2, delivered: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });

  const newCount = kitchenOrders.filter(o => o.status === 'new').length;

  return (
    <Layout
      title="Kitchen Display"
      subtitle={`${kitchenOrders.length} orders • ${newCount} new`}
    >
      <div className="p-4">
        {kitchenOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-4 text-gray-600"
          >
            <Flame size={48} className="opacity-20" />
            <p className="text-lg font-medium">No orders in queue</p>
            <p className="text-sm">Orders will appear here automatically</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {kitchenOrders.map(order => (
                <OrderCard key={order.id} order={order} accentColor="#F97316" />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </Layout>
  );
}
