import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import '@mantine/core/styles.css';
import './global.css';

function Main() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <App />
    </MantineProvider>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);