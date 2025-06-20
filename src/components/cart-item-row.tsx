
"use client";

import Image from 'next/image';
import type { CartItem } from '@/context/cart-context';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateItemQuantity, removeItem, getItemSubtotal } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateItemQuantity(item.id, newQuantity);
    } else if (newQuantity === 0) {
      removeItem(item.id); // Or updateItemQuantity will handle removal if quantity <= 0
    }
  };

  const subtotal = getItemSubtotal(item);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-b last:border-b-0">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-md overflow-hidden shrink-0">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            data-ai-hint={item.dataAiHint || "food item"}
            sizes="(max-width: 640px) 20vw, 100px"
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-primary text-lg">{item.name}</h3>
          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 border-primary text-primary hover:bg-primary/10"
            onClick={() => handleQuantityChange(item.quantityInCart - 1)}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={item.quantityInCart}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
            className="h-8 w-12 sm:h-9 sm:w-14 text-center px-1 tabular-nums"
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 border-primary text-primary hover:bg-primary/10"
            onClick={() => handleQuantityChange(item.quantityInCart + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <p className="font-semibold text-lg w-20 text-right tabular-nums">${subtotal.toFixed(2)}</p>

        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:bg-destructive/10 h-8 w-8 sm:h-9 sm:w-9"
          onClick={() => removeItem(item.id)}
          aria-label="Remove item"
        >
          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
}
