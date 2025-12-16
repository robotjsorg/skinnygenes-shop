import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/strains" element={<StrainsPage />} />
          <Route path="/strains/:id" element={<StrainDetailPage />} />
          <Route path="/interactive-strain-explorer" element={<InteractiveStrainExplorer />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;