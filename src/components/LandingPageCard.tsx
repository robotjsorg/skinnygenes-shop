import React from 'react';
import { Card, Text, Group, Button, Image } from '@mantine/core';
import { Link } from 'react-router-dom';
import './LandingPageCard.css';

interface LandingPageCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  buttonText: string;
}

const LandingPageCard: React.FC<LandingPageCardProps> = ({ title, description, imageUrl, link, buttonText }) => {
  return (
    <Card className="landing-page-card" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={imageUrl} height={180} alt={title} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
      </Group>
      <Text size="sm">
        {description}
      </Text>
      <Button fullWidth mt="md" component={Link} to={link} style={{ marginTop: 'auto' }} className="button">
        {buttonText}
      </Button>
    </Card>
  );
};

export default LandingPageCard;
