import React, { useState } from 'react';
import { Play, Bookmark, Check, Eye } from 'lucide-react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
  isSaved?: boolean;
  onToggleSave?: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
  isSaved = false,
  onToggleSave,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Stylized view count for social proof badge (e.g. '1.2M views', '489K views')
  const formattedViews = video.viewsFormatted || (
    video.views >= 1_000_000
      ? `${(video.views / 1_000_000).toFixed(1)}M views`
      : video.views >= 1_000
      ? `${(video.views / 1_000).toFixed(video.views >= 100_000 ? 0 : 1)}K views`
      : `${video.views} views`
  );

  return (
    <article className="group bg-[#14141D] rounded-2xl border border-[#302333] hover:border-[#FF2D95] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#FF2D95]/20 flex flex-col overflow-hidden relative">
      
      {/* 16:9 Thumbnail Container */}
      <div 
        onClick={() => onPlay(video)}
        className="relative w-full aspect-video bg-[#101016] cursor-pointer overflow-hidden"
      >
        {!imageError ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-[#14141D] to-[#302333] text-center">
            <span className="text-xs font-bold text-[#FF2D95]">PINK AURA BD</span>
            <span className="text-[11px] text-[#A8A1B3] mt-1">{video.category}</span>
          </div>
        )}

        {/* Cinematic Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141D] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition" />

        {/* Stylized View Count Badge for Social Proof */}
        <div className="absolute top-2.5 left-2.5 bg-[#07070B]/85 backdrop-blur-md text-[10px] font-semibold text-[#F8F5FA] px-2 py-0.5 rounded-md border border-[#302333] flex items-center gap-1 shadow-md shadow-black/50 group-hover:border-[#FF2D95]/60 transition-colors z-10 pointer-events-none">
          <Eye className="w-3 h-3 text-[#FF2D95] shrink-0" />
          <span className="tabular-nums tracking-tight">{formattedViews}</span>
        </div>

        {/* Quality Tag */}
        <span className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md text-[10px] font-bold text-white px-2 py-0.5 rounded border border-white/10 z-10 pointer-events-none">
          {video.quality}
        </span>

        {/* Duration Badge */}
        <span className="absolute bottom-2.5 right-2.5 bg-black/85 text-[10px] text-[#F8F5FA] font-mono px-2 py-0.5 rounded font-semibold z-10 pointer-events-none">
          {video.duration}
        </span>

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-[#FF2D95] text-white flex items-center justify-center shadow-lg shadow-[#FF2D95]/50 transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Tagline */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#FF2D95]">
              {video.category}
            </span>

            {/* Bookmark button */}
            {onToggleSave && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(video);
                }}
                className={`p-1.5 rounded-lg border transition ${
                  isSaved
                    ? 'border-[#FF2D95] bg-[#FF2D95]/15 text-[#FF2D95]'
                    : 'border-transparent text-[#A8A1B3] hover:text-white hover:bg-[#302333]/50'
                }`}
                title={isSaved ? 'Remove from Saved' : 'Save for later'}
              >
                {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Title */}
          <h3 
            onClick={() => onPlay(video)}
            className="font-semibold text-sm text-[#F8F5FA] line-clamp-2 leading-snug cursor-pointer group-hover:text-[#FF2D95] transition"
          >
            {video.title}
          </h3>
        </div>

        {/* Unboxed Metadata & Creator Line */}
        <div className="mt-3 pt-3 border-t border-[#302333]/70 flex items-center justify-between text-xs text-[#A8A1B3]">
          <div className="flex items-center gap-2 truncate">
            <span className="text-xs text-white/90 font-medium truncate">{video.creator.name}</span>
          </div>

          <div className="flex items-center gap-1.5 tabular-nums text-[11px] shrink-0">
            <span>{video.viewsFormatted}</span>
            <span>&middot;</span>
            <span>{video.publishedDate}</span>
          </div>
        </div>

      </div>
    </article>
  );
};
