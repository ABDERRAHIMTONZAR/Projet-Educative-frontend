import { Activity, ChevronRight, FileText, User, Book } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card2';

// Sample data for recent activities
const recentActivities = [
  { 
    id: 1, 
    type: 'exam', 
    title: 'Examen Final Mathématiques', 
    class: 'Terminale S',
    teacher: 'Prof. Bernard',
    timestamp: '2025-04-10T09:30:00'
  },
  { 
    id: 2, 
    type: 'assignment', 
    title: 'Dissertation Littérature', 
    class: '1ère L',
    teacher: 'Prof. Moreau',
    timestamp: '2025-04-09T14:15:00'
  },
  { 
    id: 3, 
    type: 'exam', 
    title: 'Contrôle Physique-Chimie', 
    class: '2nde B',
    teacher: 'Prof. Dubois',
    timestamp: '2025-04-08T10:45:00'
  },
  { 
    id: 4, 
    type: 'assignment', 
    title: 'Projet Histoire', 
    class: '3ème A',
    teacher: 'Prof. Lambert',
    timestamp: '2025-04-07T16:00:00'
  },
];

// Function to format relative time
const formatRelativeTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 24) {
    return diffInHours === 0 
      ? "Il y a moins d'une heure" 
      : `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  }
};

export function RecentActivitiesCard() {
  const activityIcons = {
    exam: <FileText size={16} className="text-purple-500 dark:text-purple-400" />,
    assignment: <Book size={16} className="text-blue-500 dark:text-blue-400" />,
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Activity size={18} /> 
          Activités récentes
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {activityIcons[activity.type as keyof typeof activityIcons]}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">{activity.title}</h4>
                  
                  <div className="mt-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{activity.class}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{activity.teacher}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(activity.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">
          Voir toutes les activités
          <ChevronRight size={16} />
        </button>
      </CardFooter>
    </Card>
  );
}