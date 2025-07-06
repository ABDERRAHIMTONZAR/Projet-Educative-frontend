import { useState, useEffect } from 'react';
import { UserPlus, Mail, Lock, User, GraduationCap, ArrowLeft, BookOpen } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: 'parent' | 'student' | 'teacher';
  id_classe?: number;
  id_parent?: number;
  eleve_nom?: string;
  eleve_prenom?: string;
  id_matiere?: number;
}

interface Classe {
  id_classe: number;
  nom: string;
  niveau: string;
}

interface Matiere {
  id_matiere: number;
  nom: string;
}

export function CreateAccounts() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'parent',
    id_classe: undefined,
    id_parent: undefined,
    eleve_nom: '',
    eleve_prenom: '',
    id_matiere: undefined
  });

  const [classes, setClasses] = useState<Classe[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)

        const [classesResponse, matieresResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/classes`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/matieres`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setClasses(classesResponse.data);
        setMatieres(matieresResponse.data);
        console.log(token)
        console.log(token)
        console.log(token)
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      
      let endpoint = '';
      let dataToSend = {};

      switch (formData.role) {
        case 'parent':
          endpoint = `${import.meta.env.VITE_API_URL}/api/create-parent`;
          dataToSend = {
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            password: formData.password,
            eleve_nom: formData.eleve_nom,
            eleve_prenom: formData.eleve_prenom
          };
          break;
        case 'student':
          endpoint = 'http://localhost:5001/api/create-student';
          dataToSend = {
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            password: formData.password,
            id_classe: formData.id_classe
          };
          break;
        case 'teacher':
          endpoint = 'http://localhost:5001/api/create-teacher';
          dataToSend = {
            nom: formData.nom,
            prenom: formData.prenom,
            email: formData.email,
            password: formData.password,
            id_matiere: formData.id_matiere
          };
          break;
      }

      await axios.post(endpoint, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess('Compte créé avec succès !');
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        role: 'parent',
        id_classe: undefined,
        id_parent: undefined,
        eleve_nom: '',
        eleve_prenom: '',
        id_matiere: undefined
      });
      alert('Compte créé avec succès !');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Une erreur est survenue');
      } else {
        setError('Une erreur inattendue est survenue');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'id_classe' || name === 'id_matiere' ? parseInt(value) : value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Créer un nouveau compte</h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Type de compte
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="parent">Parent</option>
              <option value="student">Élève</option>
              <option value="teacher">Enseignant</option>
            </select>
          </div>

          {formData.role === 'parent' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Informations de l'élève</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="eleve_prenom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prénom de l'élève
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="eleve_prenom"
                      name="eleve_prenom"
                      value={formData.eleve_prenom}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Prénom de l'élève"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="eleve_nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom de l'élève
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="eleve_nom"
                      name="eleve_nom"
                      value={formData.eleve_nom}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Nom de l'élève"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {formData.role === 'parent' ? 'Informations du parent' : 
               formData.role === 'teacher' ? 'Informations de l\'enseignant' : 
               'Informations de l\'élève'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Prénom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Prénom"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nom
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Nom"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="email@exemple.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mot de passe
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {formData.role === 'student' && (
            <div>
                <label htmlFor="id_classe" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Classe
                </label>
                <select
                id="id_classe"
                name="id_classe"
                value={formData.id_classe || ''}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                <option value="">-- Sélectionnez une classe --</option>
                {classes.map(classe => (
                    <option key={classe.id_classe} value={classe.id_classe}>
                    {classe.nom} - {classe.niveau}
                    </option>
                ))}
                </select>
            </div>
            )}
          {formData.role === 'teacher' && (
            <div>
              <label htmlFor="id_matiere" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Matière
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  id="id_matiere"
                  name="id_matiere"
                  value={formData.id_matiere}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Sélectionnez une matière</option>
                  {matieres.map((matiere) => (
                    <option key={matiere.id_matiere} value={matiere.id_matiere}>
                      {matiere.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Création en cours...' : 'Créer le compte'}
          </button>
        </form>
      </div>
    </div>
  );
} 