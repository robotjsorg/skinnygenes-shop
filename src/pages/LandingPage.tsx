import React from 'react';
import { Container, Title, Image } from '@mantine/core';

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Title order={1}>Welcome to Skinny Genes</Title>
      <Image src="/public/rt_image.png" alt="Cannabis" />
      <Image src="/public/sq_image.png" alt="Cannabis Seeds" />
    </Container>
  );
};

export default LandingPage;