import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const CorrectedHomeworkListPage: React.FC = () => {
    // Liste des devoirs corrigés (exemple de données)
  const homeworks = [
    { id: 1, subject: 'Mathématiques', title: 'Devoir sur les équations', correctedDate: '2025-04-11', status: 'Corrigé', class: '3ème A' },
    { id: 2, subject: 'Français', title: 'Rédaction sur Victor Hugo', correctedDate: '2025-04-13', status: 'Corrigé', class: '4ème B' },
    { id: 3, subject: 'Physique', title: 'Exercices forces et mouvement', correctedDate: '2025-04-16', status: 'Corrigé', class: '2nde C' },
    { id: 4, subject: 'Histoire', title: 'La Révolution Française', correctedDate: '2025-04-19', status: 'Corrigé', class: 'Tle S' },
  ];



  // États
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtrer les devoirs
  const filteredHomeworks = homeworks.filter((hw) => {
    const matchesSearch =
      hw.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hw.class.toLowerCase().includes(searchTerm.toLowerCase());
    return  matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 animate-fadeIn">
          {/* Page Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 rounded-t-xl">
            <h1 className="text-2xl font-bold text-gray-900">Liste des devoirs corrigés</h1>
            <p className="mt-1 text-sm text-gray-600">Consultez les devoirs déjà corrigés.</p>
          </div>

          {/* Filters Section */}
          <div className="px-6 py-4 flex flex-wrap gap-4 items-center justify-between bg-white border-b border-gray-200">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Rechercher par matière, titre ou classe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

          </div>

          {/* Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matière
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de correction
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classe
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHomeworks.length > 0 ? (
                  filteredHomeworks.map((hw) => (
                    <tr key={hw.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hw.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hw.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hw.correctedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {hw.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hw.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/devoir/corrige/${hw.id}`} className="text-blue-600 hover:text-blue-800">
                          Voir
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500 text-sm">
                      Aucun devoir corrigé trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CorrectedHomeworkListPage;