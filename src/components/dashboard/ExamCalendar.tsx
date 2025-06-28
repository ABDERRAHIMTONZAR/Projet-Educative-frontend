import { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Initialize localizer
const localizer = momentLocalizer(moment);

type ExamEvent = {
  id: string;
  title: string;
  start: string; // from API
  end: string;
  allDay: boolean;
};


const ExamCalendar = ({ events }: { events: ExamEvent[] }) => {
  // Set French locale when component mounts
  useEffect(() => {
    moment.locale('fr');
    
    // Optional: Debugging logs
    console.log('Current locale:', moment.locale()); // Should output "fr"
    console.log('Sample day:', moment().format('dddd')); // Should be in French
  }, []);

  const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: "Aujourd'hui",
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    noEventsInRange: "Aucun examen dans cette période.",
    showMore: (total: number) => `+ ${total} de plus`,
  };

  const formats = {
    dayFormat: 'dddd', // Full day name (Lundi, Mardi...)
    weekdayFormat: 'dddd', // Day headers (L, M, M...)
    monthHeaderFormat: 'MMMM YYYY', // Mois Année
    dayHeaderFormat: 'dddd DD MMMM', // Lundi 15 janvier
    timeGutterFormat: 'HH:mm', // 24h format
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      formats={formats}
      culture="fr" // Explicitly set culture
      style={{ height: 500 }}
    />
  );
};

export default ExamCalendar;