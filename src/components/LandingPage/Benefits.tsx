import React from 'react';
import { Clock, Zap, Award, ShieldCheck } from 'lucide-react';

const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi choisir Evalya Smart ?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Notre plateforme apporte une valeur ajoutée significative à l'ensemble de la communauté éducative.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.pexels.com/photos/4143800/pexels-photo-4143800.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Teacher using Evalya Smart" 
              className="w-full h-auto"
            />
          </div>

          <div className="space-y-8">
            <div className="flex">
              <div className="mr-4 bg-blue-100 rounded-full p-3 flex-shrink-0">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Gain de temps considérable</h3>
                <p className="text-gray-700">
                  Les enseignants économisent jusqu'à 6 heures par semaine grâce à l'automatisation des tâches répétitives.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 bg-purple-100 rounded-full p-3 flex-shrink-0">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Feedback instantané</h3>
                <p className="text-gray-700">
                  Les élèves reçoivent des retours immédiats sur leur travail, favorisant un apprentissage plus efficace.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 bg-green-100 rounded-full p-3 flex-shrink-0">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Amélioration des résultats</h3>
                <p className="text-gray-700">
                  Les établissements utilisant Evalya Smart constatent une amélioration moyenne de 18% des résultats scolaires.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="mr-4 bg-amber-100 rounded-full p-3 flex-shrink-0">
                <ShieldCheck className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sécurité des données</h3>
                <p className="text-gray-700">
                  Protection complète des données conformément au RGPD et aux exigences spécifiques à l'éducation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;