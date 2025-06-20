
"use client";

import { useState } from 'react';
import { SectionWrapper } from '@/components/section-wrapper';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { CartItemRow } from '@/components/cart-item-row';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, CreditCard, Landmark } from 'lucide-react';
import { PaymentForm, type PaymentDetails } from '@/components/payment-form';
import { useToast } from '@/hooks/use-toast';


export default function CartPage() {
  const { items, getCartSubtotal, clearCart, getCartTotalItems } = useCart();
  const { toast } = useToast();
  const subtotal = getCartSubtotal();
  const totalItems = getCartTotalItems();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentDetails['method'] | null>(null);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);


  const handlePlaceOrder = () => {
    if (!selectedPaymentMethod) {
      toast({
        variant: 'destructive',
        title: 'Payment Method Required',
        description: 'Please select a payment method.',
      });
      return;
    }

    if (selectedPaymentMethod === 'card' && !isPaymentFormValid) {
      toast({
        variant: 'destructive',
        title: 'Invalid Card Details',
        description: 'Please ensure all card details are correctly filled.',
      });
      // Optionally, trigger validation in PaymentForm or rely on its own submit
      return;
    }
    
    // Simulate order placement
    console.log('Order placed with:', {
      items,
      total: subtotal.toFixed(2),
      paymentMethod: selectedPaymentMethod,
    });

    toast({
      title: 'Order Placed!',
      description: 'Thank you for your purchase. Your order is being processed.',
    });
    clearCart();
    setSelectedPaymentMethod(null); // Reset payment method
  };

  if (items.length === 0) {
    return (
      <SectionWrapper>
        <div className="text-center py-16">
           <ShoppingBag className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl md:text-4xl font-headline text-primary mb-4">Your Cart is Empty</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Looks like you haven't added any delicious items yet.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/order">Browse Our Menu</Link>
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  const canPlaceOrder = 
    items.length > 0 && 
    selectedPaymentMethod !== null &&
    (selectedPaymentMethod === 'bank' || (selectedPaymentMethod === 'card' && isPaymentFormValid));

  return (
    <SectionWrapper>
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-headline text-primary mb-2">Shopping Cart & Checkout</h1>
        <p className="text-lg text-muted-foreground">Review your order and complete your purchase.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-card p-6 sm:p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-headline text-primary mb-6">Your Order</h2>
          <div className="hidden sm:flex items-center justify-between text-sm font-medium text-muted-foreground pb-3 border-b mb-2">
              <div className="w-2/5">Product</div>
              <div className="w-1/5 text-center">Quantity</div>
              <div className="w-1/5 text-right">Subtotal</div>
              <div className="w-1/12 text-right"></div>
          </div>

          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-muted-foreground">Total Items:</span>
              <span className="font-semibold tabular-nums">{totalItems}</span>
            </div>
            <div className="flex justify-between items-center text-2xl font-headline text-primary">
              <span>Subtotal:</span>
              <span className="font-bold tabular-nums">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 text-right">
            Shipping & taxes calculated at final step (if applicable).
          </p>
        </div>

        <div className="lg:col-span-1 bg-card p-6 sm:p-8 rounded-lg shadow-xl h-fit">
           <h2 className="text-2xl font-headline text-primary mb-6">Payment Details</h2>
           <PaymentForm 
             onPaymentMethodChange={setSelectedPaymentMethod}
             onFormValidityChange={setIsPaymentFormValid}
           />
          
          <Separator className="my-6" />

          <div className="flex flex-col gap-4 mt-8">
            <Button
              size="lg" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!canPlaceOrder}
              onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
              disabled={items.length === 0}
            >
              Clear Cart
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
