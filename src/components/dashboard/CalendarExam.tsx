import { useState, useEffect } from "react";
import ExamCalendar from "./ExamCalendar"; // Assuming you have this component
import Sidebar from "./Sidebar";
import { Loader2, CalendarDays } from "lucide-react";
import axios from "axios";

type ExamEvent = {
  id: string;
  title: string;
  start: string; // from API
  end: string;
  allDay: boolean;
};


export default function ExamCalendarPage() {
  const [exams, setExams] = useState<ExamEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const chargerExamens = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/getexamens`);

      const data: ExamEvent[] = response.data;

      const events: ExamEvent[] = data.map((item) => ({
  id: item.id,
  title: item.title,
  start: item.start, // keep as string
  end: item.end,     // keep as string
  allDay: item.allDay,
}));

      setExams(events);
    } catch (err) {
      console.error("Erreur lors du chargement des examens :", err);
      setError("Impossible de charger les examens.");
    } finally {
      setLoading(false);
    }
  };

  chargerExamens();
}, []);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-gray-900">
              📅 Calendrier des examens
            </h1>
            <div className="flex gap-3">
              <button
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition"
                onClick={() => window.location.reload()}
                title="Aujourd’hui"
              >
                <CalendarDays className="w-4 h-4" />
                Aujourd’hui
              </button>
            </div>
          </header>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <p className="mt-2 text-gray-600">Chargement des examens...</p>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 inline-block px-4 py-2 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200 transition"
              >
                Réessayer
              </button>
            </div>
          ) : exams.length === 0 ? (
            <div className="text-center text-gray-500 border border-dashed border-gray-300 rounded-lg p-10 bg-white">
              Aucun examen trouvé. Planifiez-en un pour commencer !
            </div>
          ) : (
            <div className="rounded-xl shadow border border-gray-200 bg-white">
              <ExamCalendar events={exams} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}