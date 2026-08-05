const API_BASE_URL = 'http://localhost:5000/api';

const administrateurService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/administrateurs`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des administrateurs');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/administrateurs/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération de l\'administrateur');
    return response.json();
  },

  async getByNiveau(niveau) {
    const response = await fetch(`${API_BASE_URL}/administrateurs/niveau/${niveau}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des administrateurs');
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE_URL}/administrateurs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création de l\'administrateur');
    return response.json();
  },

  async update(id, data) {
    const response = await fetch(`${API_BASE_URL}/administrateurs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'administrateur');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/administrateurs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de l\'administrateur');
    return response.json();
  },
};

export default administrateurService;
