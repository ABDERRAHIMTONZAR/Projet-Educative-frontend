import React from 'react';
import { PlusCircle, BookOpen } from 'lucide-react';
import Button from '../ui/Button';

interface DashboardHeaderProps {
  onNewHomework?: () => void;
  onNewExam?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onNewHomework, onNewExam }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-green-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              {onNewExam ? 'Tableau de bord des examens' : 'Tableau de bord'}
            </h1>
          </div>
          {onNewHomework && (
            <Button 
              onClick={onNewHomework}
              icon={<PlusCircle className="h-5 w-5" />}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Nouveau devoir
            </Button>
          )}
          {onNewExam && (
            <button
              onClick={onNewExam}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Nouvel examen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;