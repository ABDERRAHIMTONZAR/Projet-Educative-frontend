import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Hero: React.FC = () => {
   const navigate = useNavigate();
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-green-50 to-purple-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Simplifiez la gestion des devoirs et examens avec{' '}
                <span className="text-green-600">Evalya Smart</span>
              </h1>
              <div className="space-y-4 mb-8">
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  La plateforme tout-en-un qui révolutionne le suivi pédagogique grâce à l'intelligence artificielle.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Optimisez votre temps, améliorez le suivi des élèves et transformez l'expérience d'apprentissage avec nos outils innovants.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={() =>  navigate('/LoginPage')} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  login
                </button>
                <button className="bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-8 py-4 rounded-lg transition-all duration-300 font-medium text-lg hover:shadow-md">
                  Voir la démo
                </button>
              </div>
              <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-green-100">
                <Sparkles className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                <p className="text-gray-700">
                  Evalya Smart — <span className="font-semibold"> 50 % de temps gagné, 100 % de maîtrise.</span>{' '}
                </p>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-1 transition-transform hover:rotate-0 duration-300">
                <img 
                  src="https://images.pexels.com/photos/4144294/pexels-photo-4144294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Evalya Smart Dashboard" 
                  className="w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300  mb-7 mr-7">
                  <p className="font-medium text-sm md:text-base">Intelligence artificielle intégrée</p>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-green-600 text-white p-4 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <p className="font-medium text-sm md:text-base">Suivi en temps réel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;