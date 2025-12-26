import React from 'react';
import { Grid, Card, Text, Button, Title, Container, Group, Badge, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Chem 91 x Problem Child',
    description: 'Chem 91 S1 crossed into Problem Child F2. A potent hybrid with exceptional genetics.',
    prices: [
      { quantity: 3, price: 45 },
      { quantity: 6, price: 85 },
      { quantity: 12, price: 160 },
      { quantity: 24, price: 300 }
    ],
    image: '/skinnygenes.shop/sq_image.png',
    category: 'Hybrid'
  },
  {
    id: 2,
    name: 'Blue Dream CBD',
    description: 'High-CBD strain perfect for wellness and relaxation. Balanced effects with minimal THC.',
    prices: [
      { quantity: 3, price: 50 },
      { quantity: 6, price: 95 },
      { quantity: 12, price: 180 }
    ],
    image: '/skinnygenes.shop/rt_image.png',
    category: 'CBD'
  },
  {
    id: 3,
    name: 'Northern Lights Auto',
    description: 'Classic autoflowering strain with reliable yields and easy cultivation.',
    prices: [
      { quantity: 3, price: 40 },
      { quantity: 6, price: 75 },
      { quantity: 12, price: 140 }
    ],
    image: '/skinnygenes.shop/sq_image.png',
    category: 'Autoflower'
  }
];

const ProductsPage: React.FC = () => {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" ta="center">
        Our Products
      </Title>
      <Grid gutter="lg">
        {products.map(product => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={product.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={product.image} height={200} alt={product.name} />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} size="lg">{product.name}</Text>
                <Badge color="green" variant="light">
                  {product.category}
                </Badge>
              </Group>
              <Text size="sm" color="dimmed" mb="md">
                {product.description}
              </Text>
              <Text fw={500} mb="sm">Available Packs:</Text>
              {product.prices.map((pack, index) => (
                <Group key={index} justify="space-between" mb="xs">
                  <Text size="sm">{pack.quantity} seeds</Text>
                  <Text fw={500} color="green">${pack.price}</Text>
                </Group>
              ))}
              <Button variant="light" color="green" fullWidth mt="md" component={Link} to={`/products/${product.id}`}>
                View Details
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsPage;