const API_BASE_URL = 'http://localhost:5000/api';

const etudiantService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/etudiants`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des étudiants');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/membres/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération de l\'étudiant');
    return response.json();
  },

  async getByFiliere(filiere) {
    const response = await fetch(`${API_BASE_URL}/etudiants/filiere/${filiere}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des étudiants');
    return response.json();
  },

  async getByNiveau(niveau) {
    const response = await fetch(`${API_BASE_URL}/etudiants/niveau/${niveau}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des étudiants');
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE_URL}/membres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, role: 'etudiant' }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création de l\'étudiant');
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
    if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'étudiant');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/membres/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression de l\'étudiant');
    return response.json();
  },
};

export default etudiantService;
