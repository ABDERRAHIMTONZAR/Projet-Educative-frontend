import { Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card2';
import { Badge } from '../ui/Badge2';

// Sample data for upcoming exams
const upcomingExams = [
  { 
    id: 1, 
    title: 'Examen Trimestriel - Mathématiques', 
    date: '2025-04-22', 
    class: 'Terminale S', 
    status: 'scheduled'
  },
  { 
    id: 2, 
    title: 'Contrôle Histoire-Géographie', 
    date: '2025-04-24', 
    class: '3ème A', 
    status: 'draft'
  },
  { 
    id: 3, 
    title: 'Test d\'Anglais', 
    date: '2025-04-26', 
    class: '4ème B', 
    status: 'scheduled'
  },
];

// Function to calculate days remaining
const getDaysRemaining = (dateString: string) => {
  const today = new Date();
  const examDate = new Date(dateString);
  const diffTime = examDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function UpcomingExamsCard() {
  const statusBadges = {
    scheduled: <Badge variant="primary">Programmé</Badge>,
    draft: <Badge variant="secondary">Brouillon</Badge>,
    completed: <Badge variant="success">Terminé</Badge>,
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Examens prévus cette semaine</CardTitle>
        <Badge variant="primary" className="font-normal">
          {upcomingExams.length} examens
        </Badge>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {upcomingExams.map((exam) => {
            const daysRemaining = getDaysRemaining(exam.date);
            
            return (
              <div 
                key={exam.id}
                className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{exam.title}</h4>
                  {statusBadges[exam.status as keyof typeof statusBadges]}
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{exam.class}</span>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1 text-gray-500 dark:text-gray-400" />
                    <span className={`${
                      daysRemaining <= 3 
                        ? 'text-red-600 dark:text-red-400 font-medium' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {daysRemaining === 0 
                        ? "Aujourd'hui" 
                        : daysRemaining === 1 
                          ? "Demain" 
                          : `Dans ${daysRemaining} jours`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      
      <CardFooter>
        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">
          Voir tous les examens
          <ChevronRight size={16} />
        </button>
      </CardFooter>
    </Card>
  );
}