const API_BASE_URL = 'http://localhost:5000/api';

const travailPratiqueService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/projets`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des projets');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/projets/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération du projet');
    return response.json();
  },

  async getByStatut(statut) {
    const response = await fetch(`${API_BASE_URL}/projets/statut/${statut}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des projets');
    return response.json();
  },

  async getByProfesseur(professeurId) {
    const response = await fetch(`${API_BASE_URL}/projets/professeur/${professeurId}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des projets');
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE_URL}/projets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création du projet');
    return response.json();
  },

  async update(id, data) {
    const response = await fetch(`${API_BASE_URL}/projets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du projet');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/projets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression du projet');
    return response.json();
  },
};

export default travailPratiqueService;
