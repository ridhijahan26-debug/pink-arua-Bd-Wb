import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { VideoCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: VideoCategory | 'All') => void;
  onOpenThemeHub: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenThemeHub }) => {
  return (
    <footer className="bg-[#101016] border-t border-[#302333] text-[#A8A1B3] text-xs pt-12 pb-24 lg:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#302333]">
          
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-1">
            <div 
              onClick={() => onSelectCategory('All')} 
              className="cursor-pointer flex items-center gap-2 group select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF007F] to-[#9B5CFF] flex items-center justify-center pabd-glow-pink">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="font-display font-extrabold text-lg text-white">
                PINK AURA <span className="text-[#FF2D95]">BD</span>
              </div>
            </div>

            <p className="text-xs text-[#A8A1B3] leading-relaxed">
              Explore The Secret World. The premier dark-neon destination for South Asian music, underground culture, avant-garde fashion, and trending digital creators.
            </p>

            <div className="text-[11px] text-[#A8A1B3]">
              Astra Child Theme Architecture &middot; WordPress 6.x
            </div>
          </div>

          {/* Column 2: Regional Channels */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-3">
              Regional Channels
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('Bangladeshi')}
                  className="hover:text-[#FF2D95] transition"
                >
                  Bangladeshi Discoveries
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Pakistani')}
                  className="hover:text-[#FF2D95] transition"
                >
                  Pakistani Aesthetics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Indian')}
                  className="hover:text-[#FF2D95] transition"
                >
                  Indian Underground & Dance
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Discovery & Trending */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-3">
              Discovery
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('Trending Now')}
                  className="hover:text-[#FF2D95] transition"
                >
                  Trending Now
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Most Trending')}
                  className="hover:text-[#FF2D95] transition"
                >
                  Most Trending (7-Day Velocity)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('TikToker')}
                  className="hover:text-[#FF2D95] transition"
                >
                  TikToker Creator Spotlight
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Latest Videos')}
                  className="hover:text-[#FF2D95] transition"
                >
                  Latest Added Videos
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Platform & Architecture */}
          <div>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-3">
              Platform & Engineering
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenThemeHub}
                  className="text-[#FF2D95] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Astra Child Theme Files</span>
                </button>
              </li>
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); alert("Pink Aura BD is an independent video discovery platform. All rights belong to original creators."); }} className="hover:text-white transition">
                  About Secret World
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms of Service: Authorized streaming previews and non-exclusive media distribution."); }} className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Privacy Policy: Zero tracking pixels or personal data sale."); }} className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); alert("Contact: engineering@pinkaurabd.com"); }} className="hover:text-white transition">
                  Contact Editorial
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A8A1B3]">
          <div>
            &copy; {new Date().getFullYear()} Pink Aura BD. Explore The Secret World. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[#A8A1B3]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#FF2D95] fill-[#FF2D95]" />
            <span>for high-performance video discovery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
