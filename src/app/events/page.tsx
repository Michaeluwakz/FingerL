import { SectionWrapper } from '@/components/section-wrapper';
import { EventGallery } from '@/components/event-gallery';

export default function EventsPage() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">Events Portfolio</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the magic we bring to every occasion. Browse our gallery of past events and get inspired for yours.
        </p>
      </div>
      <EventGallery />
    </SectionWrapper>
  );
}
