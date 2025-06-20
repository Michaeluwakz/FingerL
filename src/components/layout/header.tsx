
"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, UtensilsCrossed, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/context/cart-context";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/order", label: "Menu & Ordering" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartTotalItems } = useCart();
  const [totalItems, setTotalItems] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setTotalItems(getCartTotalItems());
    }
  }, [getCartTotalItems, isMounted, useCart().items]); // Re-check when cart items change directly


  const cartIndicator = (
    <Link href="/cart" className="relative text-neutral-700 hover:text-accent transition-colors" aria-label="View shopping cart" onClick={() => isMobileMenuOpen && setIsMobileMenuOpen(false)}>
      <ShoppingCart className="h-6 w-6" />
      {isMounted && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
          {totalItems}
        </span>
      )}
    </Link>
  );
  
  const mobileCartIndicator = (
     <Link href="/cart" className="relative text-neutral-700 hover:text-accent transition-colors py-2 flex items-center gap-2 text-lg" aria-label="View shopping cart" onClick={() => setIsMobileMenuOpen(false)}>
      <ShoppingCart className="h-5 w-5" />
      <span>Cart</span>
      {isMounted && totalItems > 0 && (
        <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
          {totalItems}
        </span>
      )}
    </Link>
  );


  return (
    <header className="bg-gradient-to-b from-white to-neutral-50 text-neutral-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline text-primary hover:text-accent transition-colors" onClick={() => setIsMobileMenuOpen(false)}>
          <Image src="https://i.ibb.co/5WSgHnWv/APARTMENT-7.png" alt="FingerLicking Logo" width={80} height={80} className="h-16 w-auto md:h-20" />
          <span>FingerLicking</span>
        </Link>

        <nav className="hidden md:flex space-x-4 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-700 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {cartIndicator}
          <ThemeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="text-primary hover:text-accent">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-gradient-to-b from-white to-neutral-50 text-neutral-800 p-6">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center gap-2 text-xl font-headline text-primary hover:text-accent" onClick={() => setIsMobileMenuOpen(false)}>
                   <Image src="https://i.ibb.co/5WSgHnWv/APARTMENT-7.png" alt="FingerLicking Logo" width={64} height={64} className="h-14 w-auto" />
                   <span>FingerLicking</span>
                </Link>
                <SheetClose asChild>
                   <Button variant="ghost" size="icon" aria-label="Close menu" className="text-primary hover:text-accent">
                    <UtensilsCrossed className="h-5 w-5 transform rotate-45" />
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg text-neutral-700 hover:text-accent transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                 {mobileCartIndicator}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
