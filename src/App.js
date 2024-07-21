
import './App.css'
import Auth from './pages/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Home from './pages/Home'
import Inbox from './pages/Inbox';
import { AuthContext } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import EventPage from './components/Events/Event';



function App() {

  return (
    <Router>

      <Routes>
        <Route path='/' Component={Auth} />
        <Route path='/signup' Component={SignUp} />
        <Route path='/home' Component={Home} />
        <Route path='/inbox' Component={Inbox} />
        <Route path='/profile' Component={ProfilePage} />
        <Route path='/events' Component={EventPage} />
      </Routes>


    </Router>
  );
}

export default App;
