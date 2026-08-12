import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import TravailPratiqueForm from '../components/TravailPratiqueForm'
import EvaluationForm from '../components/EvaluationForm'
import ArticleRechercheForm from '../components/ArticleRechercheForm'
import './DashboardProfesseur.css'

const API_BASE = 'http://localhost:5000/api'

const DashboardProfesseur = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [evaluatingId, setEvaluatingId] = useState(null)
  const [stats, setStats] = useState({
    totalTPs: 0,
    totalSoumissions: 0,
    totalArticles: 0,
    pendingEvaluations: 0
  })
  const [travauxPratiques, setTravauxPratiques] = useState([])
  const [soumissions, setSoumissions] = useState([])
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      // Charger les statistiques
      const [tpsResponse, articlesResponse, soumissionsResponse] = await Promise.all([
        fetch(`${API_BASE}/projets`),
        fetch(`${API_BASE}/publications`),
        fetch(`${API_BASE}/soumissions`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ])
      
      const tpsData = await tpsResponse.json()
      const articlesData = await articlesResponse.json()
      const soumissionsData = await soumissionsResponse.json()
      
      // Filtrer les TPs du professeur connecté
      const mesTPs = tpsData.filter(tp => tp.professeur_id === user.id)
      const mesArticles = articlesData.filter(art => art.auteur_id === user.id)
      
      // Filtrer les soumissions des TPs du professeur
      const mesTPIds = mesTPs.map(tp => tp.id)
      const mesSoumissions = soumissionsData.filter(soum => mesTPIds.includes(soum.travail_pratique_id))
      
      // Charger les détails des étudiants pour les soumissions
      const soumissionsWithEtudiants = await Promise.all(
        mesSoumissions.map(async (soum) => {
          const etudiantResponse = await fetch(`${API_BASE}/etudiants-crud/${soum.etudiant_id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          const etudiant = await etudiantResponse.json()
          return { ...soum, etudiant }
        })
      )
      
      setStats({
        totalTPs: mesTPs.length,
        totalSoumissions: mesSoumissions.length,
        totalArticles: mesArticles.length,
        pendingEvaluations: mesSoumissions.length
      })
      
      setTravauxPratiques(mesTPs)
      setArticles(mesArticles)
      setSoumissions(soumissionsWithEtudiants)
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user || user.role !== 'professeur') {
      navigate('/login')
      return
    }
    loadDashboardData()
  }, [user, navigate, loadDashboardData])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleCreateTP = () => {
    setEditingId(null)
    setShowForm('tp')
  }

  const handleEditTP = (id) => {
    setEditingId(id)
    setShowForm('tp')
  }

  const handleCreateArticle = () => {
    setEditingId(null)
    setShowForm('article')
  }

  const handleEditArticle = (id) => {
    setEditingId(id)
    setShowForm('article')
  }

  const handleEvaluate = (soumissionId) => {
    setEvaluatingId(soumissionId)
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingId(null)
    setEvaluatingId(null)
    loadDashboardData()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setEvaluatingId(null)
  }

  const renderOverview = () => (
    <div className="dashboard-overview">
      <h2>Vue d'ensemble</h2>
      
      {loading ? (
        <div className="loading">Chargement des statistiques...</div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-content">
                <h3>{stats.totalTPs}</h3>
                <p>Travaux Pratiques</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <h3>{stats.totalSoumissions}</h3>
                <p>Soumissions</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📄</div>
              <div className="stat-content">
                <h3>{stats.totalArticles}</h3>
                <p>Articles</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <h3>{stats.pendingEvaluations}</h3>
                <p>Évaluations en attente</p>
              </div>
            </div>
          </div>
          
          <div className="recent-activity">
            <h3>Activité récente</h3>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-date">Aujourd'hui</span>
                <p>Nouvelle soumission reçue pour le TP "Introduction à React"</p>
              </div>
              <div className="activity-item">
                <span className="activity-date">Hier</span>
                <p>Article de recherche "Machine Learning Applications" publié</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )

  const renderTravauxPratiques = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Mes Travaux Pratiques</h2>
        <button onClick={handleCreateTP} className="btn-primary">+ Nouveau TP</button>
      </div>
      
      {loading ? (
        <div className="loading">Chargement...</div>
      ) : travauxPratiques.length === 0 ? (
        <div className="no-data">
          <p>Aucun travail pratique trouvé</p>
        </div>
      ) : (
        <div className="tp-list">
          {travauxPratiques.map(tp => (
            <div key={tp.id} className="tp-card">
              <h3>{tp.titre}</h3>
              <p className="tp-description">{tp.description}</p>
              <div className="tp-meta">
                <span className="tp-status">{tp.statut}</span>
                {tp.date_debut && <span className="tp-date">Début: {new Date(tp.date_debut).toLocaleDateString('fr-FR')}</span>}
              </div>
              <div className="tp-actions">
                <button onClick={() => handleEditTP(tp.id)} className="btn-secondary">Modifier</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderSoumissions = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Soumissions à évaluer</h2>
      </div>
      
      {loading ? (
        <div className="loading">Chargement...</div>
      ) : soumissions.length === 0 ? (
        <div className="no-data">
          <p>Aucune soumission à évaluer</p>
        </div>
      ) : (
        <div className="soumissions-list">
          {soumissions.map(soumission => (
            <div key={soumission.id} className="soumission-card">
              <div className="soumission-header">
                <h3>Soumission #{soumission.id}</h3>
                <span className="soumission-etudiant">
                  {soumission.etudiant?.prenom} {soumission.etudiant?.nom}
                </span>
              </div>
              <p className="soumission-content">{soumission.contenu}</p>
              <div className="soumission-meta">
                <span className="soumission-date">
                  {soumission.date_soumission 
                    ? new Date(soumission.date_soumission).toLocaleDateString('fr-FR')
                    : 'Date non disponible'
                  }
                </span>
              </div>
              <div className="soumission-actions">
                <button onClick={() => handleEvaluate(soumission.id)} className="btn-primary">Évaluer</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderArticles = () => (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Mes Articles de Recherche</h2>
        <button onClick={handleCreateArticle} className="btn-primary">+ Nouvel article</button>
      </div>
      
      {loading ? (
        <div className="loading">Chargement...</div>
      ) : articles.length === 0 ? (
        <div className="no-data">
          <p>Aucun article de recherche trouvé</p>
        </div>
      ) : (
        <div className="articles-list">
          {articles.map(article => (
            <div key={article.id} className="article-card">
              <h3>{article.titre}</h3>
              <p className="article-resume">{article.resume}</p>
              <div className="article-meta">
                <span className="article-status">{article.statut}</span>
                {article.date_publication && (
                  <span className="article-date">
                    Publié: {new Date(article.date_publication).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>
              <div className="article-actions">
                <button onClick={() => handleEditArticle(article.id)} className="btn-secondary">Modifier</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="dashboard-professeur">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          <p className="user-info">{user?.prenom} {user?.nom}</p>
          <p className="user-role">Professeur</p>
        </div>
        
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="nav-icon">📊</span>
            Vue d'ensemble
          </button>
          
          <button
            className={`nav-item ${activeTab === 'tps' ? 'active' : ''}`}
            onClick={() => setActiveTab('tps')}
          >
            <span className="nav-icon">📚</span>
            Travaux Pratiques
          </button>
          
          <button
            className={`nav-item ${activeTab === 'soumissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('soumissions')}
          >
            <span className="nav-icon">📝</span>
            Soumissions
          </button>
          
          <button
            className={`nav-item ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            <span className="nav-icon">📄</span>
            Articles
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button className="nav-item nav-logout" onClick={handleLogout}>
            <span className="nav-icon">🚪</span>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {showForm === 'tp' && (
          <div className="dashboard-section">
            <TravailPratiqueForm
              tpId={editingId}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        )}
        
        {showForm === 'article' && (
          <div className="dashboard-section">
            <ArticleRechercheForm
              articleId={editingId}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        )}
        
        {evaluatingId && (
          <div className="dashboard-section">
            <EvaluationForm
              soumissionId={evaluatingId}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        )}
        
        {!showForm && !evaluatingId && (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'tps' && renderTravauxPratiques()}
            {activeTab === 'soumissions' && renderSoumissions()}
            {activeTab === 'articles' && renderArticles()}
          </>
        )}
      </main>
    </div>
  )
}

export default DashboardProfesseur
