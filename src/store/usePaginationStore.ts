import { create } from 'zustand';
import type { Product } from '../types/Product';
import { filterProducts } from '../utils/tableUtils';

type SortDirection = 'asc' | 'desc' | null;

interface SortConfig {
  column: keyof Product;
  direction: SortDirection;
}

interface PaginationState {
  currentPage: number;
  setCurrentPage: (page: number) => void;

  filterCategory: string;
  setFilterCategory: (category: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  products: Product[];
  setProducts: (products: Product[]) => void;

  sortConfigs: SortConfig[];
  setSortColumn: (column: keyof Product) => void;
  clearSorting: () => void;

  itemsPerPage: number;

  nextPage: () => void;
  prevPage: () => void;

  getFilteredProducts: () => Product[];
  getCurrentItems: () => Product[];
  getTotalPages: () => number;
  getFirstItemIndex: () => number;
  getLastItemIndex: () => number;
}

/**
 * Pagination state for managing the current page, filters, and sorting.
 */
export const usePaginationStore = create<PaginationState>((set, get) => ({
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  filterCategory: '',
  setFilterCategory: (category) =>
    set({ filterCategory: category, currentPage: 1 }),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  products: [],
  setProducts: (products) => set({ products }),

  sortConfigs: [],
  setSortColumn: (column) =>
    set((state) => {
      const configIndex = state.sortConfigs.findIndex(
        (config) => config.column === column,
      );
      const newSortConfigs = [...state.sortConfigs];

      if (configIndex >= 0) {
        const currentDirection = newSortConfigs[configIndex].direction;
        if (currentDirection === 'asc') {
          newSortConfigs[configIndex] = { column, direction: 'desc' };
        } else if (currentDirection === 'desc') {
          newSortConfigs.splice(configIndex, 1);
        }
      } else {
        newSortConfigs.push({ column, direction: 'asc' });
      }

      return { sortConfigs: newSortConfigs };
    }),

  clearSorting: () => set({ sortConfigs: [] }),

  itemsPerPage: 10,

  nextPage: () => {
    const totalPages = get().getTotalPages();
    set((state) => ({
      currentPage: Math.min(state.currentPage + 1, totalPages || 1),
    }));
  },
  prevPage: () => {
    set((state) => ({
      currentPage: Math.max(state.currentPage - 1, 1),
    }));
  },

  getFilteredProducts: () => {
    const { products, filterCategory, searchQuery, sortConfigs } = get();

    let filteredProducts = filterProducts(
      products,
      filterCategory,
      searchQuery,
    );

    if (sortConfigs.length > 0) {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        for (const { column, direction } of sortConfigs) {
          if (direction === null) continue;

          const valueA = a[column];
          const valueB = b[column];

          if (typeof valueA === 'string' && typeof valueB === 'string') {
            const comparison = valueA.localeCompare(valueB);
            if (comparison !== 0) {
              return direction === 'asc' ? comparison : -comparison;
            }
          } else if (typeof valueA === 'number' && typeof valueB === 'number') {
            if (valueA !== valueB) {
              return direction === 'asc' ? valueA - valueB : valueB - valueA;
            }
          }
        }
        return 0;
      });
    }

    return filteredProducts;
  },
  getCurrentItems: () => {
    const { currentPage, itemsPerPage } = get();
    const filteredProducts = get().getFilteredProducts();
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  },
  getTotalPages: () => {
    const { getFilteredProducts, itemsPerPage } = get();
    return Math.ceil(getFilteredProducts().length / itemsPerPage);
  },
  getFirstItemIndex: () => {
    const { currentPage, itemsPerPage } = get();
    return (currentPage - 1) * itemsPerPage;
  },
  getLastItemIndex: () => {
    const { currentPage, itemsPerPage } = get();
    return currentPage * itemsPerPage;
  },
}));
