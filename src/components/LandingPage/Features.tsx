import React from 'react';
import { FileText, CheckSquare, CalendarCheck, BarChart3, Smartphone, Globe2 } from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features: React.FC = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      title: "Gestion des devoirs",
      description: "Planifiez, distribuez et collectez les devoirs numériques en un seul clic."
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-purple-600" />,
      title: "Correction automatisée",
      description: "Automatisez la correction et l'analyse avec IA (OCR & GPT)."
    },
    {
      icon: <CalendarCheck className="h-8 w-8 text-green-600" />,
      title: "Organisation des examens",
      description: "Gérez vos examens : calendrier, convocations, scans, notation."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-amber-600" />,
      title: "Suivi des progrès",
      description: "Suivez la progression des élèves en temps réel avec des tableaux de bord interactifs."
    },
    {
      icon: <Globe2 className="h-8 w-8 text-blue-600" />,
      title: "Interface Web",
      description: "Expérience complète pour les enseignants et la direction de l'établissement."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-purple-600" />,
      title: "Application Mobile",
      description: "Accès iOS/Android optimisé pour les élèves, parents et enseignants."
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Une plateforme complète pour l'éducation moderne
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Evalya Smart combine des outils puissants pour simplifier le travail des enseignants et améliorer le suivi des élèves.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;