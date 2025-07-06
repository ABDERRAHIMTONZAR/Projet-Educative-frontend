import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card2';
import { Badge } from '../components/ui/Badge2';
import { Search, GraduationCap, BookOpen, AlertTriangle } from 'lucide-react';

type EleveInfo = {
  total_eleves: number;
  moyenne_generale_examen: number;
  eleves_a_risque_examen: number;
};

type Student = {
  id_eleve: number;
  nom_complet: string;
  classe: string;
  email: string;
  moyenne: string | number;  // La moyenne peut être une chaîne ou un nombre
};

type FilterType = 'all' | 'atRisk' | 'normal';

export function Students() {
  const [eleveInfo, setEleveInfo] = useState<EleveInfo | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch eleves_info
        const infoResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/eleves_info`);
        if (!infoResponse.ok) throw new Error('Erreur lors de la récupération des statistiques');
        const infoData = await infoResponse.json();
        // Log pour debug
        console.log('Info data:', infoData);
        setEleveInfo(Array.isArray(infoData) ? infoData[0] : infoData);

        // Fetch eleves-moyenne-examen
        const studentsResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/eleves-moyenne-examen`);
        if (!studentsResponse.ok) throw new Error('Erreur lors de la récupération des élèves');
        const studentsData = await studentsResponse.json();
        setStudents(studentsData);
      } catch (err) {
        console.error('Erreur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrer selon la recherche
  const filteredStudents = students.filter((student) => {
    return student.nom_complet.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Badge de risque selon moyenne
  const getRiskBadge = (moyenne: string | number) => {
    const numMoyenne = Number(moyenne);
    if (numMoyenne < 10) return <Badge variant="danger">Élevé</Badge>;
    if (numMoyenne < 14) return <Badge variant="warning">Moyen</Badge>;
    return <Badge variant="success">Faible</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-red-600">
          <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Élèves</p>
              <p className="mt-2 text-3xl font-bold">{eleveInfo?.total_eleves ?? '-'}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <GraduationCap className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Moyenne générale</p>
              <p className="mt-2 text-3xl font-bold">
              {eleveInfo?.moyenne_generale_examen !== undefined
              ? Number(eleveInfo.moyenne_generale_examen).toFixed(2)
              : '-'}              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-700 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Élèves à risque</p>
              <p className="mt-2 text-3xl font-bold">{eleveInfo?.eleves_a_risque_examen ?? '-'}</p>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-700 dark:text-red-400" />
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
            placeholder="Rechercher un élève..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Liste élèves */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des élèves</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="py-3 px-4">Nom</th>
                  <th className="py-3 px-4">Classe</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Moyenne</th>
                  <th className="py-3 px-4">Risque</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      Aucun élève trouvé.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id_eleve}>
                      <td className="py-3 px-4">{student.nom_complet}</td>
                      <td className="py-3 px-4">{student.classe}</td>
                      <td className="py-3 px-4">{student.email}</td>
                      <td className="py-3 px-4">{Number(student.moyenne).toFixed(2)}</td>
                      <td className="py-3 px-4">{getRiskBadge(student.moyenne)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
