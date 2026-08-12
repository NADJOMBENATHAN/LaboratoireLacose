import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

const TravailPratiqueForm = ({ tpId, onSuccess, onCancel }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    laboratoire_id: '',
    professeur_id: user?.id || '',
    date_debut: '',
    date_fin: '',
    statut: 'planifie'
  })
  const [laboratoires, setLaboratoires] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadLaboratoires()
    if (tpId) {
      loadTP()
    }
  }, [tpId])

  const loadLaboratoires = async () => {
    try {
      const response = await fetch(`${API_BASE}/laboratoires`)
      const data = await response.json()
      setLaboratoires(data)
    } catch (err) {
      console.error('Erreur lors du chargement des laboratoires:', err)
    }
  }

  const loadTP = async () => {
    try {
      const response = await fetch(`${API_BASE}/projets/${tpId}`)
      const tp = await response.json()
      setFormData({
        titre: tp.titre,
        description: tp.description || '',
        laboratoire_id: tp.laboratoire_id || '',
        professeur_id: tp.professeur_id || user?.id || '',
        date_debut: tp.date_debut || '',
        date_fin: tp.date_fin || '',
        statut: tp.statut || 'planifie'
      })
    } catch {
      setError('Erreur lors du chargement du travail pratique')
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
      const url = tpId ? `${API_BASE}/projets/${tpId}` : `${API_BASE}/projets`
      const method = tpId ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.errors ? errorData.errors.map(e => e.msg).join(', ') : 'Failed to save travail pratique')
      }
      onSuccess()
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-form-container">
      <h2>{tpId ? 'Modifier le projet' : 'Nouveau projet'}</h2>
      
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
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            rows="3"
            placeholder="Description du travail pratique..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Laboratoire</label>
          <select
            name="laboratoire_id"
            value={formData.laboratoire_id}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Sélectionner un laboratoire</option>
            {laboratoires.map(lab => (
              <option key={lab.id} value={lab.id}>{lab.nom}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Professeur responsable</label>
          <input
            type="text"
            name="professeur_id"
            value={`${user?.prenom} ${user?.nom}`}
            className="form-input"
            disabled
          />
          <input
            type="hidden"
            name="professeur_id"
            value={formData.professeur_id}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date de début</label>
          <input
            type="date"
            name="date_debut"
            value={formData.date_debut}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Date de fin</label>
          <input
            type="date"
            name="date_fin"
            value={formData.date_fin}
            onChange={handleChange}
            className="form-input"
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
            <option value="planifie">Planifié</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="annule">Annulé</option>
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
            {loading ? 'Enregistrement...' : (tpId ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TravailPratiqueForm
