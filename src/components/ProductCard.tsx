import React from 'react';
import { Button, Card, Text, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import './ProductCard.css';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, imageUrl }) => {
  return (
    <Card className="product-card" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <img src={imageUrl} alt={name} className="product-card-image" />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500} size="lg">{name}</Text>
      </Group>
      <Text size="sm" color="dimmed" truncate>
        {description}
      </Text>
      <Text fw={700} size="lg" mt="md">${price.toFixed(2)}</Text>
      <Button component={Link} to={`/products/${id}`} variant="light" fullWidth mt="md" className="product-card-button">
        View Details
      </Button>
    </Card>
  );
};

export default ProductCard;