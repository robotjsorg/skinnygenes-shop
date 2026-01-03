import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Image, Title, Text, Badge, Button, Group, NumberInput, Paper } from '@mantine/core';

const products = [
  {
    id: '1',
    name: 'Chem 91 x Problem Child',
    description: 'Chem 91 S1 crossed into Problem Child F2. A potent hybrid with exceptional genetics, this strain is known for its strong diesel and earthy aroma. It offers a powerful, uplifting high that stimulates creativity and focus, making it a favorite among artists and musicians. The dense, frosty buds are a testament to its premium quality.',
    price: 45,
    image: '/chem91problemchild.png',
    type: 'Hybrid'
  },
  {
    id: '2',
    name: 'Blue Dream CBD',
    description: 'High-CBD strain perfect for wellness and relaxation. Balanced effects with minimal THC, providing a gentle sense of calm without the psychoactive high. Its sweet berry aroma and smooth flavor make it a delightful choice for daytime use. Ideal for managing stress, anxiety, and pain while maintaining mental clarity.',
    price: 50,
    image: '/bluedreamcbd.png',
    type: 'CBD'
  },
  {
    id: '3',
    name: 'Northern Lights Auto',
    description: 'Classic autoflowering strain with reliable yields and easy cultivation. This indica-dominant variety is cherished for its resinous buds, fast flowering time, and resilience. It produces a sweet, spicy aroma and a deeply relaxing body high, perfect for unwinding at the end of the day. A great choice for both novice and experienced growers.',
    price: 40,
    image: '/northernlightsauto.png',
    type: 'Indica'
  }
];

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = products.find(p => p.id === id);
    const [quantity, setQuantity] = React.useState(1);
    const type = product ? product.type : '';
    const badgeColor = type === 'Indica' ? 'purple' : type === 'Sativa' ? 'orange' : 'green';

    if (!product) {
        return (
            <Container py="xl">
                <Title order={1} ta="center">Product not found</Title>
                <Text ta="center" mt="md">The product you are looking for does not exist.</Text>
                <Group justify="center" mt="xl">
                    <Button onClick={() => navigate('/products')} variant="light">Go back to Products</Button>
                </Group>
            </Container>
        );
    }

    return (
        <Container size="lg" py="xl">
            <Paper shadow="sm" p="xl" withBorder>
                <Grid gutter={{ base: 'xl', md: 50 }}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Image src={product.image} alt={product.name} radius="md" />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group justify="space-between" align="flex-start">
                            <Title order={1}>{product.name}</Title>
                            <Badge color={badgeColor} size="lg" variant="filled">{product.type}</Badge>
                        </Group>
                        <Text mt="md" color="dimmed">{product.description}</Text>
                        <Text size="2rem" fw={700} mt="xl" color="teal">${(product.price * quantity).toFixed(2)}</Text>
                        
                        <Group mt="xl">
                            <NumberInput
                                value={quantity}
                                onChange={(value) => setQuantity(Number(value))}
                                min={1}
                                max={99}
                                step={1}
                                label="Quantity"
                                style={{ width: 100 }}
                            />
                            <Button size="lg" color="teal" style={{ flex: 1 }}>Add to Cart</Button>
                        </Group>

                        <Button onClick={() => navigate('/products')} variant="outline" mt="xl">
                            &larr; Back to Products
                        </Button>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProductDetailPage;