import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import LegalNotice from './components/LegalNotice';
import TermsOfUse from './components/TermsOfUse';
import Dashboardensi from './components/dashboard/Dashboard';
import DashboardLegacy from './components/dashboard/Dashboard';
import CalendarPage from './components/dashboard/CalendarPage';
import ExamCalendar from './components/dashboard/CalendarExam';
import ForgetPassword from './components/Login/forgetPassword';
import ExamList from './components/dashboard/ExamListPage';	
import HomeworkListPage from './components/dashboard/HomeworkListPage';
import DashboardExam from './components/dashboard/DashboardExam';
import NotFound from './components/NotFound';

import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Assignments } from './pages/Assignments';
import { Exams } from './pages/Exams';
import { Students } from './pages/Students';
import { Teachers } from './pages/Teachers';
import { Statistics } from './pages/Statistics';
import { CreateAccounts } from './pages/CreateAccounts';

function DashboardApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const titles = {
      dashboard: 'Tableau de Bord',
      assignments: 'Devoirs',
      exams: 'Examens',
      students: 'Élèves',
      teachers: 'Enseignants',
      aiAlerts: 'Alertes IA',
      statistics: 'Statistiques'
    };
    
    document.title = `Evalya Smart - ${titles[currentPage as keyof typeof titles]}`;
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'assignments':
        return <Assignments />;
      case 'exams':
        return <Exams />;
      case 'students':
        return <Students />;
      case 'teachers':
        return <Teachers />;
      case 'statistics':
        return <Statistics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout onPageChange={setCurrentPage} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/LegalNotice" element={<LegalNotice />} />
        <Route path="/TermsOfUse" element={<TermsOfUse />} />
        <Route path="/Dashboard" element={<DashboardApp />} />
        <Route path='/ensignantsdashboard' element={<Dashboardensi />} />
        <Route path='/examcalendar' element={<ExamCalendar />} />
        <Route path="/LegacyDashboard" element={<DashboardLegacy />} />
        <Route path="/Calendar" element={<CalendarPage />} />
        <Route path="/HomeworkList" element={<HomeworkListPage />} />
        <Route path="/ExamList" element={<ExamList />} />
        <Route path="/DashboardExam" element={<DashboardExam />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/CreateAccounts" element={<CreateAccounts />} />
      </Routes>
    </Router>
  );
}

export default App;
