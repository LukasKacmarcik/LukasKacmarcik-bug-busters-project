import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart, sendOrder } from '@redux/slices/cart';
import './cart.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Cart = () => {
  const role = useSelector((state) => state.session.role);
  const cart = useSelector((state) => state.cart);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (meal) => {
    dispatch(addToCart(meal));
  };
  const handleDecreaseCart = (meal) => {
    dispatch(decreaseCart(meal));
  };
  const handleRemoveFromCart = (meal) => {
    dispatch(removeFromCart(meal));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleSendOrder = () => {
    if (role === 'Customer') {
      dispatch(sendOrder(cartItems));
    } else {
      toast.error(`Sorry u have to be logged in to make an order`, {
        position: 'bottom-left',
      });
    }
  };
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d={`M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0
                   .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z`}
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.meal_id}>
                  <div className="cart-product">
                    <img src={`http://localhost:3001/meals/${cartItem.img_url}`} alt={cartItem.meal_name} />
                    <div>
                      <h3>{cartItem.meal_name}</h3>
                      <p>{cartItem.desc}Should be description</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>Remove</button>
                    </div>
                  </div>
                  <div className="cart-product-price">€{cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>-</button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">€{cartItem.price * cartItem.cartQuantity}</div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">€{cart.cartTotalAmount}</span>
              </div>
              <button onClick={() => handleSendOrder()}>Send order</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d={`M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4
                       4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z`}
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
