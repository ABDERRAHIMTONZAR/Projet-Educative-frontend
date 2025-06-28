/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card2';
import { Search, Filter, Calendar, Book, Users } from 'lucide-react';
import axios from 'axios';

interface Assignment {
  nom_devoir: string;
  classe_nom: string;
  professeur_nom: string;
  date_limite_devoir: string;
}

export function Assignments() {
  const [stats, setStats] = useState({
    totalDevoir: 0,
    devoirEnCours: 0,
    eleveActive: 0,
  });
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    async function fetchStats() {
      try {
        const resStats = await axios.get('http://localhost:5001/api/dashboard-stats');
        setStats(resStats.data);

        const resDevoirs = await axios.get('http://localhost:5001/api/devoirs-with-class-prof');
        setAssignments(resDevoirs.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.nom_devoir.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header avec les stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Devoirs</p>
                <p className="mt-2 text-3xl font-bold">{stats.totalDevoir}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Book className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Devoirs terminés</p>
                <p className="mt-2 text-3xl font-bold">{stats.devoirEnCours}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Calendar className="w-6 h-6 text-green-700 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Élèves actifs</p>
                <p className="mt-2 text-3xl font-bold">{stats.eleveActive}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Users className="w-6 h-6 text-purple-700 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un devoir..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg flex items-center gap-2">
            <Filter size={20} />
            <span>Filtres</span>
          </button>
        </div>
      </div>

      {/* Liste des devoirs */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des devoirs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4">Devoir</th>
                  <th className="text-left py-3 px-4">Classe</th>
                  <th className="text-left py-3 px-4">Enseignant</th>
                  <th className="text-left py-3 px-4">Date limite</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((assignment, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="py-3 px-4 font-medium">{assignment.nom_devoir}</td>
                    <td className="py-3 px-4">{assignment.classe_nom}</td>
                    <td className="py-3 px-4">{assignment.professeur_nom}</td>
                    <td className="py-3 px-4">
                      {new Date(assignment.date_limite_devoir).toLocaleDateString('fr-FR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredAssignments.length === 0 && !loading && (
              <p className="text-center text-gray-500 py-6">Aucun devoir trouvé.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
