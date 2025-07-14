import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Truck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header scroll animation
      ScrollTrigger.create({
        trigger: "body",
        start: "top -80",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scrolled = self.progress > 0;
          setIsScrolled(scrolled);
          
          if (headerRef.current) {
            gsap.to(headerRef.current, {
              backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
              backgroundColor: scrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 1)",
              boxShadow: scrolled ? "0 10px 40px rgba(0, 0, 0, 0.1)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

      // Logo animation on scroll
      ScrollTrigger.create({
        trigger: "body",
        start: "top -100",
        end: "bottom bottom",
        onToggle: (self) => {
          if (logoRef.current) {
            gsap.to(logoRef.current, {
              scale: self.isActive ? 0.9 : 1,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

      // Navigation items stagger animation on load
      if (navRef.current) {
        const navItems = navRef.current.querySelectorAll('a');
        gsap.fromTo(navItems, 
          { y: -20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.5, 
            stagger: 0.1, 
            ease: "power3.out",
            delay: 0.2
          }
        );
      }
    });

    return () => ctx.revert();
  }, [location.pathname]);

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/about', label: 'About' }
  ];

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-white shadow-md'
      } border-b border-blue-600/20`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div 
              ref={logoRef}
              className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
            >
              <Truck className="h-8 w-8 text-white transform group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <h1 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                Walmart
              </h1>
              <p className="text-sm text-blue-600 font-bold tracking-wide">
                Supply Chain 2.0
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex space-x-2">
            {navigationItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 overflow-hidden group ${
                  isActive(item.path) 
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {!isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                )}
                {!isActive(item.path) && (
                  <span className="relative z-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-center">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-3 rounded-xl transition-all duration-300 ${
              isMenuOpen 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
              <X className={`absolute inset-0 transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col space-y-2 pt-4">
            {navigationItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`relative px-6 py-4 rounded-xl text-sm font-bold transition-all duration-300 transform ${
                  isActive(item.path) 
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg scale-105' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105 hover:translate-x-2'
                } ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10 flex items-center">
                  {item.label}
                  {isActive(item.path) && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </span>
                {!isActive(item.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1] md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;