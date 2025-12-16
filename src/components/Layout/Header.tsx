import React from 'react';
import { Title } from '@mantine/core';

const Header: React.FC = () => {
    return (
        <header style={{ height: 60, padding: 16 }}>
            <Title order={1}>Skinnygenes Shop</Title>
        </header>
    );
};

export default Header;