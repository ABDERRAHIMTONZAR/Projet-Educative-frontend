import { Bell, ChevronDown, UserPlus } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { LanguageToggle } from '../ui/LanguageToggle';
import { Avatar } from '../ui/Avatar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  currentPage: string;
}

export function Header({ currentPage }: HeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/LoginPage');
  };

  const handleCreateAccounts = () => {
    navigate('/CreateAccounts');
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Tableau de Bord',
      assignments: 'Devoirs',
      exams: 'Examens',
      students: 'Élèves',
      teachers: 'Enseignants',
      aiAlerts: 'Alertes IA',
      statistics: 'Statistiques'
    };
    
    return titles[currentPage as keyof typeof titles] || 'Tableau de Bord';
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {getPageTitle()}
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={handleCreateAccounts}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          <UserPlus size={16} />
          <span className="hidden sm:inline">Créer des comptes</span>
        </button>

        <div className="relative">
          <button 
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2"
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
          >
            <Avatar fallback="AD" />
            <span className="text-sm font-medium hidden sm:inline">Admin</span>
            <ChevronDown size={16} />
          </button>
          
          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-lg py-1 z-10">
              <button 
                onClick={handleCreateAccounts}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
              >
                <UserPlus size={16} />
                Créer des comptes
              </button>
              <div className="border-t border-gray-200 dark:border-gray-800 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}