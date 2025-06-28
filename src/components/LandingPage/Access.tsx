import React from 'react';
import { LaptopIcon as DesktopIcon, Smartphone, Users, Laptop } from 'lucide-react';

const Access: React.FC = () => {
  return (
    <section id="access" className="py-16 md:py-24 bg-green-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Une expérience fluide sur tous les appareils
          </h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Evalya Smart s'adapte aux besoins de tous les utilisateurs avec des interfaces optimisées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-colors">
            <div className="bg-white/20 rounded-full p-4 inline-flex mb-6">
              <Laptop className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Enseignants</h3>
            <p className="opacity-90 mb-6">
              Interface complète sur Web pour la planification, la correction et le suivi des élèves.
            </p>
            <p className="font-medium">Web + Mobile</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-colors">
            <div className="bg-white/20 rounded-full p-4 inline-flex mb-6">
              <Smartphone className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Parents et Élèves</h3>
            <p className="opacity-90 mb-6">
              Application mobile intuitive pour accéder aux devoirs, rendre les travaux et consulter les résultats.
            </p>
            <p className="font-medium">iOS et Android</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center hover:bg-white/20 transition-colors">
            <div className="bg-white/20 rounded-full p-4 inline-flex mb-6">
              <Users className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Direction</h3>
            <p className="opacity-90 mb-6">
              Tableaux de bord personnalisés pour suivre la progression et les résultats en temps réel.
            </p>
            <p className="font-medium">Web + Mobile</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-white text-green-600 hover:bg-green-50 font-semibold px-8 py-4 rounded-lg text-lg shadow-lg transform transition-transform hover:-translate-y-1">
            Demander une démonstration
          </button>
        </div>
      </div>
    </section>
  );
};

export default Access;