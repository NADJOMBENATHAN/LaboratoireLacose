const API_BASE_URL = 'http://localhost:5000/api';

const partenaireService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/membres`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des partenaires');
    const data = await response.json();
    return data.filter(m => m.role === 'partenaire');
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/membres/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération du partenaire');
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE_URL}/membres`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, role: 'partenaire' }),
    });
    if (!response.ok) throw new Error('Erreur lors de la création du partenaire');
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
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du partenaire');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/membres/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression du partenaire');
    return response.json();
  },
};

export default partenaireService;
