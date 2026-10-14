import React from 'react';
import { ChevronRight, Globe2 } from 'lucide-react';
import { REGION_CATEGORIES } from '../data/videoCatalog';
import { VideoCategory } from '../types';

interface RegionShowcaseProps {
  onSelectRegion: (category: VideoCategory) => void;
}

export const RegionShowcase: React.FC<RegionShowcaseProps> = ({ onSelectRegion }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-b border-[#302333] my-8 bg-[#101016]/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <Globe2 className="w-5 h-5 text-[#FF2D95]" />
          <div>
            <h2 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">
              Explore By Region
            </h2>
            <p className="text-xs text-[#A8A1B3]">
              Curated cultural feeds across Bangladesh, Pakistan, and India
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {REGION_CATEGORIES.map((region) => (
          <div
            key={region.id}
            onClick={() => onSelectRegion(region.categoryKey)}
            className="group relative rounded-2xl overflow-hidden border border-[#302333] hover:border-[#FF2D95] transition-all duration-300 cursor-pointer bg-[#14141D] hover:shadow-xl hover:shadow-[#FF2D95]/15 flex flex-col justify-between h-48 sm:h-52"
          >
            {/* Visual Background with Dark Vignette */}
            <div className="absolute inset-0">
              <img
                src={region.thumbnail}
                alt={region.title}
                className="w-full h-full object-cover opacity-45 group-hover:opacity-65 transition-all duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-[#07070B]/70 to-transparent" />
            </div>

            {/* Top Region Badge & Post Count */}
            <div className="relative z-10 p-5 flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#FF2D95] bg-[#07070B]/80 px-2.5 py-1 rounded-md border border-[#FF2D95]/30">
                {region.title}
              </span>
              <span className="text-xs font-mono text-[#F8F5FA] bg-[#14141D]/90 px-2 py-0.5 rounded border border-[#302333]">
                {region.postCount} Videos
              </span>
            </div>

            {/* Bottom Content & View All Link */}
            <div className="relative z-10 p-5">
              <h3 className="text-lg font-bold text-white group-hover:text-[#FF2D95] transition flex items-center gap-1.5">
                <span>{region.title} Discoveries</span>
                <ChevronRight className="w-4 h-4 text-[#FF2D95] transform group-hover:translate-x-1 transition-transform" />
              </h3>
              <p className="text-xs text-[#A8A1B3] mt-1">
                {region.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
