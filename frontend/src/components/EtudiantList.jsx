import { useState, useEffect } from 'react'

const API_BASE = 'http://localhost:5000/api'

const EtudiantList = () => {
  const [etudiants, setEtudiants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEtudiants()
  }, [])

  const loadEtudiants = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE}/etudiants-crud`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setEtudiants(data)
    } catch {
      setError('Erreur lors du chargement des étudiants')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Liste des Étudiants</h2>
        <p className="section-subtitle">Les étudiants s'inscrivent via la page d'inscription</p>
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
                <th>Numéro étudiant</th>
                <th>Niveau</th>
                <th>Filière</th>
                <th>Date création</th>
              </tr>
            </thead>
            <tbody>
              {etudiants.length === 0 ? (
                <tr>
                  <td colSpan="7" className="no-data">
                    Aucun étudiant trouvé
                  </td>
                </tr>
              ) : (
                etudiants.map((etudiant) => (
                  <tr key={etudiant.id}>
                    <td>{etudiant.nom}</td>
                    <td>{etudiant.prenom}</td>
                    <td>{etudiant.email}</td>
                    <td>{etudiant.numero_etudiant || '-'}</td>
                    <td>{etudiant.niveau_etude || '-'}</td>
                    <td>{etudiant.filiere || '-'}</td>
                    <td>
                      {etudiant.date_creation 
                        ? new Date(etudiant.date_creation).toLocaleDateString('fr-FR')
                        : '-'
                      }
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

export default EtudiantList
