
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import './App.css'
import HomePage from "./Pages/home";
import LoginPage from "./Pages/Auth/Login";
import RegisterPage from "./Pages/Auth/Register";
import VisionPage from "./Pages/About/Vision";
import OverviewPage from "./Pages/About/Overview";
import HistoryPage from "./Pages/About/History";
import LeadershipPage from "./Pages/About/Leadership";
import ServicesPage from "./Pages/Services";
import DoctorsPage from "./Pages/Doctors";
import DonatePage from "./Pages/Donate";
import BookAppointmentPage from "./Pages/BookAppoinment";
import ContactPage from './Pages/Contact';
import PublicationsPage from './Pages/Publications';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signin' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          
          <Route path= '/about/vision-mission' element={<VisionPage/>} />
           <Route path= '/about/overview' element={<OverviewPage/>} />
           <Route path='/about/history' element={<HistoryPage/>} />
           <Route path='/about/leadership' element={<LeadershipPage/>} />
           <Route path='/doctors' element={<DoctorsPage/>} />
           <Route path='/Donate' element={<DonatePage/>} />
           <Route path='/services' element={<ServicesPage/>} />
           <Route path='/book-appointment' element={<BookAppointmentPage/>} />
           <Route path='/publications' element={<PublicationsPage/>} />
           <Route path='/contact' element={<ContactPage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
