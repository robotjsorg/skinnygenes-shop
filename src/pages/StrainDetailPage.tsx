import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Image, Title, Text, Badge, Button, Group, Paper, SimpleGrid } from '@mantine/core';
import { Strain } from '../types/strain';

const strains: Strain[] = [
  {
    id: 'chem91-problem-child',
    name: 'Chem 91 x Problem Child',
    description: 'A potent hybrid combining the best of Chem 91 and Problem Child genetics.',
    thc: '20-25%',
    cbd: '<1%',
    type: 'Hybrid',
    image: '/skinnygenes.shop/chem91problemchild.png',
    story: 'This strain is the result of a long-term breeding project by Jay Hershfield, aiming to combine the legendary Chem 91 with the robust genetics of Problem Child. The goal was to create a high-potency strain with a unique terpene profile and vigorous growth. After several generations of selection, this stable F2 hybrid was born.'
  },
  {
    id: 'blue-dream-cbd',
    name: 'Blue Dream CBD',
    description: 'High-CBD strain perfect for wellness with balanced, relaxing effects.',
    thc: '8-12%',
    cbd: '15-20%',
    type: 'Hybrid',
    image: '/skinnygenes.shop/bluedreamcbd.png',
    story: 'Blue Dream CBD was developed to provide the therapeutic benefits of cannabis without the intense psychoactive effects. By crossing a high-CBD variety with the classic Blue Dream, we created a strain that offers a mellow, calming experience. It\'s perfect for users seeking relief from anxiety, pain, and inflammation while staying clear-headed.'
  },
  {
    id: 'northern-lights-auto',
    name: 'Northern Lights Auto',
    description: 'Classic autoflowering strain with reliable yields and easy cultivation.',
    thc: '16-20%',
    cbd: '<1%',
    type: 'Indica',
    image: '/skinnygenes.shop/northernlightsauto.png',
    story: 'The autoflowering version of the legendary Northern Lights, this strain was bred for simplicity and speed. It retains the classic indica effects and resin production of the original but flowers automatically, regardless of the light cycle. This makes it an ideal choice for beginners or growers looking for a quick and easy harvest.'
  }
];

const StrainDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const strain = strains.find(s => s.id === id);

    if (!strain) {
        return (
            <Container py="xl">
                <Title order={1} ta="center">Strain not found</Title>
                <Text ta="center" mt="md">The strain you are looking for does not exist.</Text>
                <Group justify="center" mt="xl">
                    <Button onClick={() => navigate('/strains')} variant="light">Go back to Strains</Button>
                </Group>
            </Container>
        );
    }

    return (
        <Container size="lg" py="xl">
            <Paper shadow="sm" p="xl" withBorder>
                <Grid gutter={{ base: 'xl', md: 50 }}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Image src={strain.image} alt={strain.name} radius="md" />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Group justify="space-between" align="flex-start">
                            <Title order={1}>{strain.name}</Title>
                            <Badge color="pink" size="lg" variant="filled">{strain.type}</Badge>
                        </Group>
                        <Text mt="md" color="dimmed">{strain.description}</Text>
                        
                        <SimpleGrid cols={2} mt="xl">
                            <div>
                                <Text size="sm" color="dimmed">THC</Text>
                                <Text size="lg" fw={500}>{strain.thc}</Text>
                            </div>
                            <div>
                                <Text size="sm" color="dimmed">CBD</Text>
                                <Text size="lg" fw={500}>{strain.cbd}</Text>
                            </div>
                        </SimpleGrid>

                        <Title order={3} mt="xl">The Story</Title>
                        <Text mt="sm">{strain.story}</Text>

                        <Button onClick={() => navigate('/strains')} variant="outline" mt="xl">
                            &larr; Back to Strains
                        </Button>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Container>
    );
};

export default StrainDetailPage;