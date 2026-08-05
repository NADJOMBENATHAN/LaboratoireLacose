const SoumissionService = require('../services/SoumissionService');

class SoumissionController {
    constructor() {
        this.soumissionService = SoumissionService;
    }

    async getAll(req, res) {
        try {
            const soumissions = await this.soumissionService.getAllSoumissions();
            res.json(soumissions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const soumission = await this.soumissionService.getSoumissionById(req.params.id);
            res.json(soumission);
        } catch (error) {
            if (error.message === 'Soumission non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByEtudiant(req, res) {
        try {
            const soumissions = await this.soumissionService.getSoumissionsByEtudiant(req.params.etudiantId);
            res.json(soumissions);
        } catch (error) {
            if (error.message === 'Étudiant non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByTravailPratique(req, res) {
        try {
            const soumissions = await this.soumissionService.getSoumissionsByTravailPratique(req.params.tpId);
            res.json(soumissions);
        } catch (error) {
            if (error.message === 'Travail pratique non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const soumission = await this.soumissionService.createSoumission(req.body);
            res.status(201).json(soumission);
        } catch (error) {
            if (error.message === 'Étudiant non trouvé' || error.message === 'Travail pratique non trouvé' || error.message === 'Soumission déjà existante pour ce TP') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async update(req, res) {
        try {
            const soumission = await this.soumissionService.updateSoumission(req.params.id, req.body);
            res.json(soumission);
        } catch (error) {
            if (error.message === 'Soumission non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.soumissionService.deleteSoumission(req.params.id);
            res.json({ message: 'Soumission supprimée' });
        } catch (error) {
            if (error.message === 'Soumission non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = SoumissionController;
