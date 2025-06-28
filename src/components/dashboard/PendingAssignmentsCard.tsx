import { ChevronRight, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card2';
import { Badge } from '../ui/Badge2';

// Sample data for pending assignments
const pendingAssignments = [
  { 
    id: 1, 
    title: 'Mathématiques Avancées', 
    dueDate: '2025-04-15', 
    class: '3ème A', 
    priority: 'high'
  },
  { 
    id: 2, 
    title: 'Dissertation Philosophie', 
    dueDate: '2025-04-18', 
    class: 'Terminale S', 
    priority: 'medium'
  },
  { 
    id: 3, 
    title: 'Projet Sciences', 
    dueDate: '2025-04-20', 
    class: '4ème B', 
    priority: 'low'
  },
];

// Function to format date to French format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export function PendingAssignmentsCard() {
  const priorityBadges = {
    high: <Badge variant="danger">Prioritaire</Badge>,
    medium: <Badge variant="warning">Moyen</Badge>,
    low: <Badge variant="success">Normal</Badge>,
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Devoirs en attente</CardTitle>
        <Badge variant="primary" className="font-normal">
          {pendingAssignments.length} devoirs
        </Badge>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {pendingAssignments.map((assignment) => (
            <div 
              key={assignment.id}
              className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{assignment.title}</h4>
                {priorityBadges[assignment.priority as keyof typeof priorityBadges]}
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-400">{assignment.class}</span>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {formatDate(assignment.dueDate)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">
          Voir tous les devoirs
          <ChevronRight size={16} />
        </button>
      </CardFooter>
    </Card>
  );
}