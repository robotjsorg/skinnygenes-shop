import React from 'react';
import { Container, Title, Text, SimpleGrid } from '@mantine/core';
import StrainCard from '../components/StrainCard';
import { Strain } from '../types/strain';

const strains: Strain[] = [
  {
    id: 'chem91-problem-child',
    name: 'Chem 91 x Problem Child',
    description: 'A potent hybrid combining the best of Chem 91 and Problem Child genetics.',
    thc: '20-25%',
    cbd: '<1%',
    type: 'Hybrid',
    image: (import.meta as any).env.BASE_URL + 'chem91problemchild.png'
  },
  {
    id: 'blue-dream-cbd',
    name: 'Blue Dream CBD',
    description: 'High-CBD strain perfect for wellness with balanced, relaxing effects.',
    thc: '8-12%',
    cbd: '15-20%',
    type: 'Hybrid',
    image: (import.meta as any).env.BASE_URL + 'bluedreamcbd.png'
  },
  {
    id: 'northern-lights-auto',
    name: 'Northern Lights Auto',
    description: 'Classic autoflowering strain with reliable yields and easy cultivation.',
    thc: '16-20%',
    cbd: '<1%',
    type: 'Indica',
    image: (import.meta as any).env.BASE_URL + 'northernlightsauto.png'
  }
];

const StrainsPage: React.FC = () => {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="md" ta="center">
        Strains by Skinny Genes
      </Title>
      <Text size="lg" mb="xl" ta="center" color="dimmed">
        Discover our collection of premium cannabis strains, carefully bred for quality and potency.
      </Text>
      <Text mb="lg">
        Jay Hershfield's journey in growing cannabis began with a passion for the plant and a desire to explore its genetic diversity. Over the years, he has dedicated himself to breeding unique strains that capture the essence of cannabis culture. His commitment to quality and innovation has led him to experiment with various genetics, resulting in a collection of strains that are both potent and flavorful.
      </Text>
      <Text mb="lg">
        As a pioneer in the cannabis breeding community, Jay has focused on creating strains that not only perform well in cultivation but also offer a rich experience for consumers. His work has been recognized by enthusiasts and connoisseurs alike, and he continues to push the boundaries of what is possible in cannabis breeding.
      </Text>
      <Title order={2} mb="lg">
        Strains
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {strains.map(strain => (
          <StrainCard key={strain.id} strain={strain} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default StrainsPage;