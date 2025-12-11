import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Sidebar';
import LandingPage from './pages/LandingPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import StrainsPage from './pages/StrainsPage';
import StrainDetailPage from './pages/StrainDetailPage';
import InteractiveStrainExplorer from './pages/InteractiveStrainExplorer';

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/strains" element={<StrainsPage />} />
        <Route path="/strains/:id" element={<StrainDetailPage />} />
        <Route path="/interactive-strain-explorer" element={<InteractiveStrainExplorer />} />
      </Routes>
    </Router>
  );
};

export default App;