import { useNavigate, useParams } from 'react-router-dom';
import Welcome from '../components/Welcome';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookId, price: priceParam } = useParams();
  const { addToCart } = useCart();
  const parsedBookId = Number(bookId);
  const parsedPrice = Number(priceParam);

  // console.log('bookId:', bookId, 'Parsed bookId:', parsedBookId);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: parsedBookId,
      title: title || 'No Book Found',
      price: parsedPrice,
      quantity: 1,
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <Welcome />
      <h2>Purchased: {title}</h2>
     
      <div>
        <p>Price: ${parsedPrice.toFixed(2)}</p>
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Adds the book to your cart"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default BuyPage;