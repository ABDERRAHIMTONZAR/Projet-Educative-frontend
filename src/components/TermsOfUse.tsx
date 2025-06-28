import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfUse: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Retour à l'accueil
      </button>

      <h1 className="text-3xl font-bold mb-6">Conditions Générales d'Utilisation</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Acceptation des CGU</h2>
        <p>
          En utilisant la plateforme Evalya Smart, vous acceptez l’intégralité des présentes
          Conditions Générales d’Utilisation (CGU). Si vous êtes en désaccord avec l’un de ces termes,
          veuillez ne pas accéder au service.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Accès au service</h2>
        <p>
          L’accès à la plateforme est réservé aux utilisateurs autorisés (élèves, enseignants,
          direction, parents) via un identifiant personnel et sécurisé.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Utilisation conforme</h2>
        <p>
          Vous vous engagez à utiliser la plateforme uniquement dans un cadre pédagogique
          et à respecter les lois et règlements en vigueur. Toute utilisation abusive
          entraînera la suspension de l’accès.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Propriété intellectuelle</h2>
        <p>
          Le contenu, les outils et l’interface graphique de la plateforme sont protégés par
          les lois sur la propriété intellectuelle et ne peuvent être copiés ou réutilisés sans
          autorisation préalable.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Responsabilités</h2>
        <p>
          Evalya Smart ne peut être tenue responsable d’un mauvais usage de la plateforme ou de
          l’indisponibilité temporaire du service due à des raisons techniques indépendantes de sa volonté.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Modification des CGU</h2>
        <p>
          Evalya Smart se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs
          seront informés en cas de changement majeur.
        </p>
      </section>
    </div>
  );
};

export default TermsOfUse;
