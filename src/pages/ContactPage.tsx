import React from 'react';
import { Container, Title, Text, Paper, Group, TextInput, Textarea, Button, Grid, Card } from '@mantine/core';
import { IconMail, IconPhone, IconMapPin } from '@tabler/icons-react';

const ContactPage: React.FC = () => {
  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl" ta="center">
        Contact Us
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={2} mb="md">
              Get in Touch
            </Title>
            <Text mb="lg" color="dimmed">
              Have questions about our products or strains? We're here to help!
              Reach out to us and we'll get back to you as soon as possible.
            </Text>

            <Group gap="md" mb="lg">
              <IconMail size={20} />
              <div>
                <Text fw={500}>Email</Text>
                <Text color="dimmed">info@skinnygenes.shop</Text>
              </div>
            </Group>

            <Group gap="md" mb="lg">
              <IconPhone size={20} />
              <div>
                <Text fw={500}>Phone</Text>
                <Text color="dimmed">(123) 456-7890</Text>
              </div>
            </Group>

            <Group gap="md">
              <IconMapPin size={20} />
              <div>
                <Text fw={500}>Location</Text>
                <Text color="dimmed">Available for shipping worldwide</Text>
              </div>
            </Group>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <Title order={2} mb="md">
              Send us a Message
            </Title>
            <TextInput
              label="Name"
              placeholder="Your name"
              mb="md"
              required
            />
            <TextInput
              label="Email"
              placeholder="your.email@example.com"
              mb="md"
              required
            />
            <TextInput
              label="Subject"
              placeholder="What's this about?"
              mb="md"
            />
            <Textarea
              label="Message"
              placeholder="Tell us how we can help you..."
              minRows={4}
              mb="md"
              required
            />
            <Button fullWidth color="green">
              Send Message
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ContactPage;