import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map(item => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) - 1;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean);
    updateCart(updated);
  };

  const removeFromCart = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    updateCart(updated);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <section className='cart-page'>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className='row '>
            <div className='col-lg-8 col-md-8 col-12'>
              {cartItems.map(item => (
                <div key={item.id}>
                  <hr />
                  <div className=''>
                    <h3>{item.title}</h3>
                    <div className='d-flex justify-content-sm-between'>
                      <p>Price: {item.price}$</p>
                      <p>Total Price: {item.price * item.quantity}$ </p>
                    </div>
                    <div className='d-flex gap-5'>
                      <div className='d-flex gap-2 align-items-center'>
                        <button onClick={() => decreaseQty(item.id)} >−</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => increaseQty(item.id)} >+</button>
                      </div>
                      <div>
                        <button onClick={() => removeFromCart(item.id)} > Remove Item</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='col-lg-4 col-md-4 col-12'>
              <p><strong>Total Items:</strong> {getTotalItems()}</p>
              <hr />
              <p><strong>Total Price:</strong> ${getTotalPrice()}</p>
              <hr />
              <button onClick={goToCheckout} className="dark-clr"> Proceed to Checkout </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
