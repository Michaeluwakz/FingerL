
import { Button } from '@/components/ui/button';
import { SectionWrapper } from '@/components/section-wrapper';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Users } from 'lucide-react';
import { AutoImageScroller } from '@/components/auto-image-scroller';
import Script from 'next/script';

const galleryImages = [
  { src: "https://i.ibb.co/1tk627gV/get-sig-EAY-t-ZCBGl74xf8i-JPsp1-Q-expires-1750385567-uri-https-instagram-fphl1-1-fna-fbcdn-net-v-t39.jpg", alt: "Vibrant food platter", dataAiHint: "food platter" },
  { src: "https://i.ibb.co/bMpp5XWy/image.png", alt: "Culinary creation 1", dataAiHint: "culinary event" },
  { src: "https://i.ibb.co/3YNfLC4B/image.png", alt: "Culinary creation 2", dataAiHint: "culinary event" },
  { src: "https://i.ibb.co/q34shjBX/image.png", alt: "Culinary creation 3", dataAiHint: "culinary event" },
  { src: "https://i.ibb.co/v4517cwz/image.png", alt: "Culinary creation 4", dataAiHint: "culinary event" },
  { src: "https://i.ibb.co/6066YYX2/image.png", alt: "Culinary creation 5", dataAiHint: "culinary event" },
  { src: "https://i.ibb.co/5hcTr4ty/image.png", alt: "Culinary creation 6", dataAiHint: "culinary event" },
  { src: "https://i.ibb.co/LDQ87PJ2/image.png", alt: "Culinary creation 7", dataAiHint: "culinary event" },
  { src: "https://i.ibb.co/nMPPrShF/image.png", alt: "Culinary creation 8", dataAiHint: "culinary event" },
  { src: "https://i.ibb.co/WvtBwfp8/image.png", alt: "Culinary creation 9", dataAiHint: "culinary event" }
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[360px] max-h-[750px] overflow-hidden">
        <Image
          src="https://i.ibb.co/wrxD8zdY/APARTMENT-8.png"
          alt="Modern, stylish apartment building exterior under a clear blue sky, representing FingerLicking Digital's brand"
          layout="fill"
          objectFit="contain"
          quality={85}
          priority
          data-ai-hint="modern building architecture"
        />
      </div>

      {/* Buttons Section */}
      <div className="py-8 flex justify-center -mt-8">
        <div className="flex flex-row gap-8">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg ml-[-16]" asChild>
            <Link href="/order">Place order</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-accent text-accent-foreground hover:bg-accent/90 border-accent hover:border-accent/90 px-8 py-3 text-lg" asChild>
            <Link href="/events">Event</Link>
          </Button>
        </div>
      </div>

      {/* Auto Image Scroller Section */}
      <div className="w-full">
        <AutoImageScroller images={galleryImages} />
      </div>
      
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-headline text-primary mb-6">A Taste of Perfection</h3>
            <p className="text-muted-foreground mb-4 text-lg leading-relaxed">
              Our chefs are artists, transforming the freshest local ingredients into culinary delights that tantalize the taste buds. We are committed to sustainability and quality, ensuring every dish is not just food, but a masterpiece.
            </p>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Whether it's a corporate luncheon, a dream wedding, or a casual get-together, we bring the same dedication and flair to every plate.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/order">Explore Our Menu</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl aspect-video relative">
            <iframe
              src="https://player.vimeo.com/video/1094900303?h=63836ce325&badge=0&autopause=0&player_id=0&app_id=58479&background=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              title="Promotional video showcasing food preparation and event catering by FingerLicking Digital"
              allowFullScreen
              data-ai-hint="food preparation video"
            ></iframe>
          </div>
        </div>
      </SectionWrapper>

      {/* Services Section */}
      <SectionWrapper className="bg-muted/50 py-16 md:py-20 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-headline text-primary mb-4">Our Services</h2>
          <p className="text-lg text-foreground max-w-2xl mx-auto">
            Whether you need a delightful meal delivered or full-service catering for your special event, we've got you covered.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Food Delivery Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex items-center mb-3">
                <Truck className="w-10 h-10 text-accent mr-4" />
                <CardTitle className="font-headline text-3xl text-primary">Food Delivery</CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                Enjoy our delicious meals at your home or office. We offer weekly meal plans, corporate lunches, and vibrant party platters.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-1">
                Customizable options available including:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-4">
                <li>Vegan selections</li>
                <li>Gluten-Free choices</li>
                <li>Spicy preferences</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3" asChild>
                <Link href="/order">Explore Menu & Order Now</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Event Catering Card */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <div className="flex items-center mb-3">
                <Users className="w-10 h-10 text-accent mr-4" />
                <CardTitle className="font-headline text-3xl text-primary">Event Catering</CardTitle>
              </div>
              <CardDescription className="text-base text-muted-foreground">
                Make your event unforgettable with our bespoke catering services. We offer a range of packages to suit your needs and budget.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm font-semibold text-primary mb-2">Our Popular Packages:</p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li><strong>Silver Package:</strong> Ideal for intimate gatherings (Starting from $45/person).</li>
                <li><strong>Gold Package:</strong> Our most popular choice for a balanced & elegant offering (Starting from $65/person).</li>
                <li><strong>Platinum Package:</strong> Premium selections for an exquisite, all-inclusive experience (Starting from $95/person).</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3" asChild>
                <Link href="/contact">Get a Custom Quote</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </SectionWrapper>
      <Script src="https://player.vimeo.com/api/player.js" strategy="afterInteractive" />
    </>
  );
}
