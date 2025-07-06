import React, { useState } from 'react';
import { Mail, ArrowLeft, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/forgetpassword`, {
        email
      });

      setSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Une erreur s’est produite');
      } else {
        setError('Une erreur inattendue s’est produite');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-sm border border-gray-100 animate-fadeIn justify-center justify-self-center">
      {/* Bouton retour */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Retour
      </button>

      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
          <BookOpen className="w-3 h-3 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Evalya Smart</h2>
      </div>

      {/* Titre */}
      <h1 className="text-2xl font-bold text-gray-900">Mot de passe oublié</h1>
      <p className="text-sm text-gray-600">
        Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>

      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {success ? (
        <div className="p-4 text-sm text-green-700 bg-green-50 rounded-md">
          <p>Si un compte avec cet e-mail existe, un lien de réinitialisation a été envoyé. Veuillez vérifier votre boîte de réception.</p>
          <div className="mt-4">
            <Link 
              to="/LoginPage" 
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse e-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                placeholder="Entrez votre e-mail"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                        bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 
                        transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
            </button>
          </div>
        </form>
      )}

      <p className="text-sm text-gray-600 text-center">
        Vous vous souvenez de votre mot de passe ?{' '}
        <Link to="/LoginPage" className="text-green-600 hover:text-green-700 font-medium">
          Connexion
        </Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
