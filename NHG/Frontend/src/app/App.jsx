
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';

import '../App.css'
// Layout
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";

import HomePage from "../features/public/pages/HomePage";
import VisionPage from "../features/public/pages/About/Vision";
import OverviewPage from "../features/public/pages/About/Overview";
import HistoryPage from "../features/public/pages/About/History";
import LeadershipPage from "../features/public/pages/About/Leadership";
import ServicesPage from "../features/public/pages/ServicesPage";
import DoctorsPage from "../features/doctors/pages/DoctorsPage";
import DonatePage from "../features/public/pages/DonatePage";
import BookAppointmentPage from "../features/appointments/pages/BookAppointmentPage";
import ContactPage from '../features/public/pages/ContactPage';
import PublicationsPage from '../features/public/pages/PublicationsPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPassword';

import DashboardHome from '../features/dashboard/pages/DashboardHome';
import DoctorPage from '../features/doctors/pages/DoctorPage';
import ClinicPage from '../features/clinics/pages/ClinicPage';
import PatientPage from '../features/patients/pages/PatientPage';
import LabPage from '../features/labs/pages/LabPage';
import StaffAccountsPage from '../features/staff/pages/StaffAccountsPage';
import AppointmentRequestsPage from '../features/dashboard/pages/AppointmentRequestsPage';
import { getAuthData, hasRole, ROLE } from '../shared/utils/auth';
import CardiologyICU from '../features/clinical specialities/cardiologyicu';
import Surgery from '../features/clinical specialities/surgery';
import Laboratorypathology from '../features/clinical specialities/laboratorypathology';
import Maternitygynaecology from '../features/clinical specialities/Maternitygynaecology';
import Pediatricsneonatology from '../features/clinical specialities/Pediatricsneonatology';
import Radiologyimaging from '../features/clinical specialities/Radiologyimaging';

function ProtectedDashboard() {
  const authData = getAuthData();

  if (!authData) {
    return <Navigate to="/" replace />;
  }

  return <DashboardLayout />;
}

function RoleRoute({ allowedRoles, children }) {
  const authData = getAuthData();

  if (!authData) {
    return <Navigate to="/" replace />;
  }

  if (!hasRole(allowedRoles, authData.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {

  return (
    <>
      <Router>
        <Routes>
       
        <Route path="/" element={<HomePage />} />
        <Route path="/about/vision-mission" element={<VisionPage />} />
        <Route path="/about/overview" element={<OverviewPage />} />
        <Route path="/about/history" element={<HistoryPage />} />
        <Route path="/about/leadership" element={<LeadershipPage />} />

        <Route path="/services" element={<ServicesPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/departments/cardiology-icu" element= {<CardiologyICU/>}/>


        <Route path="/departments/surgery" element = {<Surgery/>}/>
        <Route path="/departments/laboratorypathology" element = {<Laboratorypathology/>}/>
        <Route path="/departments/maternitygynaecology" element = {<Maternitygynaecology/>}/>
        <Route path="/departments/pediatricsneonatology" element = {<Pediatricsneonatology/>}/>
        <Route path="/departments/radiologyimaging" element = {<Radiologyimaging/>}/>



        <Route path="/dashboard" element={<ProtectedDashboard />}>
          <Route index element={<DashboardHome />} />
          <Route
            path="doctors"
            element={
              <RoleRoute allowedRoles={[ROLE.ADMIN]}>
                <DoctorPage />
              </RoleRoute>
            }
          />
          <Route
            path="clinics"
            element={
              <RoleRoute allowedRoles={[ROLE.CONSULTANT, ROLE.DOCTOR, ROLE.PATIENT]}>
                <ClinicPage />
              </RoleRoute>
            }
          />
          <Route
            path="patients"
            element={
              <RoleRoute allowedRoles={[ROLE.ADMIN, ROLE.DOCTOR]}>
                <PatientPage />
              </RoleRoute>
            }
          />
          <Route
            path="staff"
            element={
              <RoleRoute allowedRoles={[ROLE.ADMIN]}>
                <StaffAccountsPage />
              </RoleRoute>
            }
          />
          <Route
            path="labs"
            element={
              <RoleRoute allowedRoles={[ROLE.ADMIN, ROLE.LAB, ROLE.PATIENT]}>
                <LabPage />
              </RoleRoute>
            }
          />
          <Route
            path="appointment-requests"
            element={
              <RoleRoute allowedRoles={[ROLE.CONSULTANT, ROLE.PATIENT]}>
                <AppointmentRequestsPage />
              </RoleRoute>
            }
          />
        </Route>

      </Routes>
      </Router>
    </>
  )
}

export default App
