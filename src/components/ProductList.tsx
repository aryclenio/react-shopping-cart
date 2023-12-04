import React from 'react';
import { useCart } from '../context/CartContext';

type ProductProps = {
  id: number;
  name: string;
  price: number;
};

const Product: React.FC<ProductProps> = ({ id, name, price }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: { id, name, price } });
  };

  return (
    <div className='border border-black p-10 m-10 rounded-sm' >
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

const ProductList: React.FC = () => {
  return (
    <div>
      <h2>Product List</h2>
      <Product id={1} name="Product 1" price={10.99} />
      <Product id={2} name="Product 2" price={19.99} />
      <Product id={3} name="Product 3" price={5.99} />
    </div>
  );
};

export default ProductList;