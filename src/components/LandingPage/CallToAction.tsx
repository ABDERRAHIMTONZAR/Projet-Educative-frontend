import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à transformer votre approche pédagogique ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez les établissements qui ont déjà adopté Evalya Smart et constatez l'impact positif sur votre communauté éducative.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle2 className="h-6 w-6 mr-3 text-green-300" />
                <p className="opacity-90">Essai gratuit de 30 jours sans engagement</p>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-6 w-6 mr-3 text-green-300" />
                <p className="opacity-90">Accompagnement personnalisé pour le déploiement</p>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-6 w-6 mr-3 text-green-300" />
                <p className="opacity-90">Formation complète pour tous les utilisateurs</p>
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-6 w-6 mr-3 text-green-300" />
                <p className="opacity-90">Support technique réactif et dédié</p>
              </div>
            </div>

            <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg text-lg shadow-lg flex items-center transition-transform transform hover:-translate-y-1">
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-6">Contactez-nous</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 opacity-90">Nom</label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 opacity-90">Email professionnel</label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="votre.email@etablissement.fr"
                />
              </div>
              <div>
                <label htmlFor="school" className="block mb-1 opacity-90">Établissement</label>
                <input
                  type="text"
                  id="school"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Nom de votre établissement"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 opacity-90">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Comment pouvons-nous vous aider ?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-lg transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;