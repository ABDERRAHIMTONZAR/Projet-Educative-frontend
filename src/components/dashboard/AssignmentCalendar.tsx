import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export type AssignmentEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

const AssignmentCalendar = ({ events }: { events: AssignmentEvent[] }) => {
  moment.locale('fr');

  const messages = {
    allDay: 'Toute la journée',
    previous: 'Précédent',
    next: 'Suivant',
    today: "Aujourd’hui",
    month: 'Mois',
    week: 'Semaine',
    day: 'Jour',
    agenda: 'Agenda',
    date: 'Date',
    time: 'Heure',
    event: 'Événement',
    noEventsInRange: "Aucun devoir dans cette période.",
    showMore: (total: number) => `+ ${total} de plus`,
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      messages={messages}
      culture="fr"
      style={{ height: 500 }}
    />
  );
};

export default AssignmentCalendar;
