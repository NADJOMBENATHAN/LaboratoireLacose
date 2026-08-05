const API_BASE_URL = 'http://localhost:5000/api';

const articleRechercheService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/publications`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des publications');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/publications/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération de la publication');
    return response.json();
  },

  async getByStatut(statut) {
    const response = await fetch(`${API_BASE_URL}/publications/statut/${statut}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des publications');
    return response.json();
  },

  async getByAuteur(auteurId) {
    const response = await fetch(`${API_BASE_URL}/publications/auteur/${auteurId}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des publications');
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE_URL}/publications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création de la publication');
    return response.json();
  },

  async update(id, data) {
    const response = await fetch(`${API_BASE_URL}/publications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour de la publication');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/publications/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de la publication');
    return response.json();
  },

  async publier(id) {
    const response = await fetch(`${API_BASE_URL}/publications/${id}/publier`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Erreur lors de la publication');
    return response.json();
  },
};

export default articleRechercheService;
