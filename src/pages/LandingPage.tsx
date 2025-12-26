import React from 'react';
import { Container, Title, Text, Button, Group, Image, Grid, Card, Badge, Paper, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <Paper shadow="none" p="xl" withBorder={false}>
      <Container size="xl">
        {/* Hero Section */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" my="xl">
          <div>
            <Title order={1} size="4rem" mb="md">
              Welcome to Skinny Genes
            </Title>
            <Text size="xl" mb="xl" color="dimmed">
              Discover premium cannabis strains and products for your wellness journey.
              Quality, purity, and innovation in every seed and product.
            </Text>
            <Group>
              <Button size="lg" component={Link} to="/products" variant="light">
                Shop Products
              </Button>
              <Button size="lg" variant="outline" component={Link} to="/strains">
                Explore Strains
              </Button>
            </Group>
          </div>
          <Image
            src="/skinnygenes.shop/rt_image.png"
            alt="Premium Cannabis Products"
            radius="md"
          />
        </SimpleGrid>

        {/* Features Section */}
        <Grid mt="xl" gutter="lg">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src="/skinnygenes.shop/sq_image.png" height={180} alt="Cannabis Seeds" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Premium Seeds</Text>
                <Badge color="green" variant="light">
                  New
                </Badge>
              </Group>
              <Text size="sm" color="dimmed">
                High-quality, genetically superior cannabis seeds for growers and enthusiasts.
              </Text>
              <Button variant="light" color="green" fullWidth mt="md" component={Link} to="/strains" style={{ marginTop: 'auto' }}>
                View Strains
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src="/skinnygenes.shop/rt_image.png" height={180} alt="Cannabis Products" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Wellness Products</Text>
                <Badge color="blue" variant="light">
                  Popular
                </Badge>
              </Group>
              <Text size="sm" color="dimmed">
                Curated selection of CBD oils, edibles, and wellness products for daily use.
              </Text>
              <Button variant="light" color="blue" fullWidth mt="md" component={Link} to="/products" style={{ marginTop: 'auto' }}>
                Shop Now
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src="/skinnygenes.shop/sq_image.png" height={180} alt="Interactive Explorer" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Strain Explorer</Text>
                <Badge color="orange" variant="light">
                  Interactive
                </Badge>
              </Group>
              <Text size="sm" color="dimmed">
                Explore strains interactively with our 3D visualization and detailed information.
              </Text>
              <Button variant="light" color="orange" fullWidth mt="md" component={Link} to="/interactive-strain-explorer" style={{ marginTop: 'auto' }}>
                Explore
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
};

export default LandingPage;