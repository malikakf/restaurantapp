import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Starters
  { id: 's1', name: 'Bruschetta', category: 'Starters', price: 8, description: 'Toasted bread with fresh tomatoes, garlic & basil', emoji: '🍅', type: 'food' },
  { id: 's2', name: 'Soup of the Day', category: 'Starters', price: 7, description: "Chef's daily homemade soup with crusty bread", emoji: '🍲', type: 'food' },
  { id: 's3', name: 'Calamari', category: 'Starters', price: 12, description: 'Crispy fried squid with lemon aioli', emoji: '🦑', type: 'food' },
  { id: 's4', name: 'Caesar Salad', category: 'Starters', price: 11, description: 'Romaine lettuce, parmesan, croutons & Caesar dressing', emoji: '🥗', type: 'food' },
  { id: 's5', name: 'Burrata', category: 'Starters', price: 14, description: 'Fresh burrata with heritage tomatoes & basil oil', emoji: '🧀', type: 'food' },

  // Mains
  { id: 'm1', name: 'Grilled Salmon', category: 'Mains', price: 24, description: 'Atlantic salmon with seasonal vegetables & lemon butter', emoji: '🐟', type: 'food' },
  { id: 'm2', name: 'Ribeye Steak', category: 'Mains', price: 32, description: '300g aged ribeye with fries & peppercorn sauce', emoji: '🥩', type: 'food' },
  { id: 'm3', name: 'Pasta Carbonara', category: 'Mains', price: 16, description: 'Spaghetti with pancetta, egg yolk & pecorino', emoji: '🍝', type: 'food' },
  { id: 'm4', name: 'Chicken Supreme', category: 'Mains', price: 19, description: 'Pan-roasted chicken with wild mushroom cream sauce', emoji: '🍗', type: 'food' },
  { id: 'm5', name: 'Veggie Risotto', category: 'Mains', price: 15, description: 'Arborio rice with seasonal vegetables & parmesan', emoji: '🍚', type: 'food' },

  // Desserts
  { id: 'd1', name: 'Tiramisu', category: 'Desserts', price: 8, description: 'Classic Italian dessert with espresso & mascarpone', emoji: '☕', type: 'food' },
  { id: 'd2', name: 'Crème Brûlée', category: 'Desserts', price: 7, description: 'Vanilla custard with caramelised sugar crust', emoji: '🍮', type: 'food' },
  { id: 'd3', name: 'Chocolate Lava Cake', category: 'Desserts', price: 9, description: 'Warm chocolate cake with molten centre & ice cream', emoji: '🍫', type: 'food' },
  { id: 'd4', name: 'Cheesecake', category: 'Desserts', price: 8, description: 'New York style with berry compote', emoji: '🍰', type: 'food' },

  // Drinks
  { id: 'dr1', name: 'Beer', category: 'Drinks', price: 5, description: 'Draft lager or craft ale — ask your waiter', emoji: '🍺', type: 'drink' },
  { id: 'dr2', name: 'House Wine', category: 'Drinks', price: 7, description: 'Red, white or rosé — 175ml glass', emoji: '🍷', type: 'drink' },
  { id: 'dr3', name: 'Soft Drink', category: 'Drinks', price: 3, description: 'Cola, lemonade, orange juice or tonic water', emoji: '🥤', type: 'drink' },
  { id: 'dr4', name: 'Fresh Juice', category: 'Drinks', price: 5, description: 'Freshly squeezed orange, apple or grapefruit', emoji: '🍊', type: 'drink' },
  { id: 'dr5', name: 'Sparkling Water', category: 'Drinks', price: 4, description: 'San Pellegrino 500ml', emoji: '💧', type: 'drink' },

  // Coffee
  { id: 'c1', name: 'Espresso', category: 'Coffee', price: 3, description: 'Single or double shot of our house blend', emoji: '☕', type: 'drink' },
  { id: 'c2', name: 'Cappuccino', category: 'Coffee', price: 4, description: 'Espresso with steamed milk & foam', emoji: '☕', type: 'drink' },
  { id: 'c3', name: 'Flat White', category: 'Coffee', price: 4, description: 'Double ristretto with velvety steamed milk', emoji: '☕', type: 'drink' },
  { id: 'c4', name: 'Cold Brew', category: 'Coffee', price: 5, description: '12-hour cold-brewed coffee over ice', emoji: '🧊', type: 'drink' },
];
