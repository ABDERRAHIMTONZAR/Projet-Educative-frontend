import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';

const ExamListPage: React.FC = () => {
  // Sample exam data
  const exams = [
    { id: 1, subject: 'Mathématiques', date: '2025-04-01', status: 'Corrigé', class: '3ème A' },
    { id: 2, subject: 'Physique', date: '2025-04-03', status: 'En attente', class: '2nde C' },
    { id: 3, subject: 'Français', date: '2025-04-05', status: 'Corrigé', class: '1ère D' },
    { id: 4, subject: 'Histoire', date: '2025-04-07', status: 'Corrigé', class: 'Tle S' },
  ];


  // States
  const [selectedTeacher, setSelectedTeacher] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filtered exams
  const filteredExams = exams.filter((exam) => {
    const matchesSearch =
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.class.toLowerCase().includes(searchTerm.toLowerCase());
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
            <h1 className="text-2xl font-bold text-gray-900">Liste des examens corrigés</h1>
            <p className="mt-1 text-sm text-gray-600">Consultez les examens déjà corrigés.</p>
          </div>

          {/* Filters Section */}
          <div className="px-6 py-4 flex flex-wrap gap-4 items-center justify-between bg-white border-b border-gray-200">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Rechercher par matière ou classe..."
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
                    Date
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
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{exam.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            exam.status === 'Corrigé'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{exam.class}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/exam/${exam.id}`} className="text-blue-600 hover:text-blue-800">
                          Voir
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500 text-sm">
                      Aucun examen trouvé.
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

export default ExamListPage;