import { SectionWrapper } from '@/components/section-wrapper';
import { ContactForm } from '@/components/contact-form';
import { MapEmbed } from '@/components/map-embed';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">Get In Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you! Whether you're planning an event, have a question about our menu, or just want to say hello, reach out to us.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="bg-card p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-headline text-primary mb-6">Send Us a Message</h2>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <div className="bg-card p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-headline text-primary mb-6">Our Location</h2>
            <MapEmbed />
            <div className="mt-6 space-y-3 text-muted-foreground">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-accent mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-semibold text-primary">FingerLicking Digital HQ</h3>
                  <p>123 Culinary Street, Foodie District</p>
                  <p>Manchester, M1 1AB</p>
                  <p>United Kingdom</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card p-8 rounded-lg shadow-xl">
             <h2 className="text-3xl font-headline text-primary mb-6">Contact Details</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-accent mr-3 shrink-0" />
                <a href="mailto:info@fingerlicking.digital" className="hover:text-primary transition-colors">info@fingerlicking.digital</a>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-accent mr-3 shrink-0" />
                <a href="tel:+441611234567" className="hover:text-primary transition-colors">+44 161 123 4567</a>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Office Hours: Monday - Friday, 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
