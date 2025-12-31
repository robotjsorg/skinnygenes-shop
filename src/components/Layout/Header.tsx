import React from 'react';
import { Title } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <Title order={1} className="header-title">
                <NavLink to="/">Skinnygenes Shop</NavLink>
            </Title>
            <nav className="header-nav">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Products</NavLink>
                <NavLink to="/strains" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Strains</NavLink>
                <NavLink to="/strain-explorer" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Strain Explorer</NavLink>
                <NavLink to="/ai-feedback" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>AI Feedback</NavLink>
                <NavLink to="/cannabis-anthology" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Cannabis Anthology</NavLink>
            </nav>
        </header>
    );
};

export default Header;