import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, Code2, Bookmark, Flame } from 'lucide-react';
import { VideoCategory } from '../types';

interface HeaderProps {
  activeCategory: VideoCategory | 'All' | 'Saved';
  onSelectCategory: (category: VideoCategory | 'All' | 'Saved') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenThemeHub: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onOpenThemeHub,
  savedCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems: { label: string; value: VideoCategory | 'All' }[] = [
    { label: 'Home', value: 'All' },
    { label: 'Trending Now', value: 'Trending Now' },
    { label: 'Bangladeshi', value: 'Bangladeshi' },
    { label: 'Pakistani', value: 'Pakistani' },
    { label: 'Indian', value: 'Indian' },
    { label: 'Most Trending', value: 'Most Trending' },
    { label: 'TikToker', value: 'TikToker' },
    { label: 'Latest', value: 'Latest Videos' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07070B]/90 backdrop-blur-md border-b border-[#302333] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#A8A1B3] hover:text-[#FF2D95] rounded-lg transition"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Zone */}
        <div 
          onClick={() => onSelectCategory('All')} 
          className="cursor-pointer flex items-center gap-2 group select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF007F] to-[#9B5CFF] flex items-center justify-center pabd-glow-pink">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-display font-extrabold text-lg md:text-xl tracking-tight text-white leading-none">
              <span>PINK AURA</span>
              <span className="text-[#FF2D95]">BD</span>
            </div>
            <span className="text-[10px] tracking-widest uppercase text-[#A8A1B3] font-medium hidden sm:block">
              Explore The Secret World
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeCategory === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onSelectCategory(item.value)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-xs font-semibold ${
                  isActive
                    ? 'text-[#FF2D95] bg-[#FF2D95]/10 shadow-[0_0_12px_rgba(255,45,149,0.25)]'
                    : 'text-[#A8A1B3] hover:text-[#F8F5FA] hover:bg-[#14141D]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools: Search, Saved Videos, WordPress Theme Hub */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Bar Input (Desktop) */}
          <div className="relative hidden md:block w-48 xl:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search videos, creators..."
              className="w-full bg-[#14141D] border border-[#302333] focus:border-[#FF2D95] text-xs text-[#F8F5FA] rounded-full py-2 pl-9 pr-4 outline-none transition placeholder:text-[#A8A1B3]/60"
            />
            <Search className="w-4 h-4 text-[#A8A1B3] absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-xs text-[#A8A1B3] hover:text-white"
              >
                &times;
              </button>
            )}
          </div>

          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 text-[#A8A1B3] hover:text-[#FF2D95] rounded-lg transition"
            aria-label="Toggle search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Saved / Favorites Counter */}
          <button
            onClick={() => onSelectCategory('Saved')}
            title="Saved Videos"
            className={`relative p-2 rounded-lg border transition ${
              activeCategory === 'Saved'
                ? 'border-[#FF2D95] text-[#FF2D95] bg-[#FF2D95]/10'
                : 'border-[#302333] text-[#A8A1B3] hover:text-white bg-[#14141D]'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FF2D95] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          {/* WordPress Astra Child Theme Deliverables Button */}
          <button
            onClick={onOpenThemeHub}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#FF2D95] to-[#FF007F] hover:opacity-95 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-lg shadow-[#FF2D95]/20 shrink-0"
          >
            <Code2 className="w-4 h-4" />
            <span className="hidden sm:inline">WordPress Code</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown */}
      {searchOpen && (
        <div className="md:hidden px-4 py-3 bg-[#101016] border-t border-[#302333]">
          <div className="relative">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search videos, creators, regions..."
              className="w-full bg-[#14141D] border border-[#FF2D95] text-sm text-[#F8F5FA] rounded-xl py-2.5 pl-10 pr-4 outline-none"
            />
            <Search className="w-4 h-4 text-[#FF2D95] absolute left-3.5 top-3.5" />
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101016] border-b border-[#302333] px-4 py-4 space-y-1">
          <div className="text-xs uppercase tracking-wider text-[#A8A1B3] font-bold px-3 py-1">
            Browse Secret World
          </div>
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                onSelectCategory(item.value);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-between ${
                activeCategory === item.value
                  ? 'text-[#FF2D95] bg-[#FF2D95]/10'
                  : 'text-[#A8A1B3] hover:text-white hover:bg-[#14141D]'
              }`}
            >
              <span>{item.label}</span>
              {item.value === 'Trending Now' && <Flame className="w-4 h-4 text-[#FF2D95]" />}
            </button>
          ))}
          <div className="pt-2 border-t border-[#302333]">
            <button
              onClick={() => {
                onOpenThemeHub();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-[#FF2D95] hover:bg-[#14141D] flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              <span>Astra Child Theme Files (PHP/CSS)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
