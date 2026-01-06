import React from 'react';
import { SimpleGrid, Title, Text, Container } from '@mantine/core';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: '1',
    name: 'Chem 91 x Problem Child',
    category: 'Hybrid',
    description: 'Chem 91 S1 crossed into Problem Child F2. A potent hybrid with exceptional genetics.',
    price: 45,
    image: (import.meta as any).env.BASE_URL + 'chem91problemchild.png',
  },
  {
    id: '2',
    name: 'Blue Dream CBD',
    category: 'CBD',
    description: 'High-CBD strain perfect for wellness and relaxation. Balanced effects with minimal THC.',
    price: 50,
    image: (import.meta as any).env.BASE_URL + 'bluedreamcbd.png',
  },
  {
    id: '3',
    name: 'Northern Lights Auto',
    category: 'Indica',
    description: 'Classic autoflowering strain with reliable yields and easy cultivation.',
    price: 40,
    image: (import.meta as any).env.BASE_URL + 'northernlightsauto.png',
  }
];

const ProductsPage: React.FC = () => {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="md" ta="center">
        Skinny Genes Products
      </Title>
      <Text size="lg" mb="xl" ta="center" color="dimmed">
        High-quality cannabis seeds for growers and enthusiasts. Every strain is bred for excellence.
      </Text>
      <Title order={2} mb="lg">
        Products
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            type={product.category}
            description={product.description}
            price={product.price}
            imageUrl={product.image}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ProductsPage;