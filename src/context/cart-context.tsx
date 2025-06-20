
"use client";

import type { MenuItem } from '@/lib/types';
import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useReducer, useCallback } from 'react';

export interface CartItem extends MenuItem {
  quantityInCart: number;
}

interface CartState {
  items: CartItem[];
}

interface CartContextType extends CartState {
  addItem: (item: MenuItem, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotalItems: () => number;
  getCartSubtotal: () => number;
  getItemSubtotal: (item: CartItem) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: MenuItem; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_ITEM_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[] } };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (i) => i.id === action.payload.item.id
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantityInCart += action.payload.quantity;
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload.item, quantityInCart: action.payload.quantity }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.itemId),
      };
    case 'UPDATE_ITEM_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.itemId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantityInCart: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'LOAD_CART':
      return { ...state, items: action.payload.items };
    default:
      return state;
  }
};

const LOCAL_STORAGE_CART_KEY = 'fingerlicking_cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (storedCart) {
        try {
          const parsedCart: CartItem[] = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) { // Basic validation
            dispatch({ type: 'LOAD_CART', payload: { items: parsedCart } });
          }
        } catch (error) {
          console.error("Error parsing cart from localStorage", error);
          localStorage.removeItem(LOCAL_STORAGE_CART_KEY); // Clear corrupted data
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(state.items));
    }
  }, [state.items]);

  const addItem = useCallback((item: MenuItem, quantity: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  }, []);

  const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { itemId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const getCartTotalItems = useCallback(() => {
    return state.items.reduce((total, item) => total + item.quantityInCart, 0);
  }, [state.items]);

  const getCartSubtotal = useCallback(() => {
    return state.items.reduce(
      (total, item) => total + item.price * item.quantityInCart,
      0
    );
  }, [state.items]);

  const getItemSubtotal = useCallback((item: CartItem) => {
    return item.price * item.quantityInCart;
  }, []);


  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateItemQuantity,
        clearCart,
        getCartTotalItems,
        getCartSubtotal,
        getItemSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
