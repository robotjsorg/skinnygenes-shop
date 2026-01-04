import React, { useState } from 'react';
import { Title } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX, HiOutlineShoppingCart } from 'react-icons/hi';
import './Header.css';
import { useCart } from '../../contexts/CartContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();

  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <Title order={1} className="header-title">
        <NavLink to="/">Skinnygenes Shop</NavLink>
      </Title>
      <button className="hamburger-menu" onClick={toggleMenu} aria-label="Toggle navigation">
        {isOpen ? <HiX size={28} color="white" /> : <HiOutlineMenuAlt3 size={28} color="white" />}
      </button>
      <nav className="header-nav">
        <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink>
        <NavLink to="/strains" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Strains</NavLink>
        <NavLink to="/cann-thology" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Cann-Thology</NavLink>
        <NavLink to="/ai-feedback" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>AI Chatbot</NavLink>
        <NavLink to="/account" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Account</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Cart <span className="cart-icon-wrapper"><HiOutlineShoppingCart size={20} />
            {totalItemsInCart > 0 && <span className="cart-item-count">{totalItemsInCart}</span>}</span>
        </NavLink>
      </nav>
      {isOpen && (
        <nav className="mobile-nav">
          <NavLink to="/products" className="mobile-nav-link" onClick={toggleMenu}>Products</NavLink>
          <NavLink to="/strains" className="mobile-nav-link" onClick={toggleMenu}>Strains</NavLink>
          <NavLink to="/cann-thology" className="mobile-nav-link" onClick={toggleMenu}>Cann-Thology</NavLink>
          <NavLink to="/ai-feedback" className="mobile-nav-link" onClick={toggleMenu}>AI Chatbot</NavLink>
          <NavLink to="/account" className="mobile-nav-link" onClick={toggleMenu}>Account</NavLink>
          <NavLink to="/cart" className="mobile-nav-link" onClick={toggleMenu}>
            Cart <span className="cart-icon-wrapper"><HiOutlineShoppingCart size={20} />
              {totalItemsInCart > 0 && <span className="cart-item-count">{totalItemsInCart}</span>}</span>
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Header;