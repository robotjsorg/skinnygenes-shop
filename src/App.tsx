import React, { Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet, useNavigate } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import Header from './components/Layout/Header';

const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const StrainsPage = React.lazy(() => import('./pages/StrainsPage'));
const StrainDetailPage = React.lazy(() => import('./pages/StrainDetailPage'));
const InteractiveStrainExplorer = React.lazy(() => import('./pages/InteractiveStrainExplorer'));
const AIFeedbackPage = React.lazy(() => import('./pages/AIFeedbackPage'));
const CannabisAnthologyPage = React.lazy(() => import('./pages/CannabisAnthologyPage'));
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
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
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
        path: "strain-explorer",
        element: <Suspense fallback={<LoadingFallback />}><InteractiveStrainExplorer /></Suspense>,
      },
      {
        path: "ai-feedback",
        element: <Suspense fallback={<LoadingFallback />}><AIFeedbackPage /></Suspense>,
      },
      {
        path: "cannabis-anthology",
        element: <Suspense fallback={<LoadingFallback />}><CannabisAnthologyPage /></Suspense>,
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
  return <RouterProvider router={router} />;
};

export default App;