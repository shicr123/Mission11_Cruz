// import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const CartSummary = () => {
  // const navigate = useNavigate();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // const toggleDropdown = (e: React.MouseEvent) => {
  //   e.stopPropagation(); // prevent navigate on toggle
  //   setIsOpen(!isOpen);
  // };

  // Assuming max items allowed in the cart is 10
  const maxCapacity = 10;
  const progressBarWidth = (totalItems / maxCapacity) * 100;

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '30px',
        right: '20px',
        background: '#f8f9fa',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        fontSize: '16px',
        zIndex: 1000,
        width: '200px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onClick={toggleDropdown}
      >
        <span>🛒 Cart</span>
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          style={{ fontSize: '0.7rem', marginLeft: '-5px', marginTop: '-10px' }}
        >
          {totalItems}
          <span className="visually-hidden">items in cart</span>
        </span>
        <strong>${totalAmount.toFixed(2)}</strong>
        <span
          style={{
            marginLeft: '8px',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '0.3s',
          }}
        >
          ▼
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-2">
        <small>Cart Capacity</small>
        <div className="progress" style={{ height: '10px' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{
              width: `${Math.min(100, Math.max(0, progressBarWidth))}%`,
            }}
            aria-valuenow={totalItems}
            aria-valuemin={0}
            aria-valuemax={maxCapacity}
          ></div>
        </div>
      </div>

      {isOpen && (
        <div className="card card-body mt-2 p-2">
          {cart.length === 0 ? (
            <div className="text-muted">Cart is empty</div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.bookId} className="mb-1 small">
                  {item.title} x {item.quantity}: ${item.price.toFixed(2)}
                </div>
              ))}
              {/* <button
                className="btn btn-sm btn-primary w-100 mt-2"
                onClick={() => navigate('/cart')}
              >
                Go to Cart
              </button> */}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CartSummary;