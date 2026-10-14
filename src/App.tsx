import React, { useState, useMemo, useEffect } from 'react';
import { 
  Flame, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  Video as VideoIcon, 
  Bookmark, 
  ArrowRight,
  FilterX
} from 'lucide-react';
import { Video, VideoCategory, SortOption } from './types';
import { INITIAL_VIDEOS } from './data/videoCatalog';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { VideoCard } from './components/VideoCard';
import { RegionShowcase } from './components/RegionShowcase';
import { SingleVideoModal } from './components/SingleVideoModal';
import { WordPressThemeModal } from './components/WordPressThemeModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { AdBanner } from './components/AdBanner';
import { SocialBarAd } from './components/SocialBarAd';

export default function App() {
  const [videos] = useState<Video[]>(INITIAL_VIDEOS);
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'All' | 'Saved'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState<SortOption>('latest');
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [isThemeHubOpen, setIsThemeHubOpen] = useState(false);
  const [savedVideoIds, setSavedVideoIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('pink_aura_saved');
      return stored ? JSON.parse(stored) : ['pabd-01', 'pabd-03'];
    } catch {
      return ['pabd-01', 'pabd-03'];
    }
  });
  const [visibleLatestCount, setVisibleLatestCount] = useState(4);

  // Sync saved videos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pink_aura_saved', JSON.stringify(savedVideoIds));
    } catch {}
  }, [savedVideoIds]);

  const handleToggleSave = (video: Video) => {
    setSavedVideoIds((prev) => 
      prev.includes(video.id) ? prev.filter((id) => id !== video.id) : [...prev, video.id]
    );
  };

  // Filtered & sorted videos list
  const filteredVideos = useMemo(() => {
    return videos
      .filter((video) => {
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = video.title.toLowerCase().includes(q);
          const matchDesc = video.description.toLowerCase().includes(q);
          const matchCreator = video.creator.name.toLowerCase().includes(q) || video.creator.handle.toLowerCase().includes(q);
          const matchTags = video.tags.some((t) => t.toLowerCase().includes(q));
          const matchRegion = video.region?.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchCreator && !matchTags && !matchRegion) {
            return false;
          }
        }

        // Category filter
        if (activeCategory === 'Saved') {
          return savedVideoIds.includes(video.id);
        }
        if (activeCategory === 'All') return true;
        if (activeCategory === 'Trending Now') return video.trendingScore >= 94;
        if (activeCategory === 'Most Trending') return video.views >= 300000;
        if (activeCategory === 'Latest Videos') return true;
        return video.category === activeCategory;
      })
      .sort((a, b) => {
        if (activeSort === 'most_viewed') {
          return b.views - a.views;
        }
        if (activeSort === 'trending') {
          return b.trendingScore - a.trendingScore;
        }
        return b.publishedTimestamp - a.publishedTimestamp;
      });
  }, [videos, activeCategory, searchQuery, activeSort, savedVideoIds]);

  // Featured videos for Hero Carousel
  const featuredVideos = useMemo(() => {
    return videos.filter((v) => v.isFeatured);
  }, [videos]);

  // Section B: Trending Now (Top 4 by trendingScore)
  const trendingVideos = useMemo(() => {
    return [...videos].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 4);
  }, [videos]);

  // Section D: Most Trending (Ranked by 7-Day Velocity & View Count)
  const mostTrendingVideos = useMemo(() => {
    return [...videos].sort((a, b) => b.views - a.views).slice(0, 4);
  }, [videos]);

  // Section E: TikToker creator videos
  const tiktokerVideos = useMemo(() => {
    return videos.filter((v) => v.category === 'TikToker');
  }, [videos]);

  // Section F: Latest Videos (sorted strictly by date)
  const latestVideos = useMemo(() => {
    return [...videos].sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);
  }, [videos]);

  const isHomepageMasterView = activeCategory === 'All' && searchQuery.trim() === '';

  return (
    <div className="min-h-screen bg-[#07070B] text-[#F8F5FA] flex flex-col selection:bg-[#FF2D95] selection:text-white">
      
      {/* 4. Global Responsive Header */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenThemeHub={() => setIsThemeHubOpen(true)}
        savedCount={savedVideoIds.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* HOMEPAGE VIEW: Sections A through F in exact ordered master sequence */}
        {isHomepageMasterView ? (
          <>
            {/* Section A: Hero / Featured Videos Carousel */}
            <HeroCarousel
              featuredVideos={featuredVideos}
              onPlayVideo={(video) => setActiveVideo(video)}
            />

            {/* Category Quick Filter Strip */}
            <CategoryFilterBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              activeSort={activeSort}
              onSelectSort={setActiveSort}
              totalCount={videos.length}
            />

            {/* Section B: Trending Now */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FF2D95]/15 text-[#FF2D95] flex items-center justify-center pabd-glow-pink">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                      <span>Trending Now</span>
                      <span className="text-xs bg-[#FF2D95]/20 text-[#FF2D95] font-mono px-2 py-0.5 rounded-full font-bold">
                        Hot
                      </span>
                    </h2>
                    <p className="text-xs text-[#A8A1B3]">
                      Most engaged video streams across the network today
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCategory('Trending Now')}
                  className="text-xs font-bold text-[#FF2D95] hover:text-[#FF007F] flex items-center gap-1 group transition"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {trendingVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={(v) => setActiveVideo(v)}
                    isSaved={savedVideoIds.includes(video.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            </section>

            {/* Adsterra Native In-Feed Sponsored Stream */}
            <AdBanner format="native" />

            {/* Section C: Country / Region Categories (Bangladeshi, Pakistani, Indian) */}
            <RegionShowcase
              onSelectRegion={(reg) => {
                setActiveCategory(reg);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Section D: Most Trending (Ranked by 7-day velocity) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#9B5CFF]/15 text-[#9B5CFF] flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Most Trending
                    </h2>
                    <p className="text-xs text-[#A8A1B3]">
                      Ranked by verified 7-day velocity score & total audience engagement
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveCategory('Most Trending');
                    setActiveSort('trending');
                  }}
                  className="text-xs font-bold text-[#FF2D95] hover:text-[#FF007F] flex items-center gap-1 group transition"
                >
                  <span>Rankings</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {mostTrendingVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={(v) => setActiveVideo(v)}
                    isSaved={savedVideoIds.includes(video.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            </section>

            {/* Section E: TikToker Creator Spotlight */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-[#302333]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FF2D95] to-[#FF007F] text-white flex items-center justify-center pabd-glow-pink">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      TikToker Spotlight
                    </h2>
                    <p className="text-xs text-[#A8A1B3]">
                      Viral short-form visualists, editing gurus, and mobile studio creators
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCategory('TikToker')}
                  className="text-xs font-bold text-[#FF2D95] hover:text-[#FF007F] flex items-center gap-1 group transition"
                >
                  <span>All Creators</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {tiktokerVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={(v) => setActiveVideo(v)}
                    isSaved={savedVideoIds.includes(video.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            </section>

            {/* Section F: Latest Videos */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-[#302333]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#14141D] border border-[#302333] text-[#A8A1B3] flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#FF2D95]" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                      Latest Videos
                    </h2>
                    <p className="text-xs text-[#A8A1B3]">
                      Freshly published uploads chronologically ordered
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {latestVideos.slice(0, visibleLatestCount).map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={(v) => setActiveVideo(v)}
                    isSaved={savedVideoIds.includes(video.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>

              {/* Load More Button */}
              {visibleLatestCount < latestVideos.length && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setVisibleLatestCount((prev) => prev + 4)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#302333] hover:border-[#FF2D95] bg-[#14141D] hover:bg-[#FF2D95]/10 text-xs font-bold text-white transition shadow-sm"
                  >
                    <span>Load More Videos</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FF2D95]" />
                  </button>
                </div>
              )}
            </section>
          </>
        ) : (
          /* FILTERED / SEARCH / CATEGORY ARCHIVE VIEW */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Archive Header */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#302333]">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#FF2D95] font-bold uppercase tracking-wider mb-1">
                  <span>Archive Discovery</span>
                  <span>&middot;</span>
                  <span>{activeCategory}</span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {searchQuery ? `Search: "${searchQuery}"` : activeCategory === 'Saved' ? 'Your Saved Videos' : `${activeCategory} Videos`}
                </h1>
                <p className="text-xs text-[#A8A1B3] mt-1">
                  Showing {filteredVideos.length} matching video results
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#302333] hover:border-[#FF2D95] bg-[#14141D] text-xs font-semibold text-[#A8A1B3] hover:text-white transition"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>Reset to Homepage</span>
              </button>
            </div>

            {/* Filter bar for category archive */}
            <CategoryFilterBar
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              activeSort={activeSort}
              onSelectSort={setActiveSort}
              totalCount={filteredVideos.length}
            />

            {/* Grid or Empty Result State */}
            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
                {filteredVideos.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    onPlay={(v) => setActiveVideo(v)}
                    isSaved={savedVideoIds.includes(video.id)}
                    onToggleSave={handleToggleSave}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-[#14141D] rounded-3xl border border-[#302333] my-6">
                <div className="w-12 h-12 rounded-full bg-[#302333] text-[#A8A1B3] flex items-center justify-center mx-auto mb-3">
                  <VideoIcon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">No videos found</h3>
                <p className="text-xs text-[#A8A1B3] max-w-sm mx-auto mb-4">
                  {activeCategory === 'Saved' 
                    ? "You haven't saved any videos yet. Click the bookmark icon on any card to save videos for later."
                    : "No videos match your search query or filter selection."}
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="bg-[#FF2D95] hover:bg-[#FF007F] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition"
                >
                  Return to Discovery
                </button>
              </div>
            )}
          </div>
        )}

      </main>

      {/* 8. Single Video Post Modal View */}
      {activeVideo && (
        <SingleVideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          allVideos={videos}
          onSelectVideo={(video) => setActiveVideo(video)}
          isSaved={savedVideoIds.includes(activeVideo.id)}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* 15. WordPress Theme Suite Explorer Modal */}
      <WordPressThemeModal
        isOpen={isThemeHubOpen}
        onClose={() => setIsThemeHubOpen(false)}
      />

      {/* 11. Mobile Bottom Navigation */}
      <MobileBottomNav
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenThemeHub={() => setIsThemeHubOpen(true)}
        savedCount={savedVideoIds.length}
      />

      {/* Section G: Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenThemeHub={() => setIsThemeHubOpen(true)}
      />

      {/* Adsterra Social Bar Ad Container */}
      <SocialBarAd />

    </div>
  );
}
