import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Container, Title, Text, Paper } from '@mantine/core';

const InteractiveStrainExplorer: React.FC = () => {
    return (
        <Container size="xl" py="xl">
            <Title order={1} mb="md" ta="center">
                Interactive Strain Explorer
            </Title>
            <Text size="lg" mb="xl" ta="center" color="dimmed">
                Explore the genetic evolution of our cannabis strains in 3D.
            </Text>
            <Paper shadow="sm" p="lg" radius="md" withBorder style={{ height: '60vh' }}>
                <Canvas>
                    {/* Future implementation for the tree-like genetic evolution of cannabis plants will go here */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <mesh>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="hotpink" />
                    </mesh>
                </Canvas>
            </Paper>
        </Container>
    );
};

export default InteractiveStrainExplorer;