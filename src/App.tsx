import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from './components/DataTable';
import type { Product } from './types/Product';

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const resp = await axios.get(
          'https://dummyjson.com/products?limit=100',
        );

        if (resp.status !== 200) {
          throw new Error('Failed to fetch products');
        }

        setProducts(resp.data.products);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Product Catalog
      </h1>
      <DataTable products={products} />
    </div>
  );
}
