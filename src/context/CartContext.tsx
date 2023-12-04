// src/context/CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number };

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingCartItemIndex = state.cart.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (existingCartItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingCartItemIndex].quantity += 1;
        return { cart: updatedCart };
      } else {
        return { cart: [...state.cart, { product: action.payload, quantity: 1 }] };
      }

    case 'REMOVE_FROM_CART':
      const updatedCart = state.cart.filter((item) => item.product.id !== action.payload);
      return { cart: updatedCart };

    default:
      return state;
  }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
