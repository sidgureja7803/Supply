import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Footer from './components/Footer';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import PageTransition from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <Homepage />
            </PageTransition>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PageTransition>
              <div className="pt-24">
                <Dashboard />
              </div>
            </PageTransition>
          } 
        />
        <Route 
          path="/about" 
          element={
            <PageTransition>
              <div className="pt-24">
                <About />
              </div>
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <SmoothScrollProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <AnimatedRoutes />
          <Footer />
        </div>
      </SmoothScrollProvider>
    </Router>
  );
}

export default App;