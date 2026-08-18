import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Administration from './pages/Administration'
import DashboardProfesseur from './pages/DashboardProfesseur'
import LandingPage from './pages/LandingPage'
import ArticleDetail from './pages/ArticleDetail'
import PrivateRoute from './components/PrivateRoute'
import './App.css'

function App() {
  const location = useLocation()
  const isDashboard = location.pathname === '/dashboard-professeur'
  const isLanding = location.pathname === '/'
  const isArticle = location.pathname.startsWith('/article')

  return (
    <main className={`app-main ${isDashboard || isLanding || isArticle ? 'full-width' : ''}`}>
        <div className={`main-content ${isLanding || isArticle ? 'no-padding' : ''}`}>
          <Routes>
            {/* Route Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Route Login */}
            <Route path="/login" element={<Login />} />
            
            {/* Route Register */}
            <Route path="/register" element={<Register />} />
            
            {/* Route Article Detail protégée */}
            <Route path="/article/:id" element={
              <PrivateRoute>
                <ArticleDetail />
              </PrivateRoute>
            } />
            
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
