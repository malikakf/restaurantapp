import { create } from 'zustand';
import { Table, Order, OrderItem, OrderStatus, MenuItem } from '../types';
import { menuItems as initialMenuItems } from '../data/menuData';

interface RestaurantStore {
  tables: Table[];
  orders: Order[];
  menuItems: MenuItem[];
  selectedTableId: string | null;
  setSelectedTable: (tableId: string | null) => void;
  addOrder: (tableId: string, items: OrderItem[]) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  clearTable: (tableId: string) => void;
}

const initialTables: Table[] = Array.from({ length: 12 }, (_, i) => ({
  id: `t${i + 1}`,
  number: i + 1,
  status: i === 1 ? 'occupied' : i === 3 ? 'waiting' : i === 5 ? 'occupied' : i === 7 ? 'waiting' : 'available',
  seats: i < 4 ? 2 : i < 8 ? 4 : 6,
}));

// Demo orders
const now = new Date();
const demoOrders: Order[] = [
  {
    id: 'o1',
    tableId: 't2',
    tableNumber: 2,
    items: [
      { menuItem: initialMenuItems[6], quantity: 2 },
      { menuItem: initialMenuItems[14], quantity: 2 },
    ],
    status: 'in-progress',
    type: 'mixed',
    createdAt: new Date(now.getTime() - 12 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 10 * 60 * 1000),
  },
  {
    id: 'o2',
    tableId: 't6',
    tableNumber: 6,
    items: [
      { menuItem: initialMenuItems[7], quantity: 1 },
      { menuItem: initialMenuItems[15], quantity: 1 },
    ],
    status: 'new',
    type: 'mixed',
    createdAt: new Date(now.getTime() - 3 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 3 * 60 * 1000),
  },
  {
    id: 'o3',
    tableId: 't4',
    tableNumber: 4,
    items: [
      { menuItem: initialMenuItems[3], quantity: 2 },
      { menuItem: initialMenuItems[17], quantity: 3 },
    ],
    status: 'ready',
    type: 'mixed',
    createdAt: new Date(now.getTime() - 25 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 5 * 60 * 1000),
  },
  {
    id: 'o4',
    tableId: 't8',
    tableNumber: 8,
    items: [
      { menuItem: initialMenuItems[9], quantity: 1 },
    ],
    status: 'served',
    type: 'food',
    createdAt: new Date(now.getTime() - 60 * 60 * 1000),
    updatedAt: new Date(now.getTime() - 40 * 60 * 1000),
  },
];

// Update tables status based on demo orders
initialTables[1].currentOrderId = 'o1'; // Table 2
initialTables[3].currentOrderId = 'o3'; // Table 4
initialTables[5].currentOrderId = 'o2'; // Table 6
initialTables[7].currentOrderId = undefined; // Table 8 - order served

export const useRestaurantStore = create<RestaurantStore>((set) => ({
  tables: initialTables,
  orders: demoOrders,
  menuItems: initialMenuItems,
  selectedTableId: null,

  setSelectedTable: (tableId) => set({ selectedTableId: tableId }),

  addOrder: (tableId, items) => {
    set((state) => {
      const table = state.tables.find((t) => t.id === tableId);
      if (!table) return state;

      const hasDrinks = items.some((i) => i.menuItem.type === 'drink');
      const hasFood = items.some((i) => i.menuItem.type === 'food');
      const type = hasDrinks && hasFood ? 'mixed' : hasDrinks ? 'drink' : 'food';

      const newOrder: Order = {
        id: `o${Date.now()}`,
        tableId,
        tableNumber: table.number,
        items,
        status: 'new',
        type,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return {
        orders: [newOrder, ...state.orders],
        tables: state.tables.map((t) =>
          t.id === tableId
            ? { ...t, status: 'occupied', currentOrderId: newOrder.id }
            : t
        ),
      };
    });
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status, updatedAt: new Date() } : o
      ),
      tables: state.tables.map((t) => {
        if (t.currentOrderId === orderId && status === 'served') {
          return { ...t, status: 'available', currentOrderId: undefined };
        }
        return t;
      }),
    }));
  },

  clearTable: (tableId) => {
    set((state) => ({
      tables: state.tables.map((t) =>
        t.id === tableId ? { ...t, status: 'available', currentOrderId: undefined } : t
      ),
      orders: state.orders.map((o) =>
        o.tableId === tableId && o.status !== 'served'
          ? { ...o, status: 'served', updatedAt: new Date() }
          : o
      ),
    }));
  },
}));
