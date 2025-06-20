
"use client";

import * as React from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';

interface GalleryImage {
  src: string | StaticImageData;
  alt: string;
  dataAiHint: string;
}

interface AutoImageScrollerProps {
  images: GalleryImage[];
}

export function AutoImageScroller({ images }: AutoImageScrollerProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden py-8 bg-muted/20 group">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto"
      >
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
              <div className="p-1">
                <div className="relative aspect-[3/2] rounded-md overflow-hidden shadow-md">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    data-ai-hint={image.dataAiHint}
                    unoptimized={typeof image.src === 'string' && image.src.startsWith('http')}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background text-foreground disabled:opacity-30" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/70 hover:bg-background text-foreground disabled:opacity-30" />
      </Carousel>
       {/* Optional: uncomment to show slide progression
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
      */}
    </div>
  );
}
