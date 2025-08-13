import { usePaginationStore } from '../stores/usePaginationStore';
import type { Product } from '../types/Product';
import { extractUniqueCategories } from '../utils/tableUtils';

interface HeaderProps {
  products: Product[];
}

export const Header = ({ products }: HeaderProps) => {
  const { filterCategory, setFilterCategory, searchQuery, setSearchQuery } =
    usePaginationStore();

  const categories = extractUniqueCategories(products);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div className="relative">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
