const SoumissionRepository = require('../repositories/SoumissionRepository');
const EtudiantRepository = require('../repositories/EtudiantRepository');
const TravailPratiqueRepository = require('../repositories/TravailPratiqueRepository');

class SoumissionService {
    constructor() {
        this.soumissionRepository = SoumissionRepository;
        this.etudiantRepository = EtudiantRepository;
        this.travailPratiqueRepository = TravailPratiqueRepository;
    }

    async getAllSoumissions() {
        return await this.soumissionRepository.findAll();
    }

    async getSoumissionById(id) {
        const soumission = await this.soumissionRepository.findById(id);
        if (!soumission) {
            throw new Error('Soumission non trouvée');
        }
        return soumission;
    }

    async getSoumissionsByEtudiant(etudiantId) {
        const etudiant = await this.etudiantRepository.findById(etudiantId);
        if (!etudiant) {
            throw new Error('Étudiant non trouvé');
        }
        return await this.soumissionRepository.findByEtudiant(etudiantId);
    }

    async getSoumissionsByTravailPratique(travailPratiqueId) {
        const tp = await this.travailPratiqueRepository.findById(travailPratiqueId);
        if (!tp) {
            throw new Error('Travail pratique non trouvé');
        }
        return await this.soumissionRepository.findByTravailPratique(travailPratiqueId);
    }

    async createSoumission(data) {
        const { etudiant_id, travail_pratique_id } = data;
        
        const etudiant = await this.etudiantRepository.findById(etudiant_id);
        if (!etudiant) {
            throw new Error('Étudiant non trouvé');
        }
        
        const tp = await this.travailPratiqueRepository.findById(travail_pratique_id);
        if (!tp) {
            throw new Error('Travail pratique non trouvé');
        }
        
        const existing = await this.soumissionRepository.findByEtudiantAndTP(etudiant_id, travail_pratique_id);
        if (existing) {
            throw new Error('Soumission déjà existante pour ce TP');
        }
        
        data.date_soumission = new Date();
        return await this.soumissionRepository.create(data);
    }

    async updateSoumission(id, data) {
        const existing = await this.soumissionRepository.findById(id);
        if (!existing) {
            throw new Error('Soumission non trouvée');
        }
        return await this.soumissionRepository.update(id, data);
    }

    async deleteSoumission(id) {
        const existing = await this.soumissionRepository.findById(id);
        if (!existing) {
            throw new Error('Soumission non trouvée');
        }
        return await this.soumissionRepository.delete(id);
    }
}

module.exports = new SoumissionService();
