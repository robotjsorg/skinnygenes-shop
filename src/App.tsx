import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Center, Loader } from '@mantine/core';
import Layout from './components/Layout/Sidebar';

// Lazy load pages for code splitting
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const StrainsPage = React.lazy(() => import('./pages/StrainsPage'));
const StrainDetailPage = React.lazy(() => import('./pages/StrainDetailPage'));
const InteractiveStrainExplorer = React.lazy(() => import('./pages/InteractiveStrainExplorer'));

const LoadingFallback = () => (
  <Center style={{ height: '100vh' }}>
    <Loader size="lg" />
  </Center>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        element: <Suspense fallback={<LoadingFallback />}><StrainDetailPage strainId={''} /></Suspense>,
      },
      {
        path: "interactive-strain-explorer",
        element: <Suspense fallback={<LoadingFallback />}><InteractiveStrainExplorer /></Suspense>,
      },
    ],
  },
], {
  basename: '/skinnygenes.shop/',
});

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;