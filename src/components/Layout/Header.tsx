import React from 'react';
import { Header as MantineHeader, Title } from '@mantine/core';

const Header: React.FC = () => {
    return (
        <MantineHeader height={60} p="md">
            <Title order={1}>Skinny Genes Shop</Title>
        </MantineHeader>
    );
};

export default Header;