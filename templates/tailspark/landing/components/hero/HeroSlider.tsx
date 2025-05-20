"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper as SwiperCore } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { HERO_CONFIG } from '../../config/hero';
import type { HeroSlide } from '../../types';

export const HeroSlider: React.FC<{ slides: HeroSlide[] }> = ({ slides }) => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [realIndex, setRealIndex] = useState(0);

  useEffect(() => {
    const preloadNextImage = (currentIndex: number) => {
      if (!slides || slides.length === 0) return;
      const nextIndex = (currentIndex + 1) % slides.length;
      const img = new window.Image();
      img.src = slides[nextIndex].imageUrl;
    };

    if (slides.length > 1) {
      preloadNextImage(realIndex);
    }
  }, [slides, realIndex]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const fallbackImage = '/images/hero/fallback.jpg';
    console.error("Image failed to load, attempting fallback:", e.currentTarget.src);
    e.currentTarget.src = fallbackImage;
  };

  return (
    <div role="region" aria-label="Hero image carousel" className="mx-auto max-w-[115rem] px-2 sm:px-3 lg:px-4">
      <div className="overflow-hidden rounded-xl">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setRealIndex(swiper.realIndex)}
          autoplay={{ delay: HERO_CONFIG.autoplayDelay }}
          speed={HERO_CONFIG.transitionSpeed}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          className="h-[400px] sm:h-[500px] lg:h-[500px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide 
              key={slide.imageUrl || slide.title || `slide-${index}`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title || "Hero image"}
                  fill
                  priority={index === realIndex}
                  sizes="90vw"
                  className="object-cover"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40">
                  <div className="mx-auto max-w-[90rem] h-full px-2 md:px-4 py-12 sm:py-16 lg:py-20">
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-2xl text-base leading-7 text-gray-100 sm:mt-6 sm:text-lg lg:text-xl">
                        {slide.description}
                      </p>
                      {slide.sponsorLink && (
                        <p className="mt-4 text-sm text-gray-300 sm:text-base">
                          Sponsored by{" "}
                          <a
                            href={slide.sponsorLink}
                            className="text-orange-500 hover:text-orange-400"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            deepsite.site
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};