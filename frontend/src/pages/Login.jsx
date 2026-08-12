import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Email ou mot de passe incorrect')
        return
      }

      login(data.utilisateur, data.token)
      
      // Redirection selon le rôle
      if (data.utilisateur.role === 'professeur') {
        navigate('/dashboard-professeur')
      } else if (data.utilisateur.role === 'administrateur') {
        navigate('/administration')
      } else {
        navigate('/')
      }
    } catch {
      setError('Erreur de connexion au serveur')
    }
  }

  return (
    <div className="login-card">
          {/* Titre du formulaire */}
          <h2 className="login-title">Connexion</h2>
          
          {/* Message d'erreur */}
          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="admin@lacose.tg"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="form-submit"
            >
              Se connecter
            </button>
            <p>Vous n'avez pas de compte ? <a href="/register" style={{color: '#667eea', textDecoration: 'none'}}>S'inscrire</a></p>
          </form>
        </div>
  )
}

export default Login
