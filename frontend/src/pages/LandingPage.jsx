import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './LandingPage.css'

const API_BASE = 'http://localhost:5000/api'

const LandingPage = () => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('hero')
  const [publications, setPublications] = useState([])
  const [loadingPublications, setLoadingPublications] = useState(true)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const response = await fetch(`${API_BASE}/articles-recherche`)
        const data = await response.json()
        // Prendre les 3 publications les plus récentes
        setPublications(data.slice(0, 3))
      } catch (error) {
        console.error('Erreur lors du chargement des publications:', error)
      } finally {
        setLoadingPublications(false)
      }
    }

    loadPublications()
  }, [])

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <h1>LaCOSE</h1>
            <span>Laboratoire de Chimie Organique et des Sciences Environnementales</span>
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('news')} className="nav-link">Actualités</button>
            <button onClick={() => scrollToSection('features')} className="nav-link">Fonctionnalités</button>
            <button onClick={() => scrollToSection('about')} className="nav-link">À propos</button>
            <button onClick={() => navigate('/login')} className="nav-cta">Connexion</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Bienvenue au LaCOSE</h1>
            <h2 className="hero-subtitle">Laboratoire de Chimie Organique et des Sciences Environnementales</h2>
            <p className="hero-description">
              Un espace collaboratif pour la recherche, l'innovation et l'excellence en chimie organique et sciences environnementales. 
              Notre laboratoire facilite la gestion des travaux pratiques, des publications scientifiques et des partenariats industriels.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/login')} className="btn-primary btn-large">
                Se connecter
              </button>
              <button onClick={() => scrollToSection('about')} className="btn-secondary btn-large">
                En savoir plus
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-icon">🔬</div>
              <h3>Recherche</h3>
              <p>Innovation scientifique</p>
            </div>
            <div className="hero-card">
              <div className="hero-icon">📚</div>
              <h3>Éducation</h3>
              <p>Travaux pratiques</p>
            </div>
            <div className="hero-card">
              <div className="hero-icon">🤝</div>
              <h3>Partenariat</h3>
              <p>Collaboration industrielle</p>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="news-section">
        <div className="section-container">
          <h2 className="section-title">Actualités</h2>
         
          
          {loadingPublications ? (
            <div className="news-loading">Chargement des publications...</div>
          ) : publications.length > 0 ? (
            <div className="news-grid">
              {publications.map((pub) => (
                <div key={pub.id} className="news-card">
                  <div className="news-date">
                    {pub.date_publication ? new Date(pub.date_publication).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'Date non définie'}
                  </div>
                  <h3 className="news-title">{pub.titre}</h3>
                  <p className="news-author">
                    {pub.auteurs || 'Auteurs non spécifiés'}
                  </p>
                  <div className="news-summary">
                    {pub.resume ? pub.resume.substring(0, 150) + '...' : 'Résumé non disponible'}
                  </div>
                  <button onClick={() => navigate(`/article/${pub.id}`)} className="news-read-more">
                    Lire la suite →
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="news-empty">
              <p>Aucune publication récente pour le moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Nos fonctionnalités</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Gestion des Travaux Pratiques</h3>
              <p>Créez et gérez facilement les travaux pratiques pour vos étudiants avec un suivi complet des soumissions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Évaluations</h3>
              <p>Évaluez les soumissions des étudiants avec un système de notation structuré et des commentaires détaillés.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📄</div>
              <h3>Publications</h3>
              <p>Partagez et gérez vos articles de recherche avec un workflow de publication complet.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3>Laboratoires</h3>
              <p>Organisez vos laboratoires de recherche et gérez les équipes de professeurs et de chercheurs.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Étudiants</h3>
              <p>Suivez la progression des étudiants et gérez leurs inscriptions aux travaux pratiques.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Partenariats</h3>
              <p>Développez des collaborations avec des partenaires industriels pour des projets innovants.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">À propos du LaCOSE</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Le Laboratoire de Chimie Organique et des Sciences Environnementales (LaCOSE) est un centre d'excellence dédié 
                à la recherche et à l'enseignement en chimie organique et sciences environnementales. Notre mission est de favoriser l'innovation 
                scientifique et de former les futures générations de chercheurs et d'ingénieurs.
              </p>
              <p>
                Notre plateforme permet une gestion efficace des travaux pratiques, le suivi des publications 
                scientifiques, et la coordination des partenariats avec l'industrie. Nous croyons en la 
                collaboration entre étudiants, professeurs et partenaires industriels pour créer un écosystème 
                d'apprentissage dynamique.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Projets</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Étudiants</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Professeurs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Partenaires</div>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="about-visual">
                <div className="visual-circle"></div>
                <div className="visual-circle"></div>
                <div className="visual-circle"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>LaCOSE</h4>
            <p>Laboratoire de Chimie Organique et des Sciences Environnementales</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📍 Campus Universitaire, Bâtiment Sciences</p>
            <p>📧 contact@lacose.edu</p>
            <p>📞 +33 1 23 45 67 89</p>
          </div>
          <div className="footer-section">
            <h4>Légal</h4>
            <button>Conditions d'utilisation</button>
            <button>Politique de confidentialité</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 LaCOSE. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
