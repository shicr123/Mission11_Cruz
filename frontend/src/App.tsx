import './App.css';
import CartSummary from './components/CartSummary';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import ProjectsPage from './pages/ProjectsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <CartProvider>
      <Router>
        {/* Header with navigation and CartSummary */}
        <header>
          <CartSummary /> {/* This will appear on all pages */}
        </header>

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<ProjectsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="/buy/:title/:bookId/:price" element={<BuyPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/adminBooks" element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;