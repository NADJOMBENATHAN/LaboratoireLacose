import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Administration from './pages/Administration'
import PrivateRoute from './components/PrivateRoute'
import { useAuth } from './context/AuthContext'
import './App.css'

function App() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <div className="app-container">
      {/* Header - pas affiché sur les pages d'authentification */}
      {!isAuthPage && (
        <header className="app-header">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="logo-text">LaCOSE</h1>
            </div>
          </div>
        </header>
      )}
      
      {/* Main Content */}
      <main className="app-main">
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
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
