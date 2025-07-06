import React, { useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import DashboardHeader from './DashboardHeader';
import NewHomeworkForm from './NewHomeworkForm';
import Sidebar from './Sidebar';
import { useHomeworkStore } from '../../zustand/store';

const Dashboard: React.FC = () => {
  const { homeworks, loadHomeworks, addHomework } = useHomeworkStore();
  const [showNewHomeworkForm, setShowNewHomeworkForm] = useState(false);
  console.log('État initial des devoirs:', homeworks);

  interface Homeworkk {
    nom_devoir: ReactNode;
    url: string | undefined;
    title: any;
    type: ReactNode;
    fileName: string;
    fileUrl: string;
    fileType: string;
  }

  useEffect(() => {
    console.log('Début du chargement des devoirs...');
    const token = localStorage.getItem('token');
    console.log('Token présent:', !!token);
    loadHomeworks().then(() => {
      console.log('Données chargées:', homeworks);
    }).catch(error => {
      console.error('Erreur lors du chargement:', error);
    });
  }, [loadHomeworks]);

  const handleNewHomework = () => {
    console.log('Ouverture du formulaire de nouveau devoir');
    setShowNewHomeworkForm(true);
  };

  const handleCloseNewHomeworkForm = () => {
    console.log('Fermeture du formulaire de nouveau devoir');
    setShowNewHomeworkForm(false);
  };

  const handleSubmitNewHomework = async (formData: FormData) => {
    console.log('Début de la soumission du nouveau devoir');
    try {
      setShowNewHomeworkForm(false);

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
      console.log('Détails de l\'upload:', {
        status: uploadResponse.status,
        headers: uploadResponse.headers,
        data: uploadResponse.data
      });

      const title = formData.get('title') as string;
      const subject = formData.get('subject') as string;
      const dueDate = formData.get('dueDate') as string;
      const semestre = formData.get('semestre') as string;
      const className = formData.get('class') as string;
      const type = formData.get('type') as string;
      
      console.log('Données complètes du devoir:', { 
        title, 
        subject, 
        dueDate, 
        semestre, 
        className,
        type,
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      });

      if (uploadResponse.status === 200) {
        const url = data.url.split('?')[0];
        console.log('URL finale du fichier:', url);

        console.log('Enregistrement du devoir dans la base de données...');
        try {
          console.log(token)
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/enregistrer`,
            {
              title,
              subject,
              dueDate,
              semestre,
              className,
              url,
              type: file.type
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log('Réponse de l\'enregistrement:', response.status);
          if (response.status === 201) {
            console.log('Devoir enregistré avec succès');
            alert('Devoir enregistré avec succès !');
            const newHomework = {
              nom_devoir: title,
              url: url,
              type: file.type,
              title,
              fileName: file.name,
              fileUrl: url,
              fileType: file.type
            };
            console.log('Ajout du devoir au store:', newHomework);
            addHomework(newHomework);
          }
        } catch (error: any) {
          console.error('Erreur détaillée lors de l\'enregistrement:', error.response?.data || error.message);
          if (error.response) {
            alert(error.response.data.message || 'Erreur lors de l\'enregistrement du devoir');
          } else {
            alert('Erreur lors de l\'enregistrement du devoir');
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
      <DashboardHeader onNewHomework={handleNewHomework} />

      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <section aria-labelledby="homeworks-heading">
            <h2 id="homeworks-heading" className="text-lg font-medium text-gray-900 mb-4">
              Liste des devoirs soumis
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table responsive */}
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Nom du devoir</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Type</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Lien de téléchargement</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {homeworks && homeworks.length > 0 ? (
                      homeworks.map((homework: Homeworkk, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm text-gray-900">{homework.nom_devoir}</td>
                          <td className="px-4 py-2 text-sm text-gray-500">{homework.type}</td>
                          <td className="px-4 py-2 text-sm">
                            <a 
                              href={homework.url} 
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
                          Aucun devoir disponible
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>

      {showNewHomeworkForm && (
        <NewHomeworkForm
          onClose={handleCloseNewHomeworkForm}
          onSubmit={handleSubmitNewHomework}
        />
      )}
    </div>
  );
};

export default Dashboard;
