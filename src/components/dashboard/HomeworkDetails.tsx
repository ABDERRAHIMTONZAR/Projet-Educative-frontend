import React from 'react';
import { X } from 'lucide-react';
import { Homework } from '../../types/homework';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utils/dateUtils';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';

interface HomeworkDetailsProps {
  homework: Homework;
  onClose: () => void;
}

const HomeworkDetails: React.FC<HomeworkDetailsProps> = ({ homework, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-lg w-full">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Détails du devoir</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              aria-label="Fermer"
              icon={<X className="h-4 w-4" />}
            >
              Fermer
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Classe</p>
                <p className="font-medium">{homework.class}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Matière</p>
                <p className="font-medium">{homework.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date de rendu</p>
                <p className="font-medium">{formatDate(homework.dueDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Statut</p>
                <StatusBadge status={homework.status} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="mt-1">{homework.description}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button>Modifier</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default HomeworkDetails;