import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AppShell, Text, Burger, useMantineTheme, useMantineColorScheme, Stack } from '@mantine/core';
import { useState } from 'react';

const Layout: React.FC = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      styles={{
        main: {
          background: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbar={{
        width: { sm: 200, lg: 300 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      header={{
        height: 70,
      }}
    >
      <AppShell.Header p="md">
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
            mr="xl"
            hiddenFrom="sm"
          />
          <Text size="xl" fw={700}>Skinny Genes Shop</Text>
        </div>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Stack gap="xs">
          <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setOpened(false)}>
            <Text>Home</Text>
          </NavLink>
          <NavLink to="/contact" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setOpened(false)}>
            <Text>Contact</Text>
          </NavLink>
          <NavLink to="/products" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setOpened(false)}>
            <Text>Products</Text>
          </NavLink>
          <NavLink to="/strains" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setOpened(false)}>
            <Text>Strains</Text>
          </NavLink>
          <NavLink to="/interactive-strain-explorer" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setOpened(false)}>
            <Text>Interactive Strain Explorer</Text>
          </NavLink>
        </Stack>
      </AppShell.Navbar>
      <Outlet />
    </AppShell>
  );
};

export default Layout;