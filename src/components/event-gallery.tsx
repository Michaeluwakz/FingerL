
"use client";

import { useState } from 'react';
import { eventItems, eventTypes } from '@/lib/data';
import type { EventItem, EventType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function EventGallery() {
  const [activeFilter, setActiveFilter] = useState<EventType | 'All'>('All');

  const filteredEvents = activeFilter === 'All'
    ? eventItems
    : eventItems.filter(event => event.type === activeFilter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button
          variant={activeFilter === 'All' ? 'default' : 'outline'}
          onClick={() => setActiveFilter('All')}
          className={activeFilter === 'All' ? 'bg-primary text-primary-foreground' : 'text-primary border-primary'}
        >
          All Events
        </Button>
        {eventTypes.map(type => (
          <Button
            key={type.name}
            variant={activeFilter === type.name ? 'default' : 'outline'}
            onClick={() => setActiveFilter(type.name)}
            className={`capitalize ${activeFilter === type.name ? 'bg-primary text-primary-foreground' : 'text-primary border-primary'}`}
          >
            <type.icon className="w-4 h-4 mr-2 text-accent" />
            {type.name}
          </Button>
        ))}
      </div>

      {filteredEvents.length === 0 ? (
         <p className="text-center text-muted-foreground text-lg">No events found for this category. Check back soon!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map(event => (
            <Card 
              key={event.id}
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              {event.videoUrl ? (
                <div className="relative aspect-square"> {/* Changed from aspect-video to aspect-square */}
                  <iframe
                    src={event.videoUrl}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    className="absolute inset-0 w-full h-full transition-transform duration-300 group-hover:scale-105"
                    title={event.name || `${event.type} Highlight`}
                    allowFullScreen
                    data-ai-hint={event.dataAiHint || eventTypes.find(et => et.name === event.type)?.dataAiHint || 'event video'}
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-square bg-muted flex items-center justify-center"> {/* Also changed here for consistency if a video URL is missing */}
                  <p className="text-muted-foreground">Video not available</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
