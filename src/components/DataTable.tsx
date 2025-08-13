import { useEffect } from "react";
import { usePaginationStore } from "../stores/usePaginationStore";
import type { Product } from "../types/Product";
import { Header } from "./Header";
import { Pagination } from "./Pagination";

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
        <table className="w-full table-auto">
          <thead className="bg-slate-700 text-left">
            <tr>
              <th className="px-4 py-3 text-white cursor-pointer">
                Product Name
              </th>
              <th className="px-4 py-3 text-white cursor-pointer">Brand</th>
              <th className="px-4 py-3 text-white cursor-pointer">Category</th>
              <th className="px-4 py-3 text-white cursor-pointer">Price</th>
              <th className="px-4 py-3 text-white cursor-pointer">Rating</th>
              <th className="px-4 py-3 text-white cursor-pointer">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr key={product.id} className="hover:bg-slate-700/50">
                  <td className="px-4 py-3 text-white">{product.title}</td>
                  <td className="px-4 py-3 text-white">{product.brand}</td>
                  <td className="px-4 py-3 text-white">{product.category}</td>
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
