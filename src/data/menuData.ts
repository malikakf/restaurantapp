import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
  // Starters
  { id: 's1', name: 'Bruschetta', category: 'Starters', price: 8, description: 'Toasted bread with tomatoes, garlic & fresh basil', emoji: '🍅', type: 'food' },
  { id: 's2', name: 'Soup of the Day', category: 'Starters', price: 7, description: 'Chef\'s daily selection of fresh seasonal soup', emoji: '🍲', type: 'food' },
  { id: 's3', name: 'Calamari', category: 'Starters', price: 12, description: 'Crispy fried squid with lemon aioli dip', emoji: '🦑', type: 'food' },
  { id: 's4', name: 'Caesar Salad', category: 'Starters', price: 11, description: 'Romaine lettuce, croutons, parmesan & classic dressing', emoji: '🥗', type: 'food' },
  { id: 's5', name: 'Burrata', category: 'Starters', price: 14, description: 'Creamy burrata with heirloom tomatoes & pesto', emoji: '🧀', type: 'food' },

  // Mains
  { id: 'm1', name: 'Grilled Salmon', category: 'Mains', price: 24, description: 'Atlantic salmon with asparagus & hollandaise sauce', emoji: '🐟', type: 'food' },
  { id: 'm2', name: 'Ribeye Steak', category: 'Mains', price: 32, description: '300g prime ribeye with fries & peppercorn sauce', emoji: '🥩', type: 'food' },
  { id: 'm3', name: 'Pasta Carbonara', category: 'Mains', price: 16, description: 'Egg, guanciale, pecorino & black pepper', emoji: '🍝', type: 'food' },
  { id: 'm4', name: 'Chicken Supreme', category: 'Mains', price: 19, description: 'Pan-roasted chicken breast with wild mushroom jus', emoji: '🍗', type: 'food' },
  { id: 'm5', name: 'Veggie Risotto', category: 'Mains', price: 15, description: 'Seasonal vegetables, parmesan & truffle oil', emoji: '🌾', type: 'food' },

  // Desserts
  { id: 'd1', name: 'Tiramisu', category: 'Desserts', price: 8, description: 'Classic Italian coffee & mascarpone dessert', emoji: '☕', type: 'food' },
  { id: 'd2', name: 'Crème Brûlée', category: 'Desserts', price: 7, description: 'Vanilla custard with caramelised sugar crust', emoji: '🍮', type: 'food' },
  { id: 'd3', name: 'Chocolate Lava Cake', category: 'Desserts', price: 9, description: 'Warm molten chocolate cake with vanilla ice cream', emoji: '🎂', type: 'food' },
  { id: 'd4', name: 'Cheesecake', category: 'Desserts', price: 8, description: 'New York style with seasonal berry compote', emoji: '🍰', type: 'food' },

  // Drinks
  { id: 'dr1', name: 'Beer', category: 'Drinks', price: 5, description: 'Draught lager — crisp & refreshing', emoji: '🍺', type: 'drink' },
  { id: 'dr2', name: 'House Wine', category: 'Drinks', price: 7, description: 'Glass of red, white or rosé', emoji: '🍷', type: 'drink' },
  { id: 'dr3', name: 'Soft Drink', category: 'Drinks', price: 3, description: 'Coke, Diet Coke, Sprite or Fanta', emoji: '🥤', type: 'drink' },
  { id: 'dr4', name: 'Fresh Juice', category: 'Drinks', price: 5, description: 'Orange, apple or carrot & ginger', emoji: '🍊', type: 'drink' },
  { id: 'dr5', name: 'Sparkling Water', category: 'Drinks', price: 4, description: 'San Pellegrino 750ml', emoji: '💧', type: 'drink' },

  // Coffee
  { id: 'c1', name: 'Espresso', category: 'Coffee', price: 3, description: 'Single or double shot of premium arabica', emoji: '☕', type: 'drink' },
  { id: 'c2', name: 'Cappuccino', category: 'Coffee', price: 4, description: 'Espresso with steamed milk & foam', emoji: '🫖', type: 'drink' },
  { id: 'c3', name: 'Flat White', category: 'Coffee', price: 4, description: 'Double ristretto with velvety microfoam', emoji: '☕', type: 'drink' },
  { id: 'c4', name: 'Cold Brew', category: 'Coffee', price: 5, description: '12-hour cold-steeped smooth coffee', emoji: '🧋', type: 'drink' },
];
