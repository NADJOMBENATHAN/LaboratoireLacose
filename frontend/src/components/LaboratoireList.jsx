import { useState, useEffect } from 'react'
import laboratoireService from '../services/laboratoireService'
import LaboratoireForm from './LaboratoireForm'

const LaboratoireList = () => {
  const [laboratoires, setLaboratoires] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadLaboratoires()
  }, [])

  const loadLaboratoires = async () => {
    try {
      setLoading(true)
      const data = await laboratoireService.getAll()
      setLaboratoires(data)
    } catch (err) {
      setError('Erreur lors du chargement des laboratoires')
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
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce laboratoire ?')) {
      return
    }

    try {
      await laboratoireService.delete(id)
      loadLaboratoires()
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingId(null)
    loadLaboratoires()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingId(null)
  }

  if (showForm) {
    return (
      <div className="admin-section">
        <LaboratoireForm
          laboratoireId={editingId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    )
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Gestion des Laboratoires</h2>
        <button onClick={handleCreate} className="btn-primary">
          + Nouveau laboratoire
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
                <th>Nom</th>
                <th>Description</th>
                <th>Localisation</th>
                <th>Capacité</th>
                <th>Responsable ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {laboratoires.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Aucun laboratoire trouvé
                  </td>
                </tr>
              ) : (
                laboratoires.map((laboratoire) => (
                  <tr key={laboratoire.id}>
                    <td>{laboratoire.nom}</td>
                    <td>{laboratoire.description ? laboratoire.description.substring(0, 50) + '...' : '-'}</td>
                    <td>{laboratoire.localisation || '-'}</td>
                    <td>{laboratoire.capacite || '-'}</td>
                    <td>{laboratoire.responsable_id || '-'}</td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(laboratoire.id)}
                        className="btn-action btn-edit"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(laboratoire.id)}
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

export default LaboratoireList
