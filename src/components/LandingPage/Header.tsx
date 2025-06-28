import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <BookOpen className="h-8 w-8 text-green-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">Evalya Smart</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('features')}
            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
          >
            Fonctionnalités
          </button>
          <button
            onClick={() => scrollToSection('benefits')}
            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
          >
            Avantages
          </button>
          <button
            onClick={() => scrollToSection('access')}
            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
          >
            Accès
          </button>
          <button
            onClick={() =>{
              navigate('/LoginPage')
            } }
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors font-medium"
          >
            Login
            </button> 
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animated-menu">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-green-600 transition-colors py-2 font-medium"
            >
              Fonctionnalités
            </button>
            <button
              onClick={() => scrollToSection('benefits')}
              className="text-gray-700 hover:text-green-600 transition-colors py-2 font-medium"
            >
              Avantages
            </button>
            <button
              onClick={() => scrollToSection('access')}
              className="text-gray-700 hover:text-green-600 transition-colors py-2 font-medium"
            >
              Accès
            </button>
            <button
              onClick={() => navigate('/LoginPage')}
              className="text-gray-700 hover:text-green-600 transition-colors py-2 font-medium"
            >
              Connexion
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition-colors font-medium"
            >
              Essai Gratuit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;