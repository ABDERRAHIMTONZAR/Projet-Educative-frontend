import { useState } from 'react';
import { 
  LayoutDashboard, 
  Book, 
  FileText, 
  Users, 
  UserCircle, 
  AlertTriangle, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  id: string;
  active?: boolean;
  onClick?: (id: string) => void;
}

interface SidebarProps {
  onPageChange: (page: string) => void;
  currentPage: string;
}

function SidebarItem({ icon, label, id, active = false, onClick }: SidebarItemProps) {
  return (
    <li>
      <button
        onClick={() => onClick?.(id)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
          active 
            ? 'bg-blue-700 text-white' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800'
        }`}
      >
        <span className="flex-shrink-0">{icon}</span>
        <span className="font-medium">{label}</span>
      </button>
    </li>
  );
}

export function Sidebar({ onPageChange, currentPage }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
    { id: 'assignments', label: 'Devoirs', icon: <Book size={20} /> },
    { id: 'exams', label: 'Examens', icon: <FileText size={20} /> },
    { id: 'students', label: 'Élèves', icon: <Users size={20} /> },
    { id: 'teachers', label: 'Enseignants', icon: <UserCircle size={20} /> },
  ];

  return (
 <aside className={`h-screen flex flex-col bg-white border-r border-green-200 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-center h-16 border-b border-green-200">
        {!collapsed && (
          <h1 className="text-xl font-bold text-green-700">
            Evalya Smart
          </h1>
        )}
        {collapsed && (
          <div className="p-2 rounded-full bg-green-50">
            <span className="text-green-700 font-bold">ES</span>
          </div>                                                  
        )}
      </div>
      
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-green-200 rounded-full p-1 shadow-sm hover:bg-green-50 transition-colors"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} className="text-green-700" /> : <ChevronLeft size={16} className="text-green-700" />}
      </button>

      <nav className="p-4 space-y-2 h-[calc(100vh-4rem)] overflow-y-auto">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              currentPage === item.id
                ? 'bg-green-50 text-green-700'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <span className={currentPage === item.id ? 'text-green-600' : 'text-gray-400'}>
              {item.icon}
            </span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
 </aside>
  );
}