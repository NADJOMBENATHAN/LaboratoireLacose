const ExperienceRepository = require('../repositories/ExperienceRepository');
const TravailPratiqueRepository = require('../repositories/TravailPratiqueRepository');

class ExperienceService {
    constructor() {
        this.experienceRepository = ExperienceRepository;
        this.travailPratiqueRepository = TravailPratiqueRepository;
    }

    async getAllExperiences() {
        return await this.experienceRepository.findAll();
    }

    async getExperienceById(id) {
        const experience = await this.experienceRepository.findById(id);
        if (!experience) {
            throw new Error('Expérience non trouvée');
        }
        return experience;
    }

    async getExperiencesByTravailPratique(travailPratiqueId) {
        const tp = await this.travailPratiqueRepository.findById(travailPratiqueId);
        if (!tp) {
            throw new Error('Travail pratique non trouvé');
        }
        return await this.experienceRepository.findByTravailPratique(travailPratiqueId);
    }

    async getExperiencesByDifficulte(difficulte) {
        return await this.experienceRepository.findByDifficulte(difficulte);
    }

    async createExperience(data) {
        const { travail_pratique_id } = data;
        
        const tp = await this.travailPratiqueRepository.findById(travail_pratique_id);
        if (!tp) {
            throw new Error('Travail pratique non trouvé');
        }
        
        return await this.experienceRepository.create(data);
    }

    async updateExperience(id, data) {
        const existing = await this.experienceRepository.findById(id);
        if (!existing) {
            throw new Error('Expérience non trouvée');
        }
        return await this.experienceRepository.update(id, data);
    }

    async deleteExperience(id) {
        const existing = await this.experienceRepository.findById(id);
        if (!existing) {
            throw new Error('Expérience non trouvée');
        }
        return await this.experienceRepository.delete(id);
    }
}

module.exports = new ExperienceService();
