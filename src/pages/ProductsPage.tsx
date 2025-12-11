import React from 'react';
import { Grid, Card, Text, Button } from '@mantine/core';

const products = [
  { id: 1, name: 'Chem 91 x Problem Child', description: 'x Chem 91 x Problem Child seeds. This strain is Chem 91 S1 crossed into Problem Child F2', prices: [3, 6, 12, 24] },
];

const ProductsPage: React.FC = () => {
  return (
    <div>
      <h1>Products</h1>
      <Grid>
        {products.map(product => (
          <Grid.Col span={4} key={product.id}>
            <Card>
              <Text weight={500}>{product.name}</Text>
              {product.prices.map(quantity => (
                <Text key={quantity}>
                  {quantity} seeds: {product.description.replace('x', quantity)}
                </Text>
              ))}
              <Button component="a" href={`/products/${product.id}`}>View Details</Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsPage;