import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@mantine/core';

const Sidebar: React.FC = () => {
  return (
    <Box
      style={{
        width: 250,
        padding: '20px',
        backgroundColor: '#f5f5f5',
        height: '100vh',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Text>Home</Text>
        </NavLink>
        <NavLink to="/contact" style={{ textDecoration: 'none' }}>
          <Text>Contact</Text>
        </NavLink>
        <NavLink to="/products" style={{ textDecoration: 'none' }}>
          <Text>Products</Text>
        </NavLink>
        <NavLink to="/strains" style={{ textDecoration: 'none' }}>
          <Text>Strains</Text>
        </NavLink>
        <NavLink to="/interactive-strain-explorer" style={{ textDecoration: 'none' }}>
          <Text>Interactive Strain Explorer</Text>
        </NavLink>
      </Box>
    </Box>
  );
};

export default Sidebar;