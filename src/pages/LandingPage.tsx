import React from 'react';
import { Container, Title, Text, Button, Group, Image, Grid, Card, Paper, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <Paper shadow="none" p="xl" withBorder={false}>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" my="xl">
          <div>
            <Title order={1} size="4rem" mb="md">
              Welcome to Skinny Genes
            </Title>
            <Text size="xl" mb="xl">
              Discover premium cannabis strains and products for your wellness journey.
              Quality, purity, and innovation in every seed and product.
            </Text>
            <Group>
              <Button size="lg" component={Link} to="/products" className="button">
                Shop Products
              </Button>
              <Button size="lg" component={Link} to="/strains" className="button">
                Explore Strains
              </Button>
            </Group>
          </div>
          <Image
            src={(import.meta as any).env.BASE_URL + "homepage.png"}
            alt="Premium Cannabis Products"
            radius="md"
            height={400}
          />
        </SimpleGrid>

        <Grid mt="xl" gutter="lg">
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={(import.meta as any).env.BASE_URL + "bluedreamcbd.png"} height={180} alt="Cannabis Products" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Wellness Products</Text>
              </Group>
              <Text size="sm">
                Homemade selection of cannabis seeds, flower, CBD oils, edibles, and wellness products for daily use. Grinders and T-shirts available.
              </Text>
              <Button fullWidth mt="md" component={Link} to="/products" style={{ marginTop: 'auto' }} className="button">
                Shop Now
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={(import.meta as any).env.BASE_URL + "northernlightsauto.png"} height={180} alt="Cannabis Seeds" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Premium Seeds</Text>
              </Group>
              <Text size="sm">
                High-quality, genetically superior cannabis seeds for growers and enthusiasts.
              </Text>
              <Button fullWidth mt="md" component={Link} to="/strains" style={{ marginTop: 'auto' }} className="button">
                View Strains
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={(import.meta as any).env.BASE_URL + "strains.png"} height={180} alt="Interactive Explorer" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Strain Explorer</Text>
              </Group>
              <Text size="sm">
                Explore the historical evolution of genetic strains with the 3D phylogenetic tree.
              </Text>
              <Button fullWidth mt="md" component={Link} to="/strain-explorer" style={{ marginTop: 'auto' }} className="button">
                Visualize
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={(import.meta as any).env.BASE_URL + "strains.png"} height={180} alt="Interactive Explorer" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>AI Feedback</Text>
              </Group>
              <Text size="sm">
                Use an AI prompt to give valuable feedback on strains and products.
              </Text>
              <Button fullWidth mt="md" component={Link} to="/ai-feedback" style={{ marginTop: 'auto' }} className="button">
                Submit Feedback
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={(import.meta as any).env.BASE_URL + "strains.png"} height={180} alt="Interactive Explorer" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>Cann-thology</Text>
              </Group>
              <Text size="sm">
                Read about the anthology of cannabis strains and their unique characteristics and the players behind the genetics and industry.
              </Text>
              <Button fullWidth mt="md" component={Link} to="/cannabis-anthology" style={{ marginTop: 'auto' }} className="button">
                Learn More
              </Button>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Paper>
  );
};

export default LandingPage;