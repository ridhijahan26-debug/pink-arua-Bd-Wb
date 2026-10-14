import React from 'react';
import { Home, Flame, Search, Code2, Bookmark } from 'lucide-react';
import { VideoCategory } from '../types';

interface MobileBottomNavProps {
  activeCategory: VideoCategory | 'All' | 'Saved';
  onSelectCategory: (cat: VideoCategory | 'All' | 'Saved') => void;
  onOpenThemeHub: () => void;
  savedCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenThemeHub,
  savedCount,
}) => {
  return (
    <nav 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#101016]/95 backdrop-blur-lg border-t border-[#302333] px-2 py-1 pb-safe"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-4 items-center h-14">
        
        {/* Home */}
        <button
          onClick={() => onSelectCategory('All')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition ${
            activeCategory === 'All' ? 'text-[#FF2D95]' : 'text-[#A8A1B3] hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Home</span>
        </button>

        {/* Trending */}
        <button
          onClick={() => onSelectCategory('Trending Now')}
          className={`flex flex-col items-center justify-center min-h-[44px] transition ${
            activeCategory === 'Trending Now' ? 'text-[#FF2D95]' : 'text-[#A8A1B3] hover:text-white'
          }`}
        >
          <Flame className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">Trending</span>
        </button>

        {/* Saved / Library */}
        <button
          onClick={() => onSelectCategory('Saved')}
          className={`flex flex-col items-center justify-center min-h-[44px] relative transition ${
            activeCategory === 'Saved' ? 'text-[#FF2D95]' : 'text-[#A8A1B3] hover:text-white'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#FF2D95] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-1">Saved</span>
        </button>

        {/* Theme Hub */}
        <button
          onClick={onOpenThemeHub}
          className="flex flex-col items-center justify-center min-h-[44px] text-[#A8A1B3] hover:text-[#FF2D95] transition"
        >
          <Code2 className="w-5 h-5" />
          <span className="text-[10px] font-semibold mt-1">WP Code</span>
        </button>

      </div>
    </nav>
  );
};
