import React from 'react';
import { SimpleGrid, Title, Container } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: '1',
    name: 'Chem 91 x Problem Child',
    description: 'Chem 91 S1 crossed into Problem Child F2. A potent hybrid with exceptional genetics.',
    price: 45,
    image: '/skinnygenes.shop/sq_image.png',
    category: 'Hybrid'
  },
  {
    id: '2',
    name: 'Blue Dream CBD',
    description: 'High-CBD strain perfect for wellness and relaxation. Balanced effects with minimal THC.',
    price: 50,
    image: '/skinnygenes.shop/rt_image.png',
    category: 'CBD'
  },
  {
    id: '3',
    name: 'Northern Lights Auto',
    description: 'Classic autoflowering strain with reliable yields and easy cultivation.',
    price: 40,
    image: '/skinnygenes.shop/sq_image.png',
    category: 'Autoflower'
  }
];

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleViewDetails = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" ta="center">
        Our Products
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            onViewDetails={handleViewDetails}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ProductsPage;