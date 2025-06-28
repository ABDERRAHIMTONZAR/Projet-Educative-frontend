import { useEffect, useState } from 'react';
import { Book, Calendar, LayoutDashboard, Users, FileText } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card2';
import axios from 'axios';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface PerformanceData {
  month: string;
  moyenne: number;
  tauxReussite: number;
}

interface SubjectPerformance {
  subject: string;
  moyenne: number;
  previous: number;
}

interface ClassDistribution {
  class: string;
  students: number;
}

interface KeyIndicators {
  tauxAssiduite: number;
  devoirsRendus: number;
  participation: number;
  satisfactionParents: number;
}

interface Stats {
  totalDevoir: number;
  devoirEnCours: number;
  eleveActive: number;
  examens: number;
  eleves: number;
  devoirs: number;
  classes: number;
}

export function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalDevoir: 0,
    devoirEnCours: 0,
    eleveActive: 0,
    examens: 0,
    eleves: 0,
    devoirs: 0,
    classes: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [classDistribution, setClassDistribution] = useState<ClassDistribution[]>([]);
  const [keyIndicators, setKeyIndicators] = useState<KeyIndicators | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const api = axios.create({
          baseURL: 'http://localhost:5001',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const [
          statsResponse,
          performanceResponse,
          subjectResponse,
          classResponse,
          indicatorsResponse
        ] = await Promise.all([
          api.get<Stats>('/api/stats'),
          api.get<PerformanceData[]>('/api/performance-data'),
          api.get<SubjectPerformance[]>('/api/subject-performance'),
          api.get<ClassDistribution[]>('/api/class-distribution'),
          api.get<KeyIndicators>('/api/key-indicators')
        ]);

        setStats(statsResponse.data);
        setPerformanceData(performanceResponse.data);
        setSubjectPerformance(subjectResponse.data);
        setClassDistribution(classResponse.data);
        setKeyIndicators(indicatorsResponse.data);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Une erreur est survenue lors du chargement des données');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const renderPerformanceChart = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Évolution des performances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {performanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" domain={[0, 20]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'moyenne' ? `${value}/20` : `${value}%`,
                      name === 'moyenne' ? 'Moyenne' : 'Taux de réussite'
                    ]}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="moyenne"
                    name="Moyenne générale"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="tauxReussite"
                    name="Taux de réussite"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                <div className="text-lg mb-2">📊</div>
                <p>Aucune donnée de performance disponible</p>
                <p className="text-sm mt-1">Les données seront disponibles après la saisie des notes</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSubjectPerformanceChart = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Performance par matière</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {subjectPerformance.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={subjectPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="subject" 
                    angle={-45} 
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis domain={[0, 20]} />
                  <Tooltip 
                    formatter={(value) => [`${value}/20`, 'Note']}
                    labelFormatter={(label) => `Matière: ${label}`}
                  />
                  <Legend />
                  <Bar
                    dataKey="moyenne"
                    name="Moyenne actuelle"
                    fill="#3B82F6"
                  />
                  <Bar
                    dataKey="previous"
                    name="Moyenne précédente"
                    fill="#93C5FD"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                <div className="text-lg mb-2">📚</div>
                <p>Aucune donnée par matière disponible</p>
                <p className="text-sm mt-1">Les données apparaîtront après les évaluations</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderClassDistributionChart = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribution des élèves par niveau</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {classDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={classDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="class" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [value, 'Élèves']}
                    labelFormatter={(label) => `Classe: ${label}`}
                  />
                  <Bar
                    dataKey="students"
                    name="Nombre d'élèves"
                    fill="#8B5CF6"
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                <div className="text-lg mb-2">👨‍🎓</div>
                <p>Aucune donnée de distribution</p>
                <p className="text-sm mt-1">Ajoutez des élèves dans les classes</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderKeyIndicators = () => {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Indicateurs clés</CardTitle>
        </CardHeader>
        <CardContent>
          {keyIndicators ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Taux d'assiduité</span>
                  <span className="font-medium">{keyIndicators.tauxAssiduite}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full transition-all duration-500" 
                    style={{ width: `${keyIndicators.tauxAssiduite}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Devoirs rendus</span>
                  <span className="font-medium">{keyIndicators.devoirsRendus}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-600 rounded-full transition-all duration-500" 
                    style={{ width: `${keyIndicators.devoirsRendus}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Participation en classe</span>
                  <span className="font-medium">{keyIndicators.participation}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-yellow-600 rounded-full transition-all duration-500" 
                    style={{ width: `${keyIndicators.participation}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Satisfaction parents</span>
                  <span className="font-medium">{keyIndicators.satisfactionParents}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-purple-600 rounded-full transition-all duration-500" 
                    style={{ width: `${keyIndicators.satisfactionParents}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
              <div className="text-lg mb-2">📈</div>
              <p>Aucun indicateur disponible</p>
              <p className="text-sm mt-1">Les indicateurs seront calculés après la collecte des données</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-green-800">Tableau de bord</h1>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-8">
          <p className="text-green-600">Chargement en cours...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          
          <div className="flex justify-center items-start w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-max">
    <StatsCard
      title="Total Élèves"
      value="14"
      icon={<Users size={20} className="text-green-600" />}
      trend={{ value: 0.2, isPositive: true }}
      className="bg-white border border-green-200 hover:border-green-300 transition-colors"
    />
    <StatsCard
      title="Devoirs Actifs"
      value="1"
      icon={<Book size={20} className="text-green-600" />}
      trend={{ value: 12.3, isPositive: true }}
      className="bg-white border border-green-200 hover:border-green-300 transition-colors"
    />
    <StatsCard
      title="Examens Prévus"
      value="3"
      icon={<Calendar size={20} className="text-green-600" />}
      trend={{ value: 2.8, isPositive: false }}
      className="bg-white border border-green-200 hover:border-green-300 transition-colors"
    />

  </div>
</div>



          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderPerformanceChart()}
            {renderSubjectPerformanceChart()}
          </div>

          {/* Class Distribution & Key Indicators */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderClassDistributionChart()}
            {renderKeyIndicators()}
          </div>
        </>
      )}
    </div>
  );
}
