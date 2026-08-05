import { useState, useEffect } from 'react'
import partenaireService from '../services/partenaireService'
import PartenaireForm from './PartenaireForm'

const PartenaireList = () => {
  const [partenaires, setPartenaires] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadPartenaires()
  }, [])

  const loadPartenaires = async () => {
    try {
      setLoading(true)
      const data = await partenaireService.getAll()
      setPartenaires(data)
    } catch (err) {
      setError('Erreur lors du chargement des partenaires')
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
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      return
    }

    try {
      await partenaireService.delete(id)
      loadPartenaires()
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingId(null)
    loadPartenaires()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingId(null)
  }

  if (showForm) {
    return (
      <div className="admin-section">
        <PartenaireForm
          partenaireId={editingId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    )
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Gestion des Partenaires</h2>
        <button onClick={handleCreate} className="btn-primary">
          + Nouveau partenaire
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
                <th>Prénom</th>
                <th>Email</th>
                <th>Entreprise</th>
                <th>Type partenariat</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partenaires.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    Aucun partenaire trouvé
                  </td>
                </tr>
              ) : (
                partenaires.map((partenaire) => (
                  <tr key={partenaire.id}>
                    <td>{partenaire.nom}</td>
                    <td>{partenaire.prenom}</td>
                    <td>{partenaire.email}</td>
                    <td>{partenaire.nom_entreprise || '-'}</td>
                    <td>
                      <span className={`badge ${partenaire.type_partenariat}`}>
                        {partenaire.type_partenariat || '-'}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(partenaire.id)}
                        className="btn-action btn-edit"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(partenaire.id)}
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

export default PartenaireList
