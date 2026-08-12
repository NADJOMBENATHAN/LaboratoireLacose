import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const API_BASE = 'http://localhost:5000/api'

const EvaluationForm = ({ soumissionId, onSuccess, onCancel }) => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    note: '',
    commentaire: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Validation de la note (0-20)
    if (name === 'note') {
      const numValue = parseFloat(value)
      if (value !== '' && (numValue < 0 || numValue > 20)) {
        setError('La note doit être entre 0 et 20')
        return
      }
    }
    
    setError('')
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const evaluationData = {
        ...formData,
        note: parseFloat(formData.note),
        soumission_id: soumissionId,
        professeur_id: user?.id
      }
      
      const response = await fetch(`${API_BASE}/evaluations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(evaluationData)
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.errors ? errorData.errors.map(e => e.msg).join(', ') : errorData.message || 'Failed to create evaluation')
      }
      onSuccess()
    } catch (err) {
      setError(err.message || 'Erreur lors de l\'enregistrement de l\'évaluation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="evaluation-form-container">
      <h2>Évaluer la soumission</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="evaluation-form">
        <div className="form-group">
          <label className="form-label">Note (/20)</label>
          <input
            type="number"
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="form-input"
            min="0"
            max="20"
            step="0.5"
            required
            placeholder="Ex: 15.5"
          />
          <small className="form-hint">La note doit être entre 0 et 20</small>
        </div>

        <div className="form-group">
          <label className="form-label">Commentaire</label>
          <textarea
            name="commentaire"
            value={formData.commentaire}
            onChange={handleChange}
            className="form-input"
            rows="5"
            placeholder="Ajoutez vos commentaires et observations sur cette soumission..."
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
            disabled={loading || !formData.note}
          >
            {loading ? 'Enregistrement...' : 'Soumettre l\'évaluation'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EvaluationForm
