import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Text, Image, Group, Button, Badge } from '@mantine/core';
import { Strain } from '../types/strain';
import './StrainCard.css';

interface StrainCardProps {
  strain: Strain;
}

const StrainCard: React.FC<StrainCardProps> = ({ strain }) => {
  const [error, setError] = React.useState(false);

  const imageUrl = `/skinnygenes.shop/images/${strain.name.replace(/\s+/g, '-').toLowerCase()}.jpg`;

  return (
    <Card className="strain-card" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={error ? '/skinnygenes.shop/sq_image.png' : imageUrl}
          height={180}
          alt={strain.name}
          onError={() => setError(true)}
          className="strain-card-image"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{strain.name}</Text>
        <Badge color="pink" variant="light">
          {strain.type}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" truncate>
        {strain.description}
      </Text>

      <Button
        component={Link}
        to={`/strains/${strain.id}`}
        variant="light"
        fullWidth
        mt="md"
        radius="md"
        className="strain-card-button"
      >
        View Details
      </Button>
    </Card>
  );
};

export default StrainCard;