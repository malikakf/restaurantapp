import { MenuCategory, MenuItem as MenuItemType } from '../types';
import { MenuItemCard } from './MenuItemCard';

interface MenuGridProps {
  items: MenuItemType[];
  categories: MenuCategory[];
  selectedCategory: MenuCategory;
  onSelectCategory: (cat: MenuCategory) => void;
  orderQuantities: Record<string, number>;
  onAdd: (itemId: string) => void;
  onRemove: (itemId: string) => void;
}

export function MenuGrid({ items, categories, selectedCategory, onSelectCategory, orderQuantities, onAdd, onRemove }: MenuGridProps) {
  const filtered = items.filter(i => i.category === selectedCategory);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`pill-button whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-[#D4AF37] text-black font-bold'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-2">
        {filtered.map(item => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={orderQuantities[item.id] || 0}
            onAdd={() => onAdd(item.id)}
            onRemove={() => onRemove(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
