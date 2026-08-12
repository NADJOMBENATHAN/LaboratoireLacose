import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:5000/api'

const ProfesseurForm = ({ professeurId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    specialite: '',
    grade: '',
    departement: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (professeurId) {
      loadProfesseur()
    }
  }, [professeurId])

  const loadProfesseur = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE}/professeurs-crud/${professeurId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const professeur = await response.json()
      setFormData({
        nom: professeur.nom,
        prenom: professeur.prenom,
        email: professeur.email,
        mot_de_passe: '',
        specialite: professeur.specialite || '',
        grade: professeur.grade || '',
        departement: professeur.departement || ''
      })
    } catch {
      setError('Erreur lors du chargement du professeur')
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
      if (professeurId && !dataToSubmit.mot_de_passe) {
        delete dataToSubmit.mot_de_passe
      }

      const url = professeurId ? `${API_BASE}/professeurs-crud/${professeurId}` : `${API_BASE}/professeurs-crud`
      const method = professeurId ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dataToSubmit)
      })
      if (!response.ok) throw new Error('Failed to save professeur')
      onSuccess()
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-form-container">
      <h2>{professeurId ? 'Modifier le professeur' : 'Nouveau professeur'}</h2>
      
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
            Mot de passe {professeurId && '(laisser vide pour ne pas changer)'}
          </label>
          <input
            type="password"
            name="mot_de_passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            className="form-input"
            required={!professeurId}
            minLength={6}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Spécialité</label>
          <input
            type="text"
            name="specialite"
            value={formData.specialite}
            onChange={handleChange}
            className="form-input"
            placeholder="Ex: Chimie Organique, Physique"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Grade</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Sélectionner...</option>
            <option value="Professeur">Professeur</option>
            <option value="Maître de conférences">Maître de conférences</option>
            <option value="Docteur">Docteur</option>
            <option value="Chercheur">Chercheur</option>
            <option value="Assistant">Assistant</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Département</label>
          <input
            type="text"
            name="departement"
            value={formData.departement}
            onChange={handleChange}
            className="form-input"
            placeholder="Ex: Chimie, Physique, Biologie"
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
            {loading ? 'Enregistrement...' : (professeurId ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfesseurForm
