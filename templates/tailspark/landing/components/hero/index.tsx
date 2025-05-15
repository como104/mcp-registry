"use client";

import dynamic from 'next/dynamic';
import { Hero } from "@/types/landing";
import { HERO_CONFIG } from '../../config/hero'; // Assuming this is still needed for slides data or other configs
// import { HeroSlider } from './HeroSlider'; // Original import, will be replaced

// Dynamically import HeroSlider with SSR turned off
const DynamicHeroSlider = dynamic(() => 
  import('./HeroSlider').then((mod) => mod.HeroSlider), 
  { ssr: false }
);

// Sample data - ensure this matches the structure expected by HeroSlider
// This might come from HERO_CONFIG or be defined here/passed as props
const sampleSlides = [
  {
    imageUrl: '/images/hero/slide-1.jpg',
    title: 'Empowering Your Digital Future',
    description: 'Discover innovative solutions and services tailored for your success in the ever-evolving digital landscape.',
    sponsorLink: 'https://deepsite.site'
  },
  {
    imageUrl: '/images/hero/slide-2.jpg',
    title: 'Next-Gen Technology Showcase',
    description: 'Explore cutting-edge technologies that redefine possibilities and drive transformative change across industries.',
    sponsorLink: 'https://deepsite.site'
  },
  // Add more slides if needed
];

export default ({ hero, count }: { hero: Hero; count?: number }) => {
  return (
    <section className="relative bg-gray-50 py-8 sm:py-12 lg:py-16">
      <DynamicHeroSlider slides={sampleSlides} />
    </section>
  );
};
