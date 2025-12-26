import React from 'react';
import { Container, Title, Text, Grid, Card, Button, Group, Badge, Image } from '@mantine/core';
import { Link } from 'react-router-dom';

const strains = [
  {
    id: 'chem91-problem-child',
    name: 'Chem 91 x Problem Child',
    description: 'A potent hybrid combining the best of Chem 91 and Problem Child genetics.',
    thc: '20-25%',
    cbd: '<1%',
    type: 'Hybrid',
    image: '/skinnygenes.shop/sq_image.png'
  },
  {
    id: 'blue-dream-cbd',
    name: 'Blue Dream CBD',
    description: 'High-CBD strain perfect for wellness with balanced, relaxing effects.',
    thc: '8-12%',
    cbd: '15-20%',
    type: 'Hybrid',
    image: '/skinnygenes.shop/rt_image.png'
  },
  {
    id: 'northern-lights-auto',
    name: 'Northern Lights Auto',
    description: 'Classic autoflowering strain with reliable yields and easy cultivation.',
    thc: '16-20%',
    cbd: '<1%',
    type: 'Indica',
    image: '/skinnygenes.shop/sq_image.png'
  }
];

const StrainsPage: React.FC = () => {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="md" ta="center">
        Strains Bred by Skinny Genes
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
        Available Strains
      </Title>

      <Grid gutter="lg">
        {strains.map(strain => (
          <Grid.Col span={{ base: 12, sm: 6, md: 4 }} key={strain.id}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image src={strain.image} height={200} alt={strain.name} />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} size="lg">{strain.name}</Text>
                <Badge color="blue" variant="light">
                  {strain.type}
                </Badge>
              </Group>
              <Text size="sm" color="dimmed" mb="md">
                {strain.description}
              </Text>
              <Group gap="xs" mb="md">
                <Badge variant="outline">THC: {strain.thc}</Badge>
                <Badge variant="outline">CBD: {strain.cbd}</Badge>
              </Group>
              <Button variant="light" color="blue" fullWidth component={Link} to={`/strains/${strain.id}`}>
                Learn More
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default StrainsPage;