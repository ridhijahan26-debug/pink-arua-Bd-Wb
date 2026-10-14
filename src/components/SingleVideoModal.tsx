import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Heart, 
  Share2, 
  Bookmark, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Calendar,
  Sparkles
} from 'lucide-react';
import { Video } from '../types';
import { AdBanner } from './AdBanner';

interface SingleVideoModalProps {
  video: Video | null;
  onClose: () => void;
  allVideos: Video[];
  onSelectVideo: (video: Video) => void;
  isSaved?: boolean;
  onToggleSave?: (video: Video) => void;
}

export const SingleVideoModal: React.FC<SingleVideoModalProps> = ({
  video,
  onClose,
  allVideos,
  onSelectVideo,
  isSaved = false,
  onToggleSave,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (video) {
      setLikesCount(video.likes || 1200);
      setHasLiked(false);
      setProgress(0);
      setIsPlaying(false);
      // Auto-focus modal & disable body scroll
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [video]);

  if (!video) return null;

  // Next and Previous video navigation
  const currentIndex = allVideos.findIndex((v) => v.id === video.id);
  const prevVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : allVideos[allVideos.length - 1];
  const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : allVideos[0];

  const handlePlayToggle = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newTime = (parseFloat(e.target.value) / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id && (v.category === video.category || v.region === video.region))
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07070B]/95 backdrop-blur-xl flex flex-col justify-between">
      
      {/* 1. Custom Compact Player Header */}
      <header className="sticky top-0 z-20 bg-[#101016]/95 border-b border-[#302333] px-4 sm:px-6 h-14 flex items-center justify-between">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-semibold text-[#A8A1B3] hover:text-[#FF2D95] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Discovery</span>
        </button>

        {/* Brand identity */}
        <div className="flex items-center gap-2 select-none">
          <Sparkles className="w-4 h-4 text-[#FF2D95]" />
          <span className="font-display font-bold text-sm tracking-wide text-white">
            PINK AURA <span className="text-[#FF2D95]">BD</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono bg-[#14141D] border border-[#302333] px-2 py-0.5 rounded text-[#FF2D95]">
            {video.quality}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A8A1B3] hover:text-white hover:bg-[#14141D] transition"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Single Post View Content */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
        
        {/* 7. Responsive 16:9 Video Player */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[#302333] shadow-2xl shadow-[#FF2D95]/15 mb-6 group">
          <video
            ref={videoRef}
            src={video.videoUrl}
            poster={video.thumbnail}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Interactive Player Scrim & Controls Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
            
            {/* Top Bar inside Player */}
            <div className="flex items-center justify-between text-xs text-white">
              <span className="bg-[#FF2D95] font-bold px-2 py-0.5 rounded text-[10px]">
                {video.category}
              </span>
              <span className="font-mono text-xs">{video.duration}</span>
            </div>

            {/* Center Big Play Trigger */}
            <div className="flex items-center justify-center">
              <button
                onClick={handlePlayToggle}
                className="w-16 h-16 rounded-full bg-[#FF2D95]/90 hover:bg-[#FF2D95] text-white flex items-center justify-center shadow-xl shadow-[#FF2D95]/50 transform hover:scale-110 transition active:scale-95"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-7 h-7 fill-white" /> : <Play className="w-7 h-7 fill-white ml-1" />}
              </button>
            </div>

            {/* Bottom Scrubber & Controls */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#FF2D95]"
              />

              <div className="flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <button onClick={handlePlayToggle} className="hover:text-[#FF2D95]">
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={handleMuteToggle} className="hover:text-[#FF2D95]">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] text-[#A8A1B3]">{video.title}</span>
                </div>
                <button onClick={handleFullscreen} className="hover:text-[#FF2D95]">
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Fallback Play Button when paused and unhovered */}
          {!isPlaying && (
            <button
              onClick={handlePlayToggle}
              className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:hidden"
            >
              <div className="w-16 h-16 rounded-full bg-[#FF2D95] text-white flex items-center justify-center shadow-2xl shadow-[#FF2D95]/60">
                <Play className="w-7 h-7 fill-white ml-1" />
              </div>
            </button>
          )}
        </div>

        {/* Adsterra Under-Player Responsive Banner (728x90 / 300x250) */}
        <AdBanner format="banner-728" />

        {/* Video Header, Metadata & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#302333]">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-xs font-semibold">
              <span className="text-[#FF2D95]">{video.category}</span>
              {video.region && (
                <>
                  <span className="text-[#A8A1B3]">&middot;</span>
                  <span className="text-[#A8A1B3]">{video.region}</span>
                </>
              )}
              <span className="text-[#A8A1B3]">&middot;</span>
              <span className="text-[#A8A1B3] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {video.publishedDate}
              </span>
            </div>

            <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">
              {video.title}
            </h1>

            {/* Creator Profile */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF2D95] to-[#9B5CFF] p-[2px]">
                <div className="w-full h-full rounded-full bg-[#14141D] flex items-center justify-center font-bold text-xs text-[#FF2D95]">
                  {video.creator.name.slice(0, 2).toUpperCase()}
                </div>
              </div>
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>{video.creator.name}</span>
                  {video.creator.verified && (
                    <span className="w-4 h-4 rounded-full bg-[#FF2D95] text-white text-[10px] flex items-center justify-center">✓</span>
                  )}
                </div>
                <div className="text-xs text-[#A8A1B3]">{video.creator.handle}</div>
              </div>
            </div>
          </div>

          {/* Social Actions & Adsterra Direct Link CTA */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Adsterra Direct Link CTA */}
            <AdBanner format="direct-cta" />

            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition ${
                hasLiked
                  ? 'border-[#FF2D95] bg-[#FF2D95]/20 text-[#FF2D95]'
                  : 'border-[#302333] bg-[#14141D] text-[#A8A1B3] hover:text-white hover:border-[#FF2D95]'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-[#FF2D95]' : ''}`} />
              <span className="tabular-nums">{likesCount.toLocaleString()}</span>
            </button>

            {onToggleSave && (
              <button
                onClick={() => onToggleSave(video)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition ${
                  isSaved
                    ? 'border-[#FF2D95] bg-[#FF2D95]/20 text-[#FF2D95]'
                    : 'border-[#302333] bg-[#14141D] text-[#A8A1B3] hover:text-white hover:border-[#FF2D95]'
                }`}
              >
                {isSaved ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isSaved ? 'Saved' : 'Watch Later'}</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#302333] bg-[#14141D] text-xs font-bold text-[#A8A1B3] hover:text-white hover:border-[#FF2D95] transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Description & Tags */}
        <div className="py-6 border-b border-[#302333] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-[#A8A1B3] font-bold">
              About This Discovery
            </h3>
            <p className="text-sm text-[#A8A1B3] leading-relaxed">
              {video.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {video.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#14141D] border border-[#302333] text-xs text-[#A8A1B3] px-2.5 py-1 rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#14141D] p-4 rounded-xl border border-[#302333] space-y-2.5 text-xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#FF2D95] block">
              Verified Media Metadata
            </span>
            <div className="flex items-center justify-between text-[#A8A1B3]">
              <span>Total Views</span>
              <span className="text-white font-mono">{video.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-[#A8A1B3]">
              <span>Resolution</span>
              <span className="text-white font-mono">{video.quality} Master</span>
            </div>
            <div className="flex items-center justify-between text-[#A8A1B3]">
              <span>Duration</span>
              <span className="text-white font-mono">{video.duration}</span>
            </div>
            <div className="flex items-center justify-between text-[#A8A1B3]">
              <span>Trending Score</span>
              <span className="text-[#FF2D95] font-bold font-mono">{video.trendingScore}/100</span>
            </div>
          </div>
        </div>

        {/* 11. Next & Previous Post Navigation */}
        <div className="py-6 flex items-center justify-between border-b border-[#302333]">
          <button
            onClick={() => onSelectVideo(prevVideo)}
            className="flex items-center gap-2 text-xs font-bold text-[#A8A1B3] hover:text-[#FF2D95] transition p-2 rounded-lg hover:bg-[#14141D]"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left hidden sm:block">
              <span className="block text-[10px] uppercase text-[#A8A1B3]/60">Previous</span>
              <span className="truncate max-w-[200px] block text-white">{prevVideo.title}</span>
            </div>
          </button>

          <button
            onClick={() => onSelectVideo(nextVideo)}
            className="flex items-center gap-2 text-xs font-bold text-[#A8A1B3] hover:text-[#FF2D95] transition p-2 rounded-lg hover:bg-[#14141D]"
          >
            <div className="text-right hidden sm:block">
              <span className="block text-[10px] uppercase text-[#A8A1B3]/60">Next Video</span>
              <span className="truncate max-w-[200px] block text-white">{nextVideo.title}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 10. Related Videos Section */}
        {relatedVideos.length > 0 && (
          <div className="pt-8">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              Related In Secret World
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedVideos.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectVideo(item)}
                  className="bg-[#14141D] rounded-xl border border-[#302333] hover:border-[#FF2D95] p-2 cursor-pointer transition group"
                >
                  <div className="aspect-video relative rounded-lg overflow-hidden bg-black mb-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/80 text-[9px] font-mono px-1 rounded text-white">
                      {item.duration}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-[#FF2D95] transition">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-[#A8A1B3] mt-1">{item.creator.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

    </div>
  );
};
