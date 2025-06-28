import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfService: React.FC = () => {
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

      <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Acceptation des conditions</h2>
        <p>
          En accédant à la plateforme Evalya Smart, vous acceptez pleinement et
          sans réserve les présentes conditions générales d'utilisation. Si vous
          n'acceptez pas ces conditions, veuillez ne pas utiliser nos services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Description du service</h2>
        <p>
          Evalya Smart est une plateforme web et mobile destinée à la gestion
          intelligente des devoirs, examens et du suivi pédagogique. Elle inclut
          des outils de planification, correction (manuelle et par IA), et
          tableaux de bord analytiques pour les différents utilisateurs
          (enseignants, élèves, parents, direction).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Données et confidentialité</h2>
        <p>
          Toutes les données personnelles collectées sont traitées conformément
          au RGPD et aux normes de la CNDP. Vos fichiers sont chiffrés et
          stockés de manière sécurisée avec une réplication inter-région.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Sécurité</h2>
        <p>
          Nous utilisons les dernières technologies en matière de sécurité :
          chiffrement TLS 1.3, authentification multifacteur, journalisation
          immuable et surveillance continue via Prometheus et Grafana.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Propriété intellectuelle</h2>
        <p>
          L'ensemble des contenus, codes et interfaces de la plateforme Evalya
          Smart sont la propriété exclusive de l'équipe de développement et sont
          protégés par le droit d'auteur.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Modifications</h2>
        <p>
          Evalya Smart se réserve le droit de modifier à tout moment les
          présentes conditions. Les utilisateurs seront notifiés en cas de
          changement significatif.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">7. Contact</h2>
        <p>
          Pour toute question ou demande d'information complémentaire, vous
          pouvez nous contacter à l'adresse suivante : support@evalya.smart
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
