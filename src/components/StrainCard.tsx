import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Text, Image, Group } from '@mantine/core';
import { Strain } from '../types/strain';

interface StrainCardProps {
  strain: Strain;
}

const StrainCard: React.FC<StrainCardProps> = ({ strain }) => {
  return (
    <Card shadow="sm" padding="lg" style={{ maxWidth: 300 }}>
      <Card.Section>
        <Image src={`/images/${strain.name.replace(/\s+/g, '-').toLowerCase()}.jpg`} alt={strain.name} />
      </Card.Section>
      <Group position="apart" style={{ marginTop: 5 }}>
        <Text weight={500}>{strain.name}</Text>
        <Link to={`/strains/${strain.id}`}>View Details</Link>
      </Group>
      <Text size="sm" color="dimmed" style={{ marginTop: 5 }}>
        {strain.description}
      </Text>
    </Card>
  );
};

export default StrainCard;