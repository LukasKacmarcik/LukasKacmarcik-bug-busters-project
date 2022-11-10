import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Button, Navbar as NavbarReactstrap, NavbarBrand } from 'reactstrap';
import LoginForm from '../login/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Redux/slices/session';
import { clearCart } from '../../Redux/slices/cart';
import { toast } from 'react-toastify';
import logo from '../../img/logo.png';
import styles from './navbar.module.scss';

function Navbar() {
  const userRole = useSelector((state) => state.session.role);
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogOut() {
    dispatch(logOut());
    dispatch(clearCart());
    toast.success(`You have successfully logged out`, {
      position: 'bottom-left',
    });
    navigate('/');
  }

  const handleNavigateToCart = () => {
    navigate('./cart');
  };

  return userRole === 'Owner' ? (
    <NavbarReactstrap className={styles.nav}>
      <NavbarBrand to="/" tag={Link}>
        <img src={logo} alt="food-bug-logo" />
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        {/* <NavItem>add links here</NavItem> */}
      </Nav>
      <Button
        color="success"
        outline
        size="md"
        onClick={() => {
          handleLogOut();
        }}
      >
        <i className="fas fa-door-open" />
        {` Log Out`}
      </Button>
      &nbsp;
      <LoginForm />
    </NavbarReactstrap>
  ) : (
    <NavbarReactstrap className={styles.nav}>
      <NavbarBrand to="/" tag={Link}>
        <img src={logo} alt="food-bug-logo" />
      </NavbarBrand>
      <Nav className="me-auto" navbar>
        {/* <NavItem>add links here</NavItem> */}
      </Nav>
      {userRole !== 'notLoggedIn' && (
        <Button
          color="success"
          outline
          size="md"
          onClick={() => {
            handleLogOut();
          }}
        >
          <i className="fas fa-door-open" />
          {` Log Out`}
        </Button>
      )}
      <LoginForm />
      <Button color="success" onClick={handleNavigateToCart} outline size="md">
        <i className="fa fa-shopping-cart" />
        <span>{cartTotalQuantity}</span>
      </Button>
    </NavbarReactstrap>
  );
}

export default Navbar;
