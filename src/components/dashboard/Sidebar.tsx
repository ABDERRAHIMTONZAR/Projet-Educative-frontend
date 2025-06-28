import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react"; 
import {
  FileText,
  LogOut,
  User,
  FilePlus,
  ClipboardCheck
} from "lucide-react";

interface MenuItem {
  label: string;
  icon?: JSX.Element;
  url?: string;
  subItems?: MenuItem[];
}

const sidebarItems: MenuItem[] = [
  {
    label: "Gestion des devoirs",
    icon: <FileText />,
    subItems: [
      { label: "Création", icon: <FilePlus />, url: "/ensignantsdashboard" },
      { label: "Correction", icon: <ClipboardCheck /> , url: "/HomeworkList" },
      { label: "Calendrier des devoirs", icon: <FileText />, url: "/Calendar" },
    ],
  },
  {
    label: "Gestion des examens",
    icon: <FileText />,
    subItems: [
      { label: "Création", icon: <FilePlus />,url: "/DashboardExam" },
      { label: "Correction", icon: <ClipboardCheck />,url: "/ExamList" },
      { label: "Calendrier des examens", icon: <FileText />,url: "/examcalendar" },
    ],
  },
];

export default function Sidebar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate(); // Initialize React Router navigation

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex  p-4 font-bold text-xl">  <BookOpen className="h-8 w-8 text-green-600 mr-3" /> Dashboard</div>
        <nav className="px-2">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              <button
                className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg"
                onClick={() => {
                  if (item.url) {
                    navigate(item.url); // Navigate if URL exists
                  } else if (item.subItems) {
                    // Toggle submenu open/close
                    setActiveIndex(index === activeIndex ? null : index);
                  }
                }}
                title={item.label}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
              {/* Render sub-items if this item is expanded */}
              {item.subItems && activeIndex === index && (
                <div className="ml-8 mt-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                      title={subItem.label}
                      onClick={() => subItem.url && navigate(subItem.url)}
                    >
                      <span className="mr-2">{subItem.icon}</span>
                      {subItem.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="px-4 py-4 border-t flex items-center justify-between">
        <div className="flex items-center gap-2" title="Mon Compte">
          <User className="w-5 h-5" />
          <span className="text-sm">Mon Compte</span>
        </div>
        <Link to="/" className="text-red-500 hover:text-red-600" title="Déconnexion">
           Déconnexion
        </Link>
      </div>
    </aside>
  );
}