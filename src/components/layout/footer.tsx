import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="#" aria-label="Facebook" className="text-accent hover:text-primary transition-colors">
            <Facebook size={24} />
          </Link>
          <Link href="#" aria-label="Instagram" className="text-accent hover:text-primary transition-colors">
            <Instagram size={24} />
          </Link>
          <Link href="#" aria-label="Twitter" className="text-accent hover:text-primary transition-colors">
            <Twitter size={24} />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {currentYear} FingerLicking Digital. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Made with love in Manchester.
        </p>
      </div>
    </footer>
  );
}
