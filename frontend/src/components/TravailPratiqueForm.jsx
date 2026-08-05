import { useState, useEffect } from 'react'
import travailPratiqueService from '../services/travailPratiqueService'

const TravailPratiqueForm = ({ tpId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    laboratoire_id: '',
    professeur_id: '',
    date_debut: '',
    date_fin: '',
    statut: 'planifie'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (tpId) {
      loadTP()
    }
  }, [tpId])

  const loadTP = async () => {
    try {
      const tp = await travailPratiqueService.getById(tpId)
      setFormData({
        titre: tp.titre,
        description: tp.description || '',
        laboratoire_id: tp.laboratoire_id || '',
        professeur_id: tp.professeur_id || '',
        date_debut: tp.date_debut || '',
        date_fin: tp.date_fin || '',
        statut: tp.statut || 'planifie'
      })
    } catch (err) {
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
      if (tpId) {
        await travailPratiqueService.update(tpId, formData)
      } else {
        await travailPratiqueService.create(formData)
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
          <label className="form-label">Laboratoire ID</label>
          <input
            type="number"
            name="laboratoire_id"
            value={formData.laboratoire_id}
            onChange={handleChange}
            className="form-input"
            placeholder="ID du laboratoire"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Professeur ID</label>
          <input
            type="number"
            name="professeur_id"
            value={formData.professeur_id}
            onChange={handleChange}
            className="form-input"
            placeholder="ID du professeur responsable"
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
