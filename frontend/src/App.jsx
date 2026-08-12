import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Administration from './pages/Administration'
import DashboardProfesseur from './pages/DashboardProfesseur'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

function App() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard-professeur'

  return (
    <main className={`app-main ${isDashboard ? 'full-width' : ''}`}>
        <div className="main-content">
          <Routes>
            {/* Route Accueil */}
            <Route path="/" element={
              <div className="home-section">
                <div className="home-content">
                  <h2 className="home-title">
                    Laboratoire de Chimie Organique et Sciences de l'Environnement
                  </h2>
                  <p className="home-subtitle">
                    Bienvenue sur le portail du LaCOSE
                  </p>
                  <div className="home-cta">
                    <Link 
                      to="/login" 
                      className="cta-button"
                    >
                      Se connecter
                    </Link>
                  </div>
                </div>
              </div>
            } />
            
            {/* Route Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Route Register */}
            <Route path="/register" element={<Register />} />
            
            {/* Route Administration protégée */}
            <Route path="/administration" element={
              <PrivateRoute>
                <Administration />
              </PrivateRoute>
            } />
            
            {/* Route Dashboard Professeur protégée */}
            <Route path="/dashboard-professeur" element={
              <PrivateRoute>
                <DashboardProfesseur />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </main>
  )
}

export default App
