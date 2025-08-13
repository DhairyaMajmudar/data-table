import { usePaginationStore } from '../stores/usePaginationStore';

export const Pagination = () => {
  const {
    currentPage,
    getFilteredProducts,
    getTotalPages,
    getFirstItemIndex,
    getLastItemIndex,
    nextPage,
    prevPage,
  } = usePaginationStore();

  const products = getFilteredProducts();
  const totalPages = getTotalPages();
  const indexOfFirstItem = getFirstItemIndex();
  const indexOfLastItem = getLastItemIndex();

  return (
    <div className="p-4 flex flex-col md:flex-row justify-between items-center text-white">
      <div className="mb-4 md:mb-0">
        Showing {indexOfFirstItem + 1}-
        {Math.min(indexOfLastItem, products.length)} of {products.length}{' '}
        products
      </div>
      <div className="flex space-x-2">
        <button
          type="button"
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <div className="flex items-center">
          <span className="mx-4">
            Page {currentPage} of {totalPages || 1}
          </span>
        </div>
        <button
          type="button"
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};
