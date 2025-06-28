import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LegalNotice: React.FC = () => {
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

      <h1 className="text-3xl font-bold mb-6">Mentions légales</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Éditeur du site</h2>
        <p>
          Ce site est une solution développée par une équipe de trois personnes :
          EL MAIMOUNI Mohamed, MORAFIK Ibtissam et  TONZAR abderrahim . Pour toute
          question, contactez : contact@evalya.smart
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Hébergement</h2>
        <p>
          Le site est hébergé sur une infrastructure cloud sécurisée compatible S3,
          avec réplication inter-région, assurant une disponibilité supérieure à 99,5%.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Propriété intellectuelle</h2>
        <p>
          Tous les contenus présents sur la plateforme (textes, images, logos, code)
          sont protégés par les lois en vigueur sur la propriété intellectuelle. Toute
          reproduction sans autorisation est interdite.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Responsabilité</h2>
        <p>
          Evalya Smart met tout en œuvre pour assurer l'exactitude des informations
          diffusées, mais ne peut être tenue responsable d'erreurs ou d'omissions
          éventuelles.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Loi applicable</h2>
        <p>
          Les présentes mentions légales sont régies par le droit marocain. En cas de
          litige, les tribunaux compétents seront ceux du siège de l’éditeur.
        </p>
      </section>
    </div>
  );
};

export default LegalNotice;
