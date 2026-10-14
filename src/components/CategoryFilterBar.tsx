import React from 'react';
import { Flame, SlidersHorizontal } from 'lucide-react';
import { VideoCategory, SortOption } from '../types';

interface CategoryFilterBarProps {
  activeCategory: VideoCategory | 'All' | 'Saved';
  onSelectCategory: (category: VideoCategory | 'All' | 'Saved') => void;
  activeSort: SortOption;
  onSelectSort: (sort: SortOption) => void;
  totalCount: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  activeCategory,
  onSelectCategory,
  activeSort,
  onSelectSort,
  totalCount,
}) => {
  const categories: { label: string; value: VideoCategory | 'All' }[] = [
    { label: 'All Videos', value: 'All' },
    { label: 'Trending Now', value: 'Trending Now' },
    { label: 'Bangladeshi', value: 'Bangladeshi' },
    { label: 'Pakistani', value: 'Pakistani' },
    { label: 'Indian', value: 'Indian' },
    { label: 'Most Trending', value: 'Most Trending' },
    { label: 'TikToker', value: 'TikToker' },
    { label: 'Latest Videos', value: 'Latest Videos' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#302333]">
        
        {/* Horizontal Category Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(cat.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FF2D95] border-[#FF2D95] text-white shadow-lg shadow-[#FF2D95]/30'
                    : 'bg-[#14141D] border-[#302333] text-[#A8A1B3] hover:text-[#F8F5FA] hover:border-[#FF2D95]/40'
                }`}
              >
                {cat.value === 'Trending Now' && <Flame className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sorting & Result Metric */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-[#A8A1B3] shrink-0">
          <span className="tabular-nums font-medium">
            <span className="text-[#F8F5FA] font-bold">{totalCount}</span> videos
          </span>

          <div className="flex items-center gap-1.5 bg-[#14141D] border border-[#302333] rounded-xl px-2.5 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF2D95]" />
            <select
              value={activeSort}
              onChange={(e) => onSelectSort(e.target.value as SortOption)}
              className="bg-transparent text-xs text-[#F8F5FA] outline-none cursor-pointer pr-1"
            >
              <option value="latest" className="bg-[#14141D] text-white">Latest Added</option>
              <option value="trending" className="bg-[#14141D] text-white">Highest Trending</option>
              <option value="most_viewed" className="bg-[#14141D] text-white">Most Viewed</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
