import Image from 'next/image';

export function MapEmbed() {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md border border-border">
      {/* In a real app, you'd use @vis.gl/react-google-maps or an iframe with an API key */}
      <Image
        src="https://placehold.co/800x450.png"
        alt="Map showing FingerLicking Digital location in Manchester"
        width={800}
        height={450}
        layout="responsive"
        className="object-cover"
        data-ai-hint="map manchester"
      />
    </div>
  );
}
