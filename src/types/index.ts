export type TableStatus = 'available' | 'occupied' | 'waiting';
export type OrderStatus = 'new' | 'in-progress' | 'ready' | 'delivered';
export type OrderType = 'food' | 'drink' | 'mixed';
export type MenuCategory = 'Starters' | 'Mains' | 'Desserts' | 'Drinks' | 'Coffee';

export interface Table {
  id: string;
  number: number;
  status: TableStatus;
  currentOrderId?: string;
  seats: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  emoji: string;
  type: 'food' | 'drink';
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableId: string;
  tableNumber: number;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  type: OrderType;
  total: number;
}
