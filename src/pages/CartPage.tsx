import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title, Text, Button, Group, Grid, Paper, Image, NumberInput } from '@mantine/core';
import { useCart } from '../contexts/CartContext';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeFromCart(productId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <Container size="lg" py="xl" className="cart-page">
      <Title order={1} ta="center" mb="xl">Your Shopping Cart</Title>

      {cart.length === 0 ? (
        <Paper shadow="sm" p="xl" withBorder>
          <Text ta="center" size="lg">Your cart is currently empty.</Text>
          <Group justify="center" mt="md">
            <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
          </Group>
        </Paper>
      ) : (
        <>
          <Grid gutter="md">
            {cart.map((item) => (
              <Paper key={item.product.id} shadow="sm" p="md" withBorder style={{ width: '100%', marginBottom: '10px' }}>
                <Group align="center" justify="space-between">
                  <Group>
                    <Image src={item.product.image} alt={item.product.name} width={60} height={60} fit="cover" radius="sm" />
                    <div>
                      <Text size="lg" fw={500}>{item.product.name}</Text>
                      <Text size="sm" color="dimmed">${item.product.price.toFixed(2)} each</Text>
                    </div>
                  </Group>
                  <Group>
                    <NumberInput
                      value={item.quantity}
                      onChange={(value) => handleUpdateQuantity(item.product.id, Number(value))}
                      min={1}
                      max={99}
                      step={1}
                      style={{ width: 80 }}
                    />
                    <Text size="lg" fw={500}>${(item.product.price * item.quantity).toFixed(2)}</Text>
                    <Button variant="outline" color="red" size="sm" onClick={() => handleRemoveFromCart(item.product.id)}>
                      Remove
                    </Button>
                  </Group>
                </Group>
              </Paper>
            ))}
          </Grid>

          <Paper shadow="sm" p="xl" withBorder mt="xl">
            <Group justify="space-between">
              <Text size="xl" fw={700}>Total:</Text>
              <Text size="xl" fw={700}>${calculateTotal().toFixed(2)}</Text>
            </Group>
            <Group grow mt="xl">
              <Button size="lg" onClick={() => navigate('/products')} variant="default">Continue Shopping</Button>
              <Button size="lg" onClick={() => navigate('/checkout')}>Proceed to Checkout</Button>
            </Group>
            <Group justify="center" mt="md">
              <Button variant="subtle" color="red" onClick={clearCart}>Clear Cart</Button>
            </Group>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default CartPage;
