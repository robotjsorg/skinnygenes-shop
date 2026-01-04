import React, { useState } from 'react';
import { Title } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'; // Import icons
import './Header.css';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

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
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink>
                <NavLink to="/strains" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Strains</NavLink>
                <NavLink to="/strain-explorer" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Strain Explorer</NavLink>
                <NavLink to="/ai-feedback" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>AI Feedback</NavLink>
                <NavLink to="/cannabis-anthology" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Cannabis Anthology</NavLink>
            </nav>
            {isOpen && (
                <nav className="mobile-nav">
                    <NavLink to="/" className="mobile-nav-link" onClick={toggleMenu}>Home</NavLink>
                    <NavLink to="/products" className="mobile-nav-link" onClick={toggleMenu}>Products</NavLink>
                    <NavLink to="/strains" className="mobile-nav-link" onClick={toggleMenu}>Strains</NavLink>
                    <NavLink to="/strain-explorer" className="mobile-nav-link" onClick={toggleMenu}>Strain Explorer</NavLink>
                    <NavLink to="/ai-feedback" className="mobile-nav-link" onClick={toggleMenu}>AI Feedback</NavLink>
                    <NavLink to="/cannabis-anthology" className="mobile-nav-link" onClick={toggleMenu}>Cannabis Anthology</NavLink>
                </nav>
            )}
        </header>
    );
};

export default Header;