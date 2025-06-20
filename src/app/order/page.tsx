
"use client";

import { useState } from 'react';
import { SectionWrapper } from '@/components/section-wrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { menuItems, menuCategories } from '@/lib/data';
import type { MenuItem } from '@/lib/types';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';

export default function OrderPage() {
  const { addItem } = useCart();
  const { toast } = useToast();

  // Inner component to manage its own quantity state
  function MenuItemCard({ item, categoryDataAiHint }: { item: MenuItem, categoryDataAiHint?: string }) {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
      setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
    };

    const handleAddToCart = () => {
      addItem(item, quantity);
      toast({
        title: `${item.name} added to cart!`,
        description: `Quantity: ${quantity}`,
      });
      setQuantity(1); // Reset quantity for this card after adding
    };
    
    const dataAiHintForImage = item.dataAiHint || categoryDataAiHint || 'food item';


    return (
      <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-56">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={dataAiHintForImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary">{item.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground h-20 overflow-y-auto">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <p className="text-lg font-semibold text-primary text-center">${item.price.toFixed(2)}</p>
          <div className="flex items-center justify-center space-x-2 pt-2">
            <Button variant="outline" size="icon" onClick={handleDecrement} aria-label="Decrease quantity" className="border-primary text-primary hover:bg-primary/10">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-medium w-10 text-center tabular-nums">{quantity}</span>
            <Button variant="outline" size="icon" onClick={handleIncrement} aria-label="Increase quantity" className="border-primary text-primary hover:bg-primary/10">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleAddToCart}
          >
            Add {quantity > 1 ? `${quantity} ` : ''}to cart
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-4">Our Menu & Online Ordering</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our delicious offerings and place your order for pickup or delivery through our trusted partners.
        </p>
      </div>

      {menuCategories.map((category) => (
        <div key={category.name} className="mb-12">
          <div className="flex items-center mb-6">
            <category.icon className="w-8 h-8 text-accent mr-3" />
            <h2 className="text-3xl font-headline text-primary">{category.name}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems
              .filter((item) => item.category === category.name)
              .map((item: MenuItem) => (
                <MenuItemCard key={item.id} item={item} categoryDataAiHint={category.dataAiHint} />
              ))}
          </div>
        </div>
      ))}
    </SectionWrapper>
  );
}
