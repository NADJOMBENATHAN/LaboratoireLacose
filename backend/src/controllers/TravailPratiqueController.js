const TravailPratiqueService = require('../services/TravailPratiqueService');

class TravailPratiqueController {
    constructor() {
        this.travailPratiqueService = new TravailPratiqueService();
    }

    async getAll(req, res) {
        try {
            const travaux = await this.travailPratiqueService.getAllTravauxPratiques();
            res.json(travaux);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const tp = await this.travailPratiqueService.getTravailPratiqueById(req.params.id);
            res.json(tp);
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
            const tp = await this.travailPratiqueService.createTravailPratique(req.body);
            res.status(201).json(tp);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const tp = await this.travailPratiqueService.updateTravailPratique(req.params.id, req.body);
            res.json(tp);
        } catch (error) {
            if (error.message === 'Travail pratique non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.travailPratiqueService.deleteTravailPratique(req.params.id);
            res.json({ message: 'Travail pratique supprimé' });
        } catch (error) {
            if (error.message === 'Travail pratique non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByStatut(req, res) {
        try {
            const travaux = await this.travailPratiqueService.getTravauxPratiquesByStatut(req.params.statut);
            res.json(travaux);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByProfesseur(req, res) {
        try {
            const travaux = await this.travailPratiqueService.getTravauxPratiquesByProfesseur(req.params.professeurId);
            res.json(travaux);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = TravailPratiqueController;
