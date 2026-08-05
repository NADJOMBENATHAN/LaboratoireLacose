import { useState, useEffect } from 'react'
import laboratoireService from '../services/laboratoireService'

const LaboratoireForm = ({ laboratoireId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    responsable_id: '',
    localisation: '',
    capacite: '',
    equipements: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (laboratoireId) {
      loadLaboratoire()
    }
  }, [laboratoireId])

  const loadLaboratoire = async () => {
    try {
      const laboratoire = await laboratoireService.getById(laboratoireId)
      setFormData({
        nom: laboratoire.nom,
        description: laboratoire.description || '',
        responsable_id: laboratoire.responsable_id || '',
        localisation: laboratoire.localisation || '',
        capacite: laboratoire.capacite || '',
        equipements: laboratoire.equipements || ''
      })
    } catch (err) {
      setError('Erreur lors du chargement du laboratoire')
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
      const dataToSubmit = {
        ...formData,
        capacite: formData.capacite ? parseInt(formData.capacite) : null
      }

      if (laboratoireId) {
        await laboratoireService.update(laboratoireId, dataToSubmit)
      } else {
        await laboratoireService.create(dataToSubmit)
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
      <h2>{laboratoireId ? 'Modifier le laboratoire' : 'Nouveau laboratoire'}</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label className="form-label">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
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
            placeholder="Description du laboratoire..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Responsable ID</label>
          <input
            type="number"
            name="responsable_id"
            value={formData.responsable_id}
            onChange={handleChange}
            className="form-input"
            placeholder="ID du responsable"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Localisation</label>
          <input
            type="text"
            name="localisation"
            value={formData.localisation}
            onChange={handleChange}
            className="form-input"
            placeholder="Ex: Bâtiment A, Salle 101"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Capacité</label>
          <input
            type="number"
            name="capacite"
            value={formData.capacite}
            onChange={handleChange}
            className="form-input"
            placeholder="Nombre de places"
            min="1"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Équipements</label>
          <textarea
            name="equipements"
            value={formData.equipements}
            onChange={handleChange}
            className="form-input"
            rows="3"
            placeholder="Liste des équipements disponibles..."
          />
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
            {loading ? 'Enregistrement...' : (laboratoireId ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default LaboratoireForm
