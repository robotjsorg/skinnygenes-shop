import React from 'react';
import { Container, Title, Text, Button, Group, Image, Grid, Card, Paper, SimpleGrid } from '@mantine/core';
import { Link } from 'react-router-dom';
import './LandingPage.css';

import LandingPageCard from '../components/LandingPageCard';

const cards = [
  {
    title: 'Premium Seeds',
    description: 'High-quality, genetically superior cannabis seeds for growers and enthusiasts.',
    imageUrl: (import.meta as any).env.BASE_URL + "northernlightsauto.png",
    link: '/strains',
    buttonText: 'View Strains',
  },
  {
    title: 'Cann-Thology',
    description: 'Explore the historical evolution of genetic strains with the 3D phylogenetic tree.',
    imageUrl: (import.meta as any).env.BASE_URL + "strains.png",
    link: '/cann-thology',
    buttonText: 'Visualize Genetics',
  },
  {
    title: 'AI Chatbot',
    description: 'Use an AI prompt to give valuable feedback on strains and products, get recommendation on seeds and products, and instructions and tips on growing your own cannabis.',
    imageUrl: (import.meta as any).env.BASE_URL + "homepage.png",
    link: '/ai-chatbot',
    buttonText: 'Chat with AI',
  }
];

const LandingPage: React.FC = () => {
  return (
    <>
      <SimpleGrid
        cols={1}
        spacing="xl"
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
        <div className="text-container">
          <Title order={1} size="4rem" mb="md" className="text-container-text">
            Welcome to Skinny Genes shop
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
      <Container size="xl" py="xl">
        <Title order={2} mb="lg">
          Genetics by Skinny Genes
        </Title>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          {cards.map(card => (
            <LandingPageCard
              key={card.title}
              title={card.title}
              description={card.description}
              imageUrl={card.imageUrl}
              link={card.link}
              buttonText={card.buttonText}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default LandingPage;