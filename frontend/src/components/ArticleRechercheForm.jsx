import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

const ArticleRechercheForm = ({ articleId, onSuccess, onCancel }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    titre: '',
    resume: '',
    contenu: '',
    auteur_id: user?.id || '',
    statut: 'brouillon'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (articleId) {
      loadArticle()
    }
  }, [articleId])

  const loadArticle = async () => {
    try {
      const response = await fetch(`${API_BASE}/publications/${articleId}`)
      const article = await response.json()
      setFormData({
        titre: article.titre,
        resume: article.resume || '',
        contenu: article.contenu || '',
        auteur_id: article.auteur_id || user?.id || '',
        statut: article.statut || 'brouillon'
      })
    } catch {
      setError('Erreur lors du chargement de l\'article')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const url = articleId ? `${API_BASE}/publications/${articleId}` : `${API_BASE}/publications`
      const method = articleId ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) throw new Error('Failed to save article')
      onSuccess()
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-form-container">
      <h2>{articleId ? 'Modifier la publication' : 'Nouvelle publication'}</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label className="form-label">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Résumé</label>
          <textarea
            name="resume"
            value={formData.resume}
            onChange={handleChange}
            className="form-input"
            rows="3"
            placeholder="Résumé de l'article..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contenu</label>
          <textarea
            name="contenu"
            value={formData.contenu}
            onChange={handleChange}
            className="form-input"
            rows="8"
            placeholder="Contenu complet de l'article..."
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Auteur</label>
          <input
            type="text"
            value={`${user?.prenom} ${user?.nom}`}
            className="form-input"
            disabled
          />
          <input
            type="hidden"
            name="auteur_id"
            value={formData.auteur_id}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Statut</label>
          <select
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            className="form-input"
          >
            <option value="brouillon">Brouillon</option>
            <option value="en_revision">En révision</option>
            <option value="publie">Publié</option>
            <option value="archive">Archivé</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={loading}
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : (articleId ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ArticleRechercheForm
