import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import './ArticleDetail.css'

const API_BASE = 'http://localhost:5000/api'

const ArticleDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE}/articles-recherche/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if (!response.ok) {
          throw new Error('Article non trouvé')
        }
        
        const data = await response.json()
        setArticle(data)
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement de l\'article')
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [id])

  if (loading) {
    return (
      <div className="article-detail-container">
        <div className="article-loading">Chargement de l'article...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="article-detail-container">
        <div className="article-error">
          <p>{error}</p>
          <button onClick={() => navigate('/')} className="btn-back">
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="article-detail-container">
        <div className="article-error">
          <p>Article non trouvé</p>
          <button onClick={() => navigate('/')} className="btn-back">
            Retour à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="article-detail-container">
      <div className="article-detail-content">
        <button onClick={() => navigate('/')} className="btn-back">
          ← Retour
        </button>
        
        <div className="article-header">
          <h1 className="article-title">{article.titre}</h1>
          <div className="article-meta">
            <div className="article-author">
              <span className="meta-label">Auteurs:</span>
              <span className="meta-value">{article.auteurs || 'Non spécifié'}</span>
            </div>
            <div className="article-date">
              <span className="meta-label">Date de publication:</span>
              <span className="meta-value">
                {article.date_publication ? new Date(article.date_publication).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : 'Non définie'}
              </span>
            </div>
            {article.journal && (
              <div className="article-journal">
                <span className="meta-label">Journal:</span>
                <span className="meta-value">{article.journal}</span>
              </div>
            )}
          </div>
        </div>

        <div className="article-body">
          {article.resume && (
            <div className="article-section">
              <h2 className="section-title">Résumé</h2>
              <p className="article-abstract">{article.resume}</p>
            </div>
          )}

          {article.contenu && (
            <div className="article-section">
              <h2 className="section-title">Contenu</h2>
              <div className="article-content-text">
                {article.contenu}
              </div>
            </div>
          )}

          {article.mots_cles && (
            <div className="article-section">
              <h2 className="section-title">Mots-clés</h2>
              <div className="article-keywords">
                {article.mots_cles.split(',').map((keyword, index) => (
                  <span key={index} className="keyword-tag">{keyword.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {article.lien_pdf && (
            <div className="article-section">
              <h2 className="section-title">Document</h2>
              <a href={article.lien_pdf} target="_blank" rel="noopener noreferrer" className="btn-pdf">
                📄 Télécharger le PDF
              </a>
            </div>
          )}
        </div>

        <div className="article-footer">
          <p className="article-note">
            Article publié par le LaCOSE - Laboratoire de Chimie Organique et des Sciences Environnementales
          </p>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
