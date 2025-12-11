import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Stack, Text } from '@mantine/core';

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 250,
        padding: '20px',
        backgroundColor: '#f5f5f5',
        height: '100vh',
      }}
    >
      <Stack spacing="md">
        <Text weight={500} size="lg">Menu</Text>
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
      </Stack>
    </Box>
  );
};

export default Sidebar;