import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AgeVerificationModal from './components/AgeVerificationModal';
import { AccountProvider } from './contexts/AccountContext';
import { CartProvider } from './contexts/CartContext';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const StrainsPage = React.lazy(() => import('./pages/StrainsPage'));
const StrainDetailPage = React.lazy(() => import('./pages/StrainDetailPage'));
const CannThology = React.lazy(() => import('./pages/CannThology'));
const AIFeedbackPage = React.lazy(() => import('./pages/AIFeedbackPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const AccountPage = React.lazy(() => import('./pages/AccountPage'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const OrderConfirmationPage = React.lazy(() => import('./pages/OrderConfirmationPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

const LoadingFallback = () => (
  <Center style={{ height: '100vh' }}>
    <Loader size="lg" />
  </Center>
);

const AppLayout = () => {
  const location = useLocation();
  const hideFooterPaths = ['/cann-thology', '/ai-feedback', '/checkout'];
  const shouldShowFooter = !hideFooterPaths.includes(location.pathname);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<LoadingFallback />}><LandingPage /></Suspense>,
      },
      {
        path: "contact",
        element: <Suspense fallback={<LoadingFallback />}><ContactPage /></Suspense>,
      },
      {
        path: "products",
        element: <Suspense fallback={<LoadingFallback />}><ProductsPage /></Suspense>,
      },
      {
        path: "products/:id",
        element: <Suspense fallback={<LoadingFallback />}><ProductDetailPage /></Suspense>,
      },
      {
        path: "strains",
        element: <Suspense fallback={<LoadingFallback />}><StrainsPage /></Suspense>,
      },
      {
        path: "strains/:id",
        element: <Suspense fallback={<LoadingFallback />}><StrainDetailPage /></Suspense>,
      },
      {
        path: "cann-thology",
        element: <Suspense fallback={<LoadingFallback />}><CannThology /></Suspense>,
      },
      {
        path: "ai-feedback",
        element: <Suspense fallback={<LoadingFallback />}><AIFeedbackPage /></Suspense>,
      },
      {
        path: "cart",
        element: <Suspense fallback={<LoadingFallback />}><CartPage /></Suspense>,
      },
      {
        path: "account",
        element: <Suspense fallback={<LoadingFallback />}><AccountPage /></Suspense>,
      },
      {
        path: "checkout",
        element: <Suspense fallback={<LoadingFallback />}><CheckoutPage /></Suspense>,
      },
      {
        path: "order-confirmation",
        element: <Suspense fallback={<LoadingFallback />}><OrderConfirmationPage /></Suspense>,
      },
      {
        path: "*", // Catch-all route for 404s
        element: <Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense>,
      },
    ],
  },
], { basename: (import.meta as any).env.PROD ? '/skinnygenes-shop/' : '/' });

const App: React.FC = () => {
  return (
    <AgeVerificationModal>
      <AccountProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AccountProvider>
    </AgeVerificationModal>
  );
};

export default App;