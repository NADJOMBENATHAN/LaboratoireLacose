import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:5000/api'

const PartenaireForm = ({ partenaireId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    nom_entreprise: '',
    type_partenariat: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (partenaireId) {
      loadPartenaire()
    }
  }, [partenaireId])

  const loadPartenaire = async () => {
    try {
      const response = await fetch(`${API_BASE}/partenaires/${partenaireId}`)
      const partenaire = await response.json()
      setFormData({
        nom: partenaire.nom,
        prenom: partenaire.prenom,
        email: partenaire.email,
        mot_de_passe: '',
        nom_entreprise: partenaire.nom_entreprise || '',
        type_partenariat: partenaire.type_partenariat || ''
      })
    } catch {
      setError('Erreur lors du chargement du partenaire')
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
      const dataToSubmit = { ...formData }
      if (partenaireId && !dataToSubmit.mot_de_passe) {
        delete dataToSubmit.mot_de_passe
      }

      const url = partenaireId ? `${API_BASE}/partenaires/${partenaireId}` : `${API_BASE}/partenaires`
      const method = partenaireId ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSubmit)
      })
      if (!response.ok) throw new Error('Failed to save partenaire')
      onSuccess()
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-form-container">
      <h2>{partenaireId ? 'Modifier le partenaire' : 'Nouveau partenaire'}</h2>
      
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
          <label className="form-label">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Mot de passe {partenaireId && '(laisser vide pour ne pas changer)'}
          </label>
          <input
            type="password"
            name="mot_de_passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            className="form-input"
            required={!partenaireId}
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nom de l'entreprise</label>
          <input
            type="text"
            name="nom_entreprise"
            value={formData.nom_entreprise}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Type de partenariat</label>
          <select
            name="type_partenariat"
            value={formData.type_partenariat}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Sélectionner...</option>
            <option value="financement">Financement</option>
            <option value="recherche">Recherche</option>
            <option value="technologique">Technologique</option>
            <option value="académique">Académique</option>
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
            {loading ? 'Enregistrement...' : (partenaireId ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PartenaireForm
