import React from 'react';
import { Container, Title, Text, Button, Group, Image, Grid, Card, Paper, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <Paper shadow="none" withBorder={false}>
      <SimpleGrid
        cols={1}
        spacing="xl"
        mb="xl"
        style={{
          backgroundImage: `url(${(import.meta as any).env.BASE_URL + "chem91problemchild.png"})`,
          backgroundSize: '150%',
          backgroundPosition: 'center',
          animation: 'slow-pan 40s ease-in-out infinite',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="text-container" style={{ maxWidth: 800 }}>
          <Title order={1} size="4rem" mb="md" className="text-container-text">
            Welcome to Skinny Genes
          </Title>
          <Text size="xl" mb="xl" className="text-container-text">
            Discover premium cannabis strains and products for your wellness journey.
            Quality, purity, and innovation in every seed and product.
          </Text>
          <Group justify="center">
            <Button size="lg" component={Link} to="/products" className="button">
              Shop Products
            </Button>
          </Group>
        </div>
      </SimpleGrid>
      <Container size="xl" mt="xl">
        <Grid mt="xl" gutter="lg">
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
                <Text fw={500}>Cann-Thology</Text>
              </Group>
              <Text size="sm">
                Explore the historical evolution of genetic strains with the 3D phylogenetic tree.
              </Text>
              <Button fullWidth mt="md" component={Link} to="/cann-thology" style={{ marginTop: 'auto' }} className="button">
                Visualize Genetics
              </Button>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={(import.meta as any).env.BASE_URL + "homepage.png"} height={180} alt="Interactive Explorer" />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>AI Chatbot</Text>
              </Group>
              <Text size="sm">
                Use an AI prompt to give valuable feedback on strains and products, get recommendation on seeds and products, and instructions and tips on growing your own cannabis.
              </Text>
              <Button fullWidth mt="md" component={Link} to="/ai-chatbot" style={{ marginTop: 'auto' }} className="button">
                Chat with AI
              </Button>
            </Card>
          </Grid.Col>

        </Grid>
      </Container>
    </Paper>
  );
};

export default LandingPage;