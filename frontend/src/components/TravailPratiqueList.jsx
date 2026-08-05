import { useState, useEffect } from 'react'
import travailPratiqueService from '../services/travailPratiqueService'
import TravailPratiqueForm from './TravailPratiqueForm'

const TravailPratiqueList = () => {
  const [tps, setTps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadTPs()
  }, [])

  const loadTPs = async () => {
    try {
      setLoading(true)
      const data = await travailPratiqueService.getAll()
      setTps(data)
    } catch (err) {
      setError('Erreur lors du chargement des projets')
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
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      return
    }

    try {
      await travailPratiqueService.delete(id)
      loadTPs()
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingId(null)
    loadTPs()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingId(null)
  }

  if (showForm) {
    return (
      <div className="admin-section">
        <TravailPratiqueForm
          tpId={editingId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    )
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Gestion des Projets</h2>
        <button onClick={handleCreate} className="btn-primary">
          + Nouveau projet
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
                <th>Description</th>
                <th>Laboratoire ID</th>
                <th>Professeur ID</th>
                <th>Date début</th>
                <th>Date fin</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tps.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    Aucun projet trouvé
                  </td>
                </tr>
              ) : (
                tps.map((tp) => (
                  <tr key={tp.id}>
                    <td>{tp.titre}</td>
                    <td>{tp.description ? tp.description.substring(0, 40) + '...' : '-'}</td>
                    <td>{tp.laboratoire_id || '-'}</td>
                    <td>{tp.professeur_id || '-'}</td>
                    <td>{tp.date_debut || '-'}</td>
                    <td>{tp.date_fin || '-'}</td>
                    <td>
                      <span className={`badge ${tp.statut}`}>
                        {tp.statut}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(tp.id)}
                        className="btn-action btn-edit"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(tp.id)}
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

export default TravailPratiqueList
