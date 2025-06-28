import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card2';
import { Badge } from '../components/ui/Badge2';
import { Search, UserCircle, BookOpen } from 'lucide-react';

interface Teacher {
  id_enseignant: number;
  enseignant: string;
  matiere: string;
  email: string;
  classes: string[];
  nombre_eleves: number;
  status: 'active' | 'inactive' | 'leave';
  performance: 'high' | 'medium' | 'low';
}

export function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [stats, setStats] = useState({ total_enseignants: 0, classes_actives: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const statusBadges = {
    active: <Badge variant="success">Actif</Badge>,
    inactive: <Badge variant="danger">Inactif</Badge>,
    leave: <Badge variant="warning">En congé</Badge>,
  };

  const performanceBadges = {
    high: <Badge variant="success">Excellent</Badge>,
    medium: <Badge variant="primary">Bon</Badge>,
    low: <Badge variant="warning">À améliorer</Badge>,
  };

  useEffect(() => {
    fetch('http://localhost:5001/api/enseignants-classes-stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch('http://localhost:5001/api/enseignants/classes')
      .then(res => res.json())
      .then(data => {
        console.log('Data reçue enseignants:', JSON.stringify(data, null, 2));
        // Ici tu peux vérifier si les clés correspondent à ton interface
        const formatted = data.map((t: any) => ({
          id_enseignant: t.id_enseignant ?? t.id ?? 0,
          enseignant: t.enseignant ?? t.nom ?? 'N/A',
          matiere: t.matiere ?? t.subject ?? 'N/A',
          email: t.email ?? 'N/A',
          classes: Array.isArray(t.classes) ? t.classes : [],
          nombre_eleves: t.nombre_eleves ?? t.students_count ?? 0,
          status: 'active' as const,
          performance: 'medium' as const,
        }));
        setTeachers(formatted);
      })
      .catch(err => {
        console.error('Erreur fetch enseignants:', err);
      });
  }, []);

  const filteredTeachers = teachers.filter(teacher => {
    return teacher.enseignant.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Enseignants</p>
              <p className="mt-2 text-3xl font-bold">{stats.total_enseignants}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <UserCircle className="w-6 h-6 text-blue-700 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-gray-500">Classes actives</p>
              <p className="mt-2 text-3xl font-bold">{stats.classes_actives}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <BookOpen className="w-6 h-6 text-green-700 dark:text-green-400" />
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
            placeholder="Rechercher un enseignant..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Liste enseignants */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des enseignants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-3 px-4">Nom</th>
                  <th className="text-left py-3 px-4">Matière</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Classes</th>
                  <th className="text-left py-3 px-4">Élèves</th>
                  <th className="text-left py-3 px-4">Statut</th>
                  <th className="text-left py-3 px-4">Performance</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      Aucun enseignant trouvé.
                    </td>
                  </tr>
                ) : (
                  filteredTeachers.map(teacher => (
                    <tr
                      key={teacher.id_enseignant}
                      className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-3 px-4 font-medium">{teacher.enseignant}</td>
                      <td className="py-3 px-4">{teacher.matiere}</td>
                      <td className="py-3 px-4">{teacher.email}</td>
                      <td className="py-3 px-4">
                        {Array.isArray(teacher.classes) ? (
                          teacher.classes.map((classe, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full"
                            >
                              {classe}
                            </span>
                          ))
                        ) : (
                          <span>—</span>
                        )}
                      </td>
                      <td className="py-3 px-4">{teacher.nombre_eleves}</td>
                      <td className="py-3 px-4">{statusBadges[teacher.status]}</td>
                      <td className="py-3 px-4">{performanceBadges[teacher.performance]}</td>
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
