import React from 'react';
import { Eye, FileText } from 'lucide-react';
import { Homework } from '../../types/homework';
import Button from '../ui/Button';
import StatusBadge from './StatusBadge';
import { formatDate } from '../../utils/dateUtils';

interface HomeworkTableProps {
  homeworks: Homework[];
  onViewDetails: (homework: Homework) => void;
}

const HomeworkTable: React.FC<HomeworkTableProps> = ({ 
  homeworks,
  onViewDetails,
}) => {
  if (homeworks.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md border border-gray-200">
        <p className="text-gray-500">Aucun devoir trouvé</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Classe
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Matière
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date de rendu
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fichier
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Statut
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {homeworks.map((homework) => (
            <tr key={homework.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {homework.class}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {homework.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(homework.dueDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {homework.file ? (
                  <a 
                    href={homework.file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {homework.file.name}
                  </a>
                ) : (
                  <span className="text-gray-400">Aucun fichier</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={homework.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onViewDetails(homework)}
                  aria-label={`Voir les détails du devoir pour ${homework.subject}`}
                  icon={<Eye className="h-4 w-4" />}
                >
                  Détails
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeworkTable;