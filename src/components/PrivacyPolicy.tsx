import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <button
        onClick={() => navigate("/LoginPage")}
        className="flex items-center text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Retour à l'accueil
      </button>

      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Collecte des données</h2>
        <p>
          Evalya Smart collecte les données nécessaires au fonctionnement de la
          plateforme : identifiants utilisateur, soumissions de devoirs et copies
          d'examens, commentaires, et métadonnées techniques (adresses IP, logs).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Utilisation des données</h2>
        <p>
          Les données sont utilisées uniquement dans le cadre de la gestion
          pédagogique, du suivi des élèves, de la correction automatisée, et des
          notifications. Aucune donnée n'est vendue ou utilisée à des fins
          commerciales.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Stockage et sécurité</h2>
        <p>
          Toutes les données sont stockées dans des bases sécurisées avec
          chiffrement AES-256, TLS 1.3 pour les échanges, et redondance géographique
          des sauvegardes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Droits des utilisateurs</h2>
        <p>
          Conformément au RGPD, vous avez le droit d'accéder, de corriger ou de
          supprimer vos données personnelles. Pour exercer vos droits, contactez-nous
          à : support@evalya.smart
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
        <p>
          La plateforme utilise des cookies fonctionnels pour améliorer
          l'expérience utilisateur. Aucun cookie tiers à des fins publicitaires
          n'est utilisé.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Mise à jour de la politique</h2>
        <p>
          Cette politique peut être mise à jour à tout moment. Les utilisateurs
          seront informés en cas de modification significative.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
