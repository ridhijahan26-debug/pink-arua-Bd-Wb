export type VideoCategory = 
  | 'Trending Now'
  | 'Bangladeshi'
  | 'Pakistani'
  | 'Indian'
  | 'Most Trending'
  | 'TikToker'
  | 'Latest Videos';

export interface Creator {
  name: string;
  handle: string;
  avatar: string;
  verified?: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  category: VideoCategory;
  region?: 'Bangladesh' | 'Pakistan' | 'India' | 'Global';
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  viewsFormatted: string;
  publishedDate: string;
  publishedTimestamp: number;
  quality: '4K' | '1080p' | 'HD';
  creator: Creator;
  tags: string[];
  isFeatured?: boolean;
  trendingScore: number; // 0 - 100 based on 7-day velocity
  likes: number;
}

export type SortOption = 'latest' | 'trending' | 'most_viewed';
