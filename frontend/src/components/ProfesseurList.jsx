import { useState, useEffect } from 'react'
import ProfesseurForm from './ProfesseurForm'

const API_BASE = 'http://localhost:5000/api'

const ProfesseurList = () => {
  const [professeurs, setProfesseurs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    loadProfesseurs()
  }, [])

  const loadProfesseurs = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE}/professeurs-crud`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setProfesseurs(data)
    } catch {
      setError('Erreur lors du chargement des professeurs')
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
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE}/professeurs-crud/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (!response.ok) throw new Error('Failed to delete professeur')
      loadProfesseurs()
    } catch {
      setError('Erreur lors de la suppression')
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingId(null)
    loadProfesseurs()
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setEditingId(null)
  }

  if (showForm) {
    return (
      <div className="admin-section">
        <ProfesseurForm
          professeurId={editingId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    )
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Gestion des Professeurs</h2>
        <button onClick={handleCreate} className="btn-primary">
          + Nouveau professeur
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
                <th>Spécialité</th>
                <th>Grade</th>
                <th>Département</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {professeurs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    Aucun professeur trouvé
                  </td>
                </tr>
              ) : (
                professeurs.map((professeur) => (
                  <tr key={professeur.id}>
                    <td>{professeur.nom}</td>
                    <td>{professeur.prenom}</td>
                    <td>{professeur.email}</td>
                    <td>{professeur.specialite || '-'}</td>
                    <td>{professeur.grade || '-'}</td>
                    <td>{professeur.departement || '-'}</td>
                    <td className="actions-cell">
                      <button
                        onClick={() => handleEdit(professeur.id)}
                        className="btn-action btn-edit"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(professeur.id)}
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

export default ProfesseurList
