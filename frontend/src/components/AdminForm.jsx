import { useState, useEffect } from 'react'
import administrateurService from '../services/administrateurService'

const AdminForm = ({ adminId, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    mot_de_passe: '',
    niveau_acces: 'standard'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (adminId) {
      loadAdmin()
    }
  }, [adminId])

  const loadAdmin = async () => {
    try {
      const admin = await administrateurService.getById(adminId)
      setFormData({
        nom: admin.nom,
        prenom: admin.prenom,
        email: admin.email,
        mot_de_passe: '',
        niveau_acces: admin.niveau_acces
      })
    } catch (err) {
      setError('Erreur lors du chargement de l\'administrateur')
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
      const dataToSubmit = { ...formData }
      if (adminId && !dataToSubmit.mot_de_passe) {
        delete dataToSubmit.mot_de_passe
      }

      if (adminId) {
        await administrateurService.update(adminId, dataToSubmit)
      } else {
        await administrateurService.create(dataToSubmit)
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
      <h2>{adminId ? 'Modifier l\'administrateur' : 'Nouvel administrateur'}</h2>
      
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
            Mot de passe {adminId && '(laisser vide pour ne pas changer)'}
          </label>
          <input
            type="password"
            name="mot_de_passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            className="form-input"
            required={!adminId}
            minLength={6}

          />
        </div>

        <div className="form-group">
          <label className="form-label">Niveau d'accès</label>
          <select
            name="niveau_acces"
            value={formData.niveau_acces}
            onChange={handleChange}
            className="form-input"
          >
            <option value="standard">Standard</option>
            <option value="super">Super Admin</option>
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
            {loading ? 'Enregistrement...' : (adminId ? 'Modifier' : 'Créer')}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminForm
