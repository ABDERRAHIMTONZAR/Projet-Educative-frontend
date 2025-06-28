import  { useEffect } from 'react';
import Header from './LandingPage/Header';
import Hero from './LandingPage/Hero';
import Features from './LandingPage/Features';
import Benefits from './LandingPage/Benefits';
import Access from './LandingPage/Access';
import Testimonial from './LandingPage/Testimonial';
import Footer from './LandingPage/Footer';

export default function LandingPagepp() {
  useEffect(() => {
    document.title = "Evalya Smart | Gestion intelligente des devoirs et examens";
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animated-menu {
        animation: fadeInUp 0.3s ease-out forwards;
      }
      
      .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s ease-out forwards;
      }
      
      .fade-in-delay-1 {
        animation-delay: 0.1s;
      }
      
      .fade-in-delay-2 {
        animation-delay: 0.2s;
      }
      
      .fade-in-delay-3 {
        animation-delay: 0.3s;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('section > div');
    sections.forEach((section, index) => {
      if (index > 0) { 
        observer.observe(section);
      }
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Benefits />
        <Access />
        <Testimonial />
      </main>
      <Footer />
    </div>
  );
}

