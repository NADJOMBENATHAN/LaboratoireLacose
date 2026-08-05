import { useState, useEffect } from 'react'
import articleRechercheService from '../services/articleRechercheService'
import ArticleRechercheForm from './ArticleRechercheForm'

const ArticleRechercheList = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      setLoading(true)
      const data = await articleRechercheService.getAll()
      setArticles(data)
    } catch (err) {
      setError('Erreur lors du chargement des publications')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingId(null)
    setShowForm(true)
  }

  const handleEdit = (id) => {
    setEditingId(id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
      return
    }

    try {
      await articleRechercheService.delete(id)
      loadArticles()
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  const handlePublish = async (id) => {
    try {
      await articleRechercheService.publier(id)
      loadArticles()
    } catch (err) {
      setError('Erreur lors de la publication')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingId(null)
    loadArticles()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingId(null)
  }

  if (showForm) {
    return (
      <div className="admin-section">
        <ArticleRechercheForm
          articleId={editingId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    )
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Gestion des Publications</h2>
        <button onClick={handleCreate} className="btn-primary">
          + Nouvelle publication
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Résumé</th>
                <th>Auteur ID</th>
                <th>Date publication</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Aucune publication trouvée
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id}>
                    <td>{article.titre}</td>
                    <td>{article.resume ? article.resume.substring(0, 50) + '...' : '-'}</td>
                    <td>{article.auteur_id || '-'}</td>
                    <td>
                      {article.date_publication 
                        ? new Date(article.date_publication).toLocaleDateString('fr-FR')
                        : '-'
                      }
                    </td>
                    <td>
                      <span className={`badge ${article.statut}`}>
                        {article.statut}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(article.id)}
                        className="btn-action btn-edit"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      {article.statut !== 'publie' && (
                        <button
                          onClick={() => handlePublish(article.id)}
                          className="btn-action"
                          style={{ background: '#d1fae5', color: '#065f46' }}
                          title="Publier"
                        >
                          📤
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="btn-action btn-delete"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ArticleRechercheList
