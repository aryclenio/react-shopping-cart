import React from 'react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {state.cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {state.cart.map((item) => (
            <li key={item.product.id}>
              {item.product.name} - ${item.product.price.toFixed(2)} (Qty: {item.quantity})
              <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
