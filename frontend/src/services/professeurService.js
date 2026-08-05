const API_BASE_URL = 'http://localhost:5000/api';

const professeurService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/professeurs`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des professeurs');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/membres/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération du professeur');
    return response.json();
  },

  async getBySpecialite(specialite) {
    const response = await fetch(`${API_BASE_URL}/professeurs/specialite/${specialite}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des professeurs');
    return response.json();
  },

  async getByDepartement(departement) {
    const response = await fetch(`${API_BASE_URL}/professeurs/departement/${departement}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des professeurs');
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE_URL}/membres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, role: 'professeur' }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création du professeur');
    return response.json();
  },

  async update(id, data) {
    const response = await fetch(`${API_BASE_URL}/membres/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du professeur');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/membres/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression du professeur');
    return response.json();
  },
};

export default professeurService;
