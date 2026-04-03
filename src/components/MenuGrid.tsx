import { MenuCategory, MenuItem, OrderItem } from '../types';
import MenuItemCard from './MenuItemCard';

const categories: MenuCategory[] = ['Starters', 'Mains', 'Desserts', 'Drinks', 'Coffee'];

interface Props {
  items: MenuItem[];
  currentCategory: MenuCategory;
  onCategoryChange: (cat: MenuCategory) => void;
  orderItems: OrderItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (item: MenuItem) => void;
}

export default function MenuGrid({ items, currentCategory, onCategoryChange, orderItems, onAdd, onRemove }: Props) {
  const filtered = items.filter((i) => i.category === currentCategory);

  const getQuantity = (itemId: string) =>
    orderItems.find((o) => o.menuItem.id === itemId)?.quantity ?? 0;

  return (
    <div className="flex flex-col h-full">
      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-3 px-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`
              flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${currentCategory === cat ? 'pill-active' : 'pill-inactive'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
        {filtered.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={getQuantity(item.id)}
            onAdd={() => onAdd(item)}
            onRemove={() => onRemove(item)}
          />
        ))}
      </div>
    </div>
  );
}
