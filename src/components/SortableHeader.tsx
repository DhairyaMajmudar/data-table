import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/16/solid';
import { usePaginationStore } from '../stores/usePaginationStore';
import type { Product } from '../types/Product';

interface SortableHeaderProps {
  column: keyof Product;
  label: string;
}

export function SortableHeader({ column, label }: SortableHeaderProps) {
  const { sortConfigs, setSortColumn } = usePaginationStore();

  const sortConfig = sortConfigs.find((config) => config.column === column);

  const sortOrderIndex = sortConfigs.findIndex(
    (config) => config.column === column,
  );
  const sortOrderLabel = sortOrderIndex > -1 ? `${sortOrderIndex + 1}` : '';

  return (
    <th
      className="px-4 py-3 text-white cursor-pointer hover:bg-slate-600/50"
      onClick={() => setSortColumn(column)}
    >
      <div className="flex items-center justify-between">
        <span>{label}</span>
        <div className="flex items-center gap-1">
          {sortConfig && (
            <span className="text-cyan-400 font-bold">
              {sortConfig.direction === 'asc' ? (
                <ArrowUpIcon className="ml-1 h-4 w-4 text-current" />
              ) : (
                <ArrowDownIcon className="ml-1 h-4 w-4 text-current" />
              )}
            </span>
          )}
          {sortOrderIndex > -1 && (
            <span className="text-xs bg-slate-600 rounded-full w-4 h-4 flex items-center justify-center">
              {sortOrderLabel}
            </span>
          )}
        </div>
      </div>
    </th>
  );
}
