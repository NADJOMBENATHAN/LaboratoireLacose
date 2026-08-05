import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import React from 'react'
import AdminList from '../components/AdminList'
import EtudiantList from '../components/EtudiantList'
import ProfesseurList from '../components/ProfesseurList'
import PartenaireList from '../components/PartenaireList'
import LaboratoireList from '../components/LaboratoireList'
import TravailPratiqueList from '../components/TravailPratiqueList'
import ArticleRechercheList from '../components/ArticleRechercheList'

const Administration = () => {
  const { logout } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarExpanded, setSidebarExpanded] = useState(false)

  const sidebarItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'administrateurs', label: 'Administrateurs', icon: '👤' },
    { id: 'etudiants', label: 'Étudiants', icon: '🎓' },
    { id: 'professeurs', label: 'Professeurs', icon: '👨' },
    { id: 'partenaires', label: 'Partenaires', icon: '🤝' },
    { id: 'laboratoires', label: 'Laboratoires', icon: '🔬' },
    { id: 'projets', label: 'Projets', icon: '📁' },
    { id: 'publications', label: 'Publications', icon: '📚' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' },
  ]

  return (
    <React.Fragment>
      
      {/* Main Content with Sidebar */}
      <main className={`admin-main ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
        {/* Sidebar Navigation */}
        <aside className={`admin-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
          >
            {sidebarExpanded ? '✕' : '☰'}
          </button>
          <nav className="sidebar-nav">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`sidebar-item ${activeSection === item.id ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                {sidebarExpanded && <span className="sidebar-label">{item.label}</span>}
             </button>
            ))}
          </nav>
        </aside>

          {/* Section Dashboard */}
          {activeSection === 'dashboard' && (
            <section className="dashboard-section">
              <div className="dashboard-card">
                <h2 className="dashboard-title">Tableau de bord</h2>
                <div className="dashboard-content">
                  <p className="dashboard-text">
                    Bienvenue dans le panneau d'administration du LaCOSE.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Section Administrateurs */}
          {activeSection === 'administrateurs' && (
            <AdminList />
          )}

          {/* Section Étudiants */}
          {activeSection === 'etudiants' && (
            <EtudiantList />
          )}

          {/* Section Professeurs */}
          {activeSection === 'professeurs' && (
            <ProfesseurList />
          )}

          {/* Section Partenaires */}
          {activeSection === 'partenaires' && (
            <PartenaireList />
          )}

          {/* Section Laboratoires */}
          {activeSection === 'laboratoires' && (
            <LaboratoireList />
          )}

          {/* Section Projets */}
          {activeSection === 'projets' && (
            <TravailPratiqueList />
          )}

          {/* Section Publications */}
          {activeSection === 'publications' && (
            <ArticleRechercheList />
          )}
      </main>
    </React.Fragment>
  )
}

export default Administration
