import { create } from 'zustand';
import { Table, Order, OrderItem, OrderStatus, OrderType } from '../types';
import { menuItems } from '../data/menuData';

interface RestaurantStore {
  tables: Table[];
  orders: Order[];
  menuItems: typeof menuItems;
  addOrder: (tableId: string, items: OrderItem[]) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  clearTable: (tableId: string) => void;
}

const initialTables: Table[] = Array.from({ length: 12 }, (_, i) => ({
  id: `table-${i + 1}`,
  number: i + 1,
  seats: [2, 2, 4, 4, 4, 6, 2, 4, 4, 6, 2, 4][i],
  status: (['occupied', 'waiting', 'occupied', 'waiting', 'occupied', 'available', 'occupied', 'available', 'available', 'available', 'available', 'available'] as const)[i],
  currentOrderId: undefined,
}));

const now = new Date();

const initialOrders: Order[] = [
  {
    id: 'order-1',
    tableId: 'table-1',
    tableNumber: 1,
    items: [
      { menuItem: menuItems[2], quantity: 2 }, // Calamari
      { menuItem: menuItems[6], quantity: 2 }, // Ribeye Steak
      { menuItem: menuItems[14], quantity: 2 }, // Beer (index 14 = dr1)
    ],
    status: 'in-progress',
    createdAt: new Date(now.getTime() - 15 * 60000),
    updatedAt: new Date(now.getTime() - 10 * 60000),
    type: 'mixed',
    total: (12 * 2) + (32 * 2) + (5 * 2),
  },
  {
    id: 'order-2',
    tableId: 'table-3',
    tableNumber: 3,
    items: [
      { menuItem: menuItems[5], quantity: 1 }, // Grilled Salmon
      { menuItem: menuItems[8], quantity: 1 }, // Chicken Supreme
      { menuItem: menuItems[15], quantity: 2 }, // House Wine (index 15 = dr2)
    ],
    status: 'new',
    createdAt: new Date(now.getTime() - 3 * 60000),
    updatedAt: new Date(now.getTime() - 3 * 60000),
    type: 'mixed',
    total: 24 + 19 + (7 * 2),
  },
  {
    id: 'order-3',
    tableId: 'table-5',
    tableNumber: 5,
    items: [
      { menuItem: menuItems[10], quantity: 3 }, // Tiramisu
      { menuItem: menuItems[21], quantity: 2 }, // Cappuccino (index 21 = c2)
    ],
    status: 'ready',
    createdAt: new Date(now.getTime() - 25 * 60000),
    updatedAt: new Date(now.getTime() - 5 * 60000),
    type: 'mixed',
    total: (8 * 3) + (4 * 2),
  },
  {
    id: 'order-4',
    tableId: 'table-7',
    tableNumber: 7,
    items: [
      { menuItem: menuItems[3], quantity: 2 }, // Caesar Salad
      { menuItem: menuItems[7], quantity: 1 }, // Pasta Carbonara
    ],
    status: 'new',
    createdAt: new Date(now.getTime() - 1 * 60000),
    updatedAt: new Date(now.getTime() - 1 * 60000),
    type: 'food',
    total: (11 * 2) + 16,
  },
];

// Set currentOrderIds on tables
initialTables[0].currentOrderId = 'order-1';
initialTables[2].currentOrderId = 'order-2';
initialTables[4].currentOrderId = 'order-3';
initialTables[6].currentOrderId = 'order-4';

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  tables: initialTables,
  orders: initialOrders,
  menuItems,

  addOrder: (tableId: string, items: OrderItem[]) => {
    set((state) => {
      const table = state.tables.find(t => t.id === tableId);
      if (!table) return state;

      const hasFood = items.some(i => i.menuItem.type === 'food');
      const hasDrink = items.some(i => i.menuItem.type === 'drink');
      const type: OrderType = hasFood && hasDrink ? 'mixed' : hasFood ? 'food' : 'drink';

      const newOrder: Order = {
        id: `order-${Date.now()}`,
        tableId,
        tableNumber: table.number,
        items,
        status: 'new',
        createdAt: new Date(),
        updatedAt: new Date(),
        type,
        total: items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0),
      };

      return {
        orders: [newOrder, ...state.orders],
        tables: state.tables.map(t =>
          t.id === tableId
            ? { ...t, status: 'occupied', currentOrderId: newOrder.id }
            : t
        ),
      };
    });
  },

  updateOrderStatus: (orderId: string, status: OrderStatus) => {
    set((state) => ({
      orders: state.orders.map(o =>
        o.id === orderId
          ? { ...o, status, updatedAt: new Date() }
          : o
      ),
    }));
  },

  clearTable: (tableId: string) => {
    set((state) => ({
      tables: state.tables.map(t =>
        t.id === tableId
          ? { ...t, status: 'available', currentOrderId: undefined }
          : t
      ),
    }));
  },
}));
