const ExperienceService = require('../services/ExperienceService');

class ExperienceController {
    constructor() {
        this.experienceService = ExperienceService;
    }

    async getAll(req, res) {
        try {
            const experiences = await this.experienceService.getAllExperiences();
            res.json(experiences);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const experience = await this.experienceService.getExperienceById(req.params.id);
            res.json(experience);
        } catch (error) {
            if (error.message === 'Expérience non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByTravailPratique(req, res) {
        try {
            const experiences = await this.experienceService.getExperiencesByTravailPratique(req.params.tpId);
            res.json(experiences);
        } catch (error) {
            if (error.message === 'Travail pratique non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByDifficulte(req, res) {
        try {
            const experiences = await this.experienceService.getExperiencesByDifficulte(req.params.difficulte);
            res.json(experiences);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const experience = await this.experienceService.createExperience(req.body);
            res.status(201).json(experience);
        } catch (error) {
            if (error.message === 'Travail pratique non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async update(req, res) {
        try {
            const experience = await this.experienceService.updateExperience(req.params.id, req.body);
            res.json(experience);
        } catch (error) {
            if (error.message === 'Expérience non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.experienceService.deleteExperience(req.params.id);
            res.json({ message: 'Expérience supprimée' });
        } catch (error) {
            if (error.message === 'Expérience non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = ExperienceController;
