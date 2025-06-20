
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Landmark, AlertTriangle } from 'lucide-react';
import { Separator } from './ui/separator';

const cardPaymentSchema = z.object({
  cardNumber: z.string()
    .min(13, { message: "Card number must be between 13 and 19 digits." })
    .max(19, { message: "Card number must be between 13 and 19 digits." })
    .regex(/^\d+$/, { message: "Card number must only contain digits." }),
  expiryDate: z.string()
    .min(5, { message: "Expiry date must be MM/YY." })
    .max(5, { message: "Expiry date must be MM/YY." })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry date format (MM/YY)." }),
  cvc: z.string()
    .min(3, { message: "CVC must be 3 or 4 digits." })
    .max(4, { message: "CVC must be 3 or 4 digits." })
    .regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits." }),
  cardHolderName: z.string().min(2, { message: "Cardholder name is required." }),
});

type CardPaymentFormData = z.infer<typeof cardPaymentSchema>;

export interface PaymentDetails {
  method: 'card' | 'bank';
  cardDetails?: CardPaymentFormData;
}

interface PaymentFormProps {
  onPaymentMethodChange: (method: PaymentDetails['method'] | null) => void;
  onFormValidityChange: (isValid: boolean) => void;
}

export function PaymentForm({ onPaymentMethodChange, onFormValidityChange }: PaymentFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentDetails['method'] | null>(null);

  const form = useForm<CardPaymentFormData>({
    resolver: zodResolver(cardPaymentSchema),
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      cardHolderName: '',
    },
    mode: 'onChange', // Validate on change to update parent about validity
  });

  useEffect(() => {
    onPaymentMethodChange(selectedMethod);
    if (selectedMethod === 'card') {
      onFormValidityChange(form.formState.isValid);
    } else if (selectedMethod === 'bank') {
      onFormValidityChange(true); // Bank transfer is always "valid" for this mock
    } else {
      onFormValidityChange(false);
    }
  }, [selectedMethod, form.formState.isValid, onPaymentMethodChange, onFormValidityChange, form]);
  
  // Watch for form state changes specifically for card validity
  useEffect(() => {
    const subscription = form.watch(() => {
      if (selectedMethod === 'card') {
        onFormValidityChange(form.formState.isValid);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, selectedMethod, onFormValidityChange]);


  const handleMethodChange = (value: string) => {
    const method = value as PaymentDetails['method'];
    setSelectedMethod(method);
  };

  // This onSubmit is a placeholder if we wanted to submit the card form independently
  // For now, validity is passed up, and parent handles "Place Order"
  const onSubmitCardDetails = (data: CardPaymentFormData) => {
    console.log('Card details submitted (mock):', data);
    // In a real scenario, this might tokenize the card, etc.
    // For this prototype, we mainly rely on onFormValidityChange
  };

  return (
    <div className="space-y-6">
      <RadioGroup
        onValueChange={handleMethodChange}
        value={selectedMethod || ''}
        className="grid grid-cols-1 gap-4"
      >
        <Label
          htmlFor="card"
          className={`flex flex-col items-start p-4 border rounded-lg cursor-pointer transition-all
            ${selectedMethod === 'card' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}
        >
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <RadioGroupItem value="card" id="card" className="mr-3 peer" />
              <CreditCard className={`w-6 h-6 mr-2 ${selectedMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`font-medium ${selectedMethod === 'card' ? 'text-primary' : 'text-foreground'}`}>Credit/Debit Card</span>
            </div>
             {selectedMethod === 'card' && form.formState.isDirty && !form.formState.isValid && (
              <AlertTriangle className="w-5 h-5 text-destructive ml-auto" />
            )}
          </div>
          {selectedMethod === 'card' && (
            <div className="mt-4 w-full pl-8 space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitCardDetails)} className="space-y-3">
                  <FormField
                    control={form.control}
                    name="cardHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Cardholder Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John M. Doe" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs">Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0000 0000 0000 0000" {...field} />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">Expiry (MM/YY)</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs">CVC</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
          )}
        </Label>

        <Label
          htmlFor="bank"
          className={`flex flex-col items-start p-4 border rounded-lg cursor-pointer transition-all
            ${selectedMethod === 'bank' ? 'border-primary ring-2 ring-primary bg-primary/5' : 'border-border hover:bg-muted/50'}`}
        >
          <div className="flex items-center">
            <RadioGroupItem value="bank" id="bank" className="mr-3 peer" />
            <Landmark className={`w-6 h-6 mr-2 ${selectedMethod === 'bank' ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className={`font-medium ${selectedMethod === 'bank' ? 'text-primary' : 'text-foreground'}`}>Bank Transfer</span>
          </div>
          {selectedMethod === 'bank' && (
            <div className="mt-4 w-full pl-9 text-sm text-muted-foreground space-y-2">
              <p>Instructions for bank transfer will be provided after you place the order.</p>
            </div>
          )}
        </Label>
      </RadioGroup>
    </div>
  );
}
