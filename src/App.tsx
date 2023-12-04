import { CartProvider } from './context/CartContext';
import ProductList from './components/ProductList';
import Cart from './pages/Cart';
import './index.css'

const App: React.FC = () => {
  return (
    <CartProvider>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App
