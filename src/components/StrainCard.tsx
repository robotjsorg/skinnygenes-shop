import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Text, Image, Group, Button, Badge } from '@mantine/core';
import { Strain } from '../types/strain';
import './StrainCard.css';

interface StrainCardProps {
  strain: Strain;
}

const StrainCard: React.FC<StrainCardProps> = ({ strain }) => {
  const badgeColor = strain.type === 'Indica' ? 'purple' : strain.type === 'Sativa' ? 'orange' : 'green';
  return (
    <Card className="strain-card" shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={strain.image}
          height={180}
          alt={strain.name}
          className="strain-card-image"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{strain.name}</Text>
        <Badge color={badgeColor}>
          {strain.type}
        </Badge>
      </Group>

      <Text size="sm" color="dimmed" truncate>
        {strain.description}
      </Text>

      <Button
        component={Link}
        to={`/strains/${strain.id}`}
       
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