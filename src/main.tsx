import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import App from './App';
import AgeVerificationModal from './components/AgeVerificationModal';
import { CartProvider } from './contexts/CartContext';
import '@mantine/core/styles.css';
import './global.css';

function Main() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <AgeVerificationModal>
        <CartProvider>
          <App />
        </CartProvider>
      </AgeVerificationModal>
    </MantineProvider>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<Main />);