const API_BASE_URL = 'http://localhost:5000/api';

const laboratoireService = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/laboratoires`);
    if (!response.ok) throw new Error('Erreur lors de la récupération des laboratoires');
    return response.json();
  },

  async getById(id) {
    const response = await fetch(`${API_BASE_URL}/laboratoires/${id}`);
    if (!response.ok) throw new Error('Erreur lors de la récupération du laboratoire');
    return response.json();
  },

  async create(data) {
    const response = await fetch(`${API_BASE_URL}/laboratoires`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la création du laboratoire');
    return response.json();
  },

  async update(id, data) {
    const response = await fetch(`${API_BASE_URL}/laboratoires/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Erreur lors de la mise à jour du laboratoire');
    return response.json();
  },

  async delete(id) {
    const response = await fetch(`${API_BASE_URL}/laboratoires/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erreur lors de la suppression du laboratoire');
    return response.json();
  },
};

export default laboratoireService;
