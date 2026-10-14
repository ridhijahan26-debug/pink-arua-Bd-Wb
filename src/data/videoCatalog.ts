import { Video } from '../types';

import heroImg from '../assets/images/pink_aura_hero_1791965065476.jpg';
import banglaImg from '../assets/images/thumb_bangladeshi_1791965086069.jpg';
import pakImg from '../assets/images/thumb_pakistani_1791965087420.jpg';
import indImg from '../assets/images/thumb_indian_1791965087480.jpg';
import tiktokImg from '../assets/images/thumb_tiktoker_1791965112459.jpg';

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'pabd-01',
    title: 'Dhaka Cyber Beat: Underground Rooftop Electronic Sessions',
    description: 'Immerse yourself in the dark neon synthwave movement sweeping through Dhaka. Featuring live acoustic fusions, electronic rhythm pedals, and monsoon city nightscapes.',
    category: 'Bangladeshi',
    region: 'Bangladesh',
    thumbnail: banglaImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '4:18',
    views: 184500,
    viewsFormatted: '184.5K views',
    publishedDate: '4 hours ago',
    publishedTimestamp: Date.now() - 4 * 3600 * 1000,
    quality: '4K',
    creator: {
      name: 'Tanvir Hossain',
      handle: '@tanvir_sounds',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      verified: true
    },
    tags: ['Bangladeshi', 'Dhaka', 'Synthwave', 'Indie Music', 'Live'],
    isFeatured: true,
    trendingScore: 98,
    likes: 12400
  },
  {
    id: 'pabd-02',
    title: 'Lahore Couture Noir: Haute Fusion & Velvet Embroideries',
    description: 'An exclusive cinematic showcase of avant-garde South Asian high fashion. Deep violet velvet drapes paired with intricate zardozi craftsmanship under moody neon rim lighting.',
    category: 'Pakistani',
    region: 'Pakistan',
    thumbnail: pakImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '6:35',
    views: 242000,
    viewsFormatted: '242K views',
    publishedDate: '12 hours ago',
    publishedTimestamp: Date.now() - 12 * 3600 * 1000,
    quality: '4K',
    creator: {
      name: 'Zara Malik Atelier',
      handle: '@zaramalik_couture',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
      verified: true
    },
    tags: ['Pakistani', 'Fashion', 'Couture', 'Lahore', 'Design'],
    isFeatured: true,
    trendingScore: 95,
    likes: 18900
  },
  {
    id: 'pabd-03',
    title: 'Neon Flux Warehouse Choreography: Mumbai Street Crew Vol. 4',
    description: 'High-octane urban hip-hop and desi dance routine performed by Mumbai underground dancers inside an industrial warehouse under vibrant magenta light bars.',
    category: 'Indian',
    region: 'India',
    thumbnail: indImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '3:50',
    views: 310400,
    viewsFormatted: '310.4K views',
    publishedDate: '1 day ago',
    publishedTimestamp: Date.now() - 24 * 3600 * 1000,
    quality: '1080p',
    creator: {
      name: 'Aryan & Crew',
      handle: '@aryan_danceflux',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      verified: true
    },
    tags: ['Indian', 'Dance', 'Choreography', 'Urban', 'Street Style'],
    isFeatured: true,
    trendingScore: 99,
    likes: 34200
  },
  {
    id: 'pabd-04',
    title: 'Behind The Lens: Viral South Asian Creator Vlog & Mobile Rig Setup',
    description: 'Join top creator Samira as she breaks down her 3-point neon tube lighting setup, mobile cage rigs, and creative workflow for viral short-form discovery.',
    category: 'TikToker',
    thumbnail: tiktokImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '5:12',
    views: 489000,
    viewsFormatted: '489K views',
    publishedDate: '2 days ago',
    publishedTimestamp: Date.now() - 48 * 3600 * 1000,
    quality: '1080p',
    creator: {
      name: 'Samira Vlogs',
      handle: '@samira_creator',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      verified: true
    },
    tags: ['TikToker', 'Creator', 'Vlog', 'Mobile Cinema', 'Behind The Scenes'],
    isFeatured: false,
    trendingScore: 92,
    likes: 41200
  },
  {
    id: 'pabd-05',
    title: 'Cyber Stage Live: Electro Folk Revolution in Gulshan',
    description: 'When classical South Asian harmonium strings meet modular synthesizer arpeggios on a neon-drenched futuristic stage.',
    category: 'Bangladeshi',
    region: 'Bangladesh',
    thumbnail: heroImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    duration: '7:45',
    views: 128900,
    viewsFormatted: '128.9K views',
    publishedDate: '18 hours ago',
    publishedTimestamp: Date.now() - 18 * 3600 * 1000,
    quality: '4K',
    creator: {
      name: 'Farhan & ElectroFolk',
      handle: '@farhan_electro',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      verified: true
    },
    tags: ['Bangladeshi', 'Electro Folk', 'Stage', 'Performance'],
    isFeatured: true,
    trendingScore: 89,
    likes: 9800
  },
  {
    id: 'pabd-06',
    title: 'Karachi Midnight Drift: Modified Car Culture & Street Symphony',
    description: 'Documenting the pulsating midnight motorsport culture on coastal highways. Tuned engines, purple underglow, and precision handling.',
    category: 'Pakistani',
    region: 'Pakistan',
    thumbnail: pakImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    duration: '4:52',
    views: 395000,
    viewsFormatted: '395K views',
    publishedDate: '3 days ago',
    publishedTimestamp: Date.now() - 72 * 3600 * 1000,
    quality: '1080p',
    creator: {
      name: 'Karachi Motor Club',
      handle: '@kmc_speed',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      verified: true
    },
    tags: ['Pakistani', 'Motorsport', 'Karachi', 'Midnight', 'Cars'],
    isFeatured: false,
    trendingScore: 94,
    likes: 38200
  },
  {
    id: 'pabd-07',
    title: 'Delhi Neon Street Food Expedition: 10 Hidden Night Stalls',
    description: 'A sensory journey through Old Delhi night markets discovering secret spicy culinary masteries glowing under warm halogen and neon.',
    category: 'Indian',
    region: 'India',
    thumbnail: indImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    duration: '8:20',
    views: 512000,
    viewsFormatted: '512K views',
    publishedDate: '4 days ago',
    publishedTimestamp: Date.now() - 96 * 3600 * 1000,
    quality: '4K',
    creator: {
      name: 'Rohan Bites',
      handle: '@rohan_foodtrails',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      verified: true
    },
    tags: ['Indian', 'Food', 'Delhi', 'Street Food', 'Night Walk'],
    isFeatured: false,
    trendingScore: 96,
    likes: 52100
  },
  {
    id: 'pabd-08',
    title: 'Quick Transition Masterclass: Vertical Video Edits & Lighting',
    description: 'Learn seamless match cuts and mask transitions for modern viral reels and TikTok videos in under 4 minutes.',
    category: 'TikToker',
    thumbnail: tiktokImg,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    duration: '3:15',
    views: 620000,
    viewsFormatted: '620K views',
    publishedDate: '5 days ago',
    publishedTimestamp: Date.now() - 120 * 3600 * 1000,
    quality: '1080p',
    creator: {
      name: 'Maya Visuals',
      handle: '@maya_creates',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      verified: true
    },
    tags: ['TikToker', 'Editing', 'Transitions', 'Tutorial', 'Visual Effects'],
    isFeatured: false,
    trendingScore: 97,
    likes: 64500
  }
];

export const REGION_CATEGORIES = [
  {
    id: 'bangladeshi',
    title: 'Bangladeshi',
    subtitle: 'Dhaka Underground & Culture',
    thumbnail: banglaImg,
    postCount: 148,
    categoryKey: 'Bangladeshi' as const
  },
  {
    id: 'pakistani',
    title: 'Pakistani',
    subtitle: 'Lahore & Karachi Aesthetics',
    thumbnail: pakImg,
    postCount: 182,
    categoryKey: 'Pakistani' as const
  },
  {
    id: 'indian',
    title: 'Indian',
    subtitle: 'Mumbai Dance & Indie Beats',
    thumbnail: indImg,
    postCount: 265,
    categoryKey: 'Indian' as const
  }
];
