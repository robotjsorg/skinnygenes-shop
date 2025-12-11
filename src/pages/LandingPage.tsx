import React from 'react';
import { Container, Title, Image } from '@mantine/core';

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Title order={1}>Welcome to Skinny Genes</Title>
      <Image src="/images/cannabis.jpg" alt="Cannabis" />
      <Image src="/images/cannabis-seeds.jpg" alt="Cannabis Seeds" />
    </Container>
  );
};

export default LandingPage;