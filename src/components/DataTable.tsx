import { useEffect } from 'react';
import { usePaginationStore } from '../store/usePaginationStore';
import type { Product } from '../types/Product';
import { Header } from './Header';
import { Pagination } from './Pagination';
import { SortableHeader } from './SortableHeader';

interface DataTableProps {
  products: Product[];
}

export default function DataTable({ products }: DataTableProps) {
  const { setProducts, getCurrentItems } = usePaginationStore();

  useEffect(() => {
    setProducts(products);
  }, [products, setProducts]);

  const currentItems = getCurrentItems();

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-xl">
      <Header products={products} />
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <colgroup>
            <col className="w-1/4" />
            <col className="w-1/5" />
            <col className="w-1/5" />
            <col className="w-1/5" />
            <col className="w-1/5" />
            <col className="w-1/5" />
          </colgroup>
          <thead className="bg-slate-700 text-left">
            <tr>
              <SortableHeader column="title" label="Product Name" />
              <SortableHeader column="brand" label="Brand" />
              <SortableHeader column="category" label="Category" />
              <SortableHeader column="price" label="Price" />
              <SortableHeader column="rating" label="Rating" />
              <SortableHeader column="stock" label="Stock" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr key={product.id} className="hover:bg-slate-700/50">
                  <td
                    className="px-4 py-3 text-white truncate"
                    title={product.title}
                  >
                    {product.title}
                  </td>
                  <td
                    className="px-4 py-3 text-white truncate"
                    title={product.brand}
                  >
                    {product.brand}
                  </td>
                  <td
                    className="px-4 py-3 text-white truncate"
                    title={product.category}
                  >
                    {product.category}
                  </td>
                  <td className="px-4 py-3 text-white">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-white">
                    {product.rating.toFixed(1)}
                  </td>
                  <td className="px-4 py-3 text-white">{product.stock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-white">
                  No products found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}
