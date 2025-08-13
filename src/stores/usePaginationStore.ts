import { create } from 'zustand';
import type { Product } from '../types/Product';
import { filterProducts } from '../utils/tableUtils';

interface PaginationState {
  currentPage: number;
  setCurrentPage: (page: number) => void;

  filterCategory: string;
  setFilterCategory: (category: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  products: Product[];
  setProducts: (products: Product[]) => void;

  itemsPerPage: number;

  nextPage: () => void;
  prevPage: () => void;

  getFilteredProducts: () => Product[];
  getCurrentItems: () => Product[];
  getTotalPages: () => number;
  getFirstItemIndex: () => number;
  getLastItemIndex: () => number;
}

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
    const { products, filterCategory, searchQuery } = get();
    return filterProducts(products, filterCategory, searchQuery);
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
