import React, { useState, useEffect } from 'react';
import { Modal, Button, Group, Text } from '@mantine/core';

interface AgeVerificationModalProps {
  children: React.ReactNode;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ children }) => {
  const [opened, setOpened] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);

  useEffect(() => {
    const isAgeVerified = sessionStorage.getItem('ageVerified');
    if (isAgeVerified === 'true') {
      setAgeVerified(true);
    } else {
      setOpened(true);
    }
  }, []);

  const handleVerifyAge = () => {
    sessionStorage.setItem('ageVerified', 'true');
    setAgeVerified(true);
    setOpened(false);
  };

  const handleDeclineAge = () => {
    window.location.href = 'https://www.google.com';
  };

  if (ageVerified) {
    return <>{children}</>;
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {}}
        withCloseButton={false}
        closeOnClickOutside={false}
        closeOnEscape={false}
        centered
        overlayProps={{
          backgroundOpacity: 0.8,
          blur: 10,
        }}
        radius="md"
        padding="xl"
      >
        <Text size="lg" fw={700} ta="center" mb="md">
          Are you 21 years of age or older?
        </Text>
        <Group justify="center" mt="xl">
          <Button size="md" onClick={handleVerifyAge} style={{ flex: 1, maxWidth: '150px' }}>
            Yes
          </Button>
          <Button size="md" variant="outline" onClick={handleDeclineAge} style={{ flex: 1, maxWidth: '150px' }}>
            No
          </Button>
        </Group>
      </Modal>
      {!opened && <>{children}</>}
    </>
  );
};

export default AgeVerificationModal;
