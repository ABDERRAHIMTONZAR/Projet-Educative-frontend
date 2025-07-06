// src/pages/Statistics.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card2';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

// Define interfaces
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
  examens: number;
  eleves: number;
  devoirs: number;
  classes: number;
}

// API base URL from environment variables
const API_BASE = `${import.meta.env.VITE_API_URL}`;

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export function Statistics() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [classDistribution, setClassDistribution] = useState<ClassDistribution[]>([]);
  const [keyIndicators, setKeyIndicators] = useState<KeyIndicators | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all data in parallel with Axios
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

        // Debug logs
        console.log('Stats Response:', statsResponse.data);
        console.log('Performance Response:', performanceResponse.data);
        console.log('Subject Response:', subjectResponse.data);
        console.log('Class Response:', classResponse.data);
        console.log('Indicators Response:', indicatorsResponse.data);

        // Set data from responses
        setStats(statsResponse.data);
        setPerformanceData(performanceResponse.data);
        setSubjectPerformance(subjectResponse.data);
        setClassDistribution(classResponse.data);
        setKeyIndicators(indicatorsResponse.data);
        
      } catch (err) {
        let errorMessage = 'Failed to load data. Please try again later.';
        
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // Server responded with error status
            errorMessage = `Server error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}`;
            console.error('Response data:', err.response.data);
            console.error('Response status:', err.response.status);
          } else if (err.request) {
            // Request was made but no response
            errorMessage = 'No response from server. Please check if the backend server is running.';
            console.error('Request error:', err.request);
          } else {
            // Other setup errors
            errorMessage = `Request error: ${err.message}`;
            console.error('Error message:', err.message);
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
          console.error('Generic error:', err);
        }
        
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg">Chargement des données...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Erreur de chargement</p>
          <p>{error}</p>
          <p className="mt-2 text-sm">
            Si le problème persiste, contactez le support technique.
          </p>
        </div>
      )}
      

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>

      {/* Class Distribution & Key Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
}