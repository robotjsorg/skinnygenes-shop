import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

function Main() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);