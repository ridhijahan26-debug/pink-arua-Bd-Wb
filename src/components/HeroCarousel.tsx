import React, { useState, useEffect, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Eye, Calendar, Sparkles } from 'lucide-react';
import { Video } from '../types';

interface HeroCarouselProps {
  featuredVideos: Video[];
  onPlayVideo: (video: Video) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  featuredVideos,
  onPlayVideo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const total = featuredVideos.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  // Autoplay with hover pause
  useEffect(() => {
    if (total <= 1) return;
    autoPlayRef.current = setInterval(nextSlide, 7000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, total]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  const resumeAutoPlay = () => {
    if (total <= 1) return;
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(nextSlide, 7000);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  if (!featuredVideos || featuredVideos.length === 0) return null;
  const currentVideo = featuredVideos[currentIndex];

  return (
    <section 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Featured Videos Carousel"
    >
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-[#302333] shadow-2xl bg-[#14141D] group">
        
        {/* Visual Media Layer */}
        <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/9] w-full overflow-hidden">
          <img
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {/* Cinematic Dark Gradient Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-[#07070B]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07070B]/90 via-[#07070B]/40 to-transparent" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-8 md:p-12 z-10 max-w-3xl">
            
            {/* Badges & Meta */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3 text-xs">
              <span className="bg-[#FF2D95] text-white font-bold px-2.5 py-1 rounded-md tracking-wider uppercase text-[10px] flex items-center gap-1 shadow-md shadow-[#FF2D95]/40">
                <Sparkles className="w-3 h-3" />
                Featured Discovery
              </span>
              <span className="text-[#FF2D95] font-semibold text-xs tracking-wide">
                {currentVideo.category}
              </span>
              <span className="text-[#A8A1B3]">&middot;</span>
              <span className="bg-[#14141D]/80 border border-[#302333] text-[#F8F5FA] font-mono px-2 py-0.5 rounded text-[10px]">
                {currentVideo.quality}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-xl sm:text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 text-balance">
              {currentVideo.title}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#A8A1B3] line-clamp-2 md:line-clamp-3 mb-5 max-w-2xl leading-relaxed">
              {currentVideo.description}
            </p>

            {/* Stats & Watch Now Action */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onPlayVideo(currentVideo)}
                className="inline-flex items-center gap-2.5 bg-[#FF2D95] hover:bg-[#FF007F] text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-3 rounded-xl transition shadow-lg shadow-[#FF2D95]/40 active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch Now</span>
              </button>

              <div className="flex items-center gap-3 text-xs text-[#A8A1B3]">
                <div className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-[#A8A1B3]" />
                  <span>{currentVideo.viewsFormatted}</span>
                </div>
                <span>&middot;</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#A8A1B3]" />
                  <span>{currentVideo.publishedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#101016]/80 hover:bg-[#FF2D95] text-white flex items-center justify-center border border-[#302333] transition opacity-0 group-hover:opacity-100 z-20"
          aria-label="Previous featured video"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#101016]/80 hover:bg-[#FF2D95] text-white flex items-center justify-center border border-[#302333] transition opacity-0 group-hover:opacity-100 z-20"
          aria-label="Next featured video"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 right-4 sm:right-8 z-20 flex items-center gap-2">
          {featuredVideos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? 'w-7 bg-[#FF2D95] shadow-[0_0_10px_#FF2D95]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
