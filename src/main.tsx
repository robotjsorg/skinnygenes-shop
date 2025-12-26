import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function Main() {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);