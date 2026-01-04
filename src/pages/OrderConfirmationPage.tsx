import React from 'react';
import { Container, Title, Text, Button, Group } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const OrderConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container size="sm" py="xl" style={{ textAlign: 'center' }}>
      <Title order={1} mb="md">Order Confirmed!</Title>
      <Text size="lg" mb="xl">Thank you for your purchase. Your order has been placed successfully.</Text>
      <Group justify="center">
        <Button size="lg" onClick={() => navigate('/')}>Back to Home</Button>
      </Group>
    </Container>
  );
};

export default OrderConfirmationPage;
