import React from 'react';
import { Button, Card, Text } from '@mantine/core';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  onViewDetails: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, onViewDetails }) => {
  return (
    <Card shadow="sm" padding="lg" style={{ margin: '1rem' }}>
      <Text fw={500} size="lg">{name}</Text>
      <Text size="sm" color="dimmed">{description}</Text>
      <Text fw={700} size="lg">${price.toFixed(2)}</Text>
      <Button onClick={() => onViewDetails(id)} variant="outline" style={{ marginTop: '1rem' }}>
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard;