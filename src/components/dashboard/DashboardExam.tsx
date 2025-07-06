import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import { PlusCircle } from 'lucide-react';
import NewExamForm from './NewExamForm';

interface Exam {
  nom_examen: string;
  url: string;
  type: string;
}

const DashboardExam: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewExamForm, setShowNewExamForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const examsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/recupererExamen`, {
          headers: { Authorization: `Bearer ${token}` }
        });
       console.log(token)
        setExams(examsResponse.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredExams = exams.filter(exam =>
    exam.nom_examen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewExam = () => {
    setShowNewExamForm(true);
  };

  const handleCloseNewExamForm = () => {
    setShowNewExamForm(false);
  };

  const handleSubmitNewExam = async (formData: FormData) => {
    try {
      setShowNewExamForm(false);

      const file = formData.get('file') as File;
      console.log('Fichier sélectionné:', file?.name, 'Type:', file?.type);

      if (!file) {
        console.error('Aucun fichier sélectionné');
        alert('Aucun fichier sélectionné');
        return;
      }

      const token = localStorage.getItem('token');
      console.log('Token présent:', !!token);

      console.log('Demande d\'URL pré-signée en cours...');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/upload`, {
        params: {
          name: file.name,
          type: file.type || 'application/octet-stream',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Réponse du serveur pour l'URL pré-signée:", response.data);

      const data = response.data;
      console.log('Début de l\'upload vers S3...');
      const uploadResponse = await axios.put(data.url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });
      alert('Fichier téléchargé avec succès!');
      console.log('Réponse de l\'upload S3:', uploadResponse.status);

      if (uploadResponse.status === 200) {
        const url = data.url.split('?')[0];
        console.log('URL finale du fichier:', url);

        console.log('Enregistrement de l\'examen dans la base de données...');
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/enregistrerExamen`,
            {
              title: formData.get('title'),
              subject: formData.get('subject'),
              dueDate: formData.get('dueDate'),
              semestre: formData.get('semestre'),
              className: formData.get('class'),
              url: url,
              type: file.type
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 201) {
            console.log('Examen enregistré avec succès');
            alert('Examen enregistré avec succès !');
            // Recharger les données
                  const examsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/recupererExamen`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            setExams(examsResponse.data);
          }
        } catch (error: any) {
          console.error('Erreur détaillée lors de l\'enregistrement:', error.response?.data || error.message);
          if (error.response) {
            alert(error.response.data.message || 'Erreur lors de l\'enregistrement de l\'examen');
          } else {
            alert('Erreur lors de l\'enregistrement de l\'examen');
          }
        }
      } else {
        console.error('Échec de l\'upload vers S3');
        alert('Échec du téléchargement');
      }
    } catch (error) {
      console.error('Erreur complète lors de l\'upload:', error);
      alert('Erreur lors de l\'upload');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          {/* En-tête avec bouton de création */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des examens</h1>
            <button
              onClick={handleNewExam}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle size={20} />
              <span>Nouvel examen</span>
            </button>
          </div>

          {/* Liste des examens */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Liste des examens</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Examen</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Fichier</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-center text-sm text-gray-500">
                        Chargement...
                      </td>
                    </tr>
                  ) : filteredExams.length > 0 ? (
                    filteredExams.map((exam, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-2 text-sm text-gray-900">{exam.nom_examen}</td>
                        <td className="px-4 py-2 text-sm text-gray-500">{exam.type}</td>
                        <td className="px-4 py-2 text-sm">
                          <a 
                            href={exam.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Télécharger
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-4 py-2 text-center text-sm text-gray-500">
                        Aucun examen trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Formulaire de création d'examen */}
      {showNewExamForm && (
        <NewExamForm
          onClose={handleCloseNewExamForm}
          onSubmit={handleSubmitNewExam}
        />
      )}
    </div>
  );
};

export default DashboardExam; 