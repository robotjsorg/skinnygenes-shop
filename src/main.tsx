import { createRoot } from 'react-dom/client';
import App from './App';
import { MantineProvider } from '@mantine/core';

const root = createRoot(document.getElementById('root')!);
root.render(
  <MantineProvider
    theme={{
      colors: {
        brand: ['#e6f7e6', '#c3e6c3', '#a0d5a0', '#7dc47d', '#5ab35a', '#379237', '#2a732a', '#1d541d', '#103510', '#051a05'],
      },
      primaryColor: 'brand',
      fontFamily: 'Inter, sans-serif',
      headings: {
        fontFamily: 'Inter, sans-serif',
      },
    }}
  >
    <App />
  </MantineProvider>
);