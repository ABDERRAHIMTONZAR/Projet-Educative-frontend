import { Star } from 'lucide-react';

const Testimonial: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Découvrez comment Evalya Smart transforme le quotidien des établissements scolaires.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-blue-50 rounded-2xl p-8 md:p-12 relative">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
            ))}
          </div>
          
          <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 text-center">
            "Evalya Smart a révolutionné notre façon de gérer les évaluations. Le temps économisé est considérable, et nos élèves bénéficient d'un suivi beaucoup plus personnalisé. L'intelligence artificielle apporte une valeur ajoutée extraordinaire à notre enseignement."
          </blockquote>
          
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
              <img 
                src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Sophie Martin" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Sophie Martin</p>
              <p className="text-gray-600">Directrice, Lycée international de Paris</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;