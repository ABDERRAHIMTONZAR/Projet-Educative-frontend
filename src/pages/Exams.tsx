import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card2';
import { Search, Filter, FileText, Calendar, Users } from 'lucide-react';
import axios from "axios";

interface Exam {
  examen: string;
  classe: string;
  enseignant: string;
  date: string;
  duree: string;
  inscrits: number;
}

interface Stats {
  total_examens: number;
  examens_cette_semaine: number;
  eleves_inscrits: number;
}

export function Exams() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<Stats>({ total_examens: 0, examens_cette_semaine: 0, eleves_inscrits: 0 });
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resStats = await axios.get(`${import.meta.env.VITE_API_URL}/api/examens-dashboard`);
        setStats(resStats.data);

        const resExams = await axios.get(`${import.meta.env.VITE_API_URL}/api/examens-details`);
        setExams(resExams.data);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredExams = exams.filter(exam =>
    exam.examen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Examens</p>
                <p className="mt-2 text-3xl font-bold">{stats.total_examens || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-blue-700 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cette semaine</p>
                <p className="mt-2 text-3xl font-bold">{stats.examens_cette_semaine || 0}</p>
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
                <p className="text-sm font-medium text-gray-500">Élèves inscrits</p>
                <p className="mt-2 text-3xl font-bold">{stats.eleves_inscrits || 0}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Users className="w-6 h-6 text-purple-700 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un examen..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Liste des examens */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des examens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4">Examen</th>
                  <th className="text-left py-3 px-4">Classe</th>
                  <th className="text-left py-3 px-4">Enseignant</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Inscrits</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam, index) => (
                  <tr key={index} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">{exam.examen}</td>
                    <td className="py-3 px-4">{exam.classe}</td>
                    <td className="py-3 px-4">{exam.enseignant}</td>
                    <td className="py-3 px-4">{new Date(exam.date).toLocaleDateString('fr-FR')}</td>
                    <td className="py-3 px-4">{exam.inscrits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
