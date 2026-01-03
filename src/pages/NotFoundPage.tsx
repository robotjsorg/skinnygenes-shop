import React from 'react';
import { Container, Title, Text, Button, Center } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <Center style={{ minHeight: '100vh', flexDirection: 'column', textAlign: 'center' }}>
      <Container>
        <Title order={1} style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</Title>
        <Text size="xl" style={{ marginBottom: '2rem' }}>
          Oops! The page you're looking for does not exist.
        </Text>
        <Button component={Link} to="/" variant="filled" size="md">
          Go to Homepage
        </Button>
      </Container>
    </Center>
  );
};

export default NotFoundPage;
