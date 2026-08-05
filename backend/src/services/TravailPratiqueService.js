const TravailPratiqueRepository = require('../repositories/TravailPratiqueRepository');

class TravailPratiqueService {
    constructor() {
        this.travailPratiqueRepository = new TravailPratiqueRepository();
    }

    async getAllTravauxPratiques() {
        return await this.travailPratiqueRepository.findAllWithDetails();
    }

    async getTravailPratiqueById(id) {
        const tp = await this.travailPratiqueRepository.findById(id);
        if (!tp) {
            throw new Error('Travail pratique non trouvé');
        }
        return tp;
    }

    async createTravailPratique(data) {
        return await this.travailPratiqueRepository.create(data);
    }

    async updateTravailPratique(id, data) {
        const existing = await this.travailPratiqueRepository.findById(id);
        if (!existing) {
            throw new Error('Travail pratique non trouvé');
        }
        return await this.travailPratiqueRepository.update(id, data);
    }

    async deleteTravailPratique(id) {
        const existing = await this.travailPratiqueRepository.findById(id);
        if (!existing) {
            throw new Error('Travail pratique non trouvé');
        }
        return await this.travailPratiqueRepository.delete(id);
    }

    async getTravauxPratiquesByStatut(statut) {
        return await this.travailPratiqueRepository.findByStatut(statut);
    }

    async getTravauxPratiquesByProfesseur(professeurId) {
        return await this.travailPratiqueRepository.findByProfesseur(professeurId);
    }
}

module.exports = TravailPratiqueService;
