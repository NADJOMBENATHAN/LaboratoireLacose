const SoumissionService = require('../services/SoumissionService');
const { NotFoundError, ConflictError } = require('../middleware/errorHandler');

class SoumissionController {
    constructor() {
        this.soumissionService = SoumissionService;
    }

    async getAll(req, res) {
        const soumissions = await this.soumissionService.getAllSoumissions();
        res.json(soumissions);
    }

    async getById(req, res) {
        const soumission = await this.soumissionService.getSoumissionById(req.params.id);
        if (!soumission) {
            throw new NotFoundError('Soumission non trouvée');
        }
        res.json(soumission);
    }

    async getByEtudiant(req, res) {
        const soumissions = await this.soumissionService.getSoumissionsByEtudiant(req.params.etudiantId);
        res.json(soumissions);
    }

    async getByTravailPratique(req, res) {
        const soumissions = await this.soumissionService.getSoumissionsByTravailPratique(req.params.tpId);
        res.json(soumissions);
    }

    async create(req, res) {
        const soumission = await this.soumissionService.createSoumission(req.body);
        res.status(201).json(soumission);
    }

    async update(req, res) {
        const soumission = await this.soumissionService.updateSoumission(req.params.id, req.body);
        if (!soumission) {
            throw new NotFoundError('Soumission non trouvée');
        }
        res.json(soumission);
    }

    async delete(req, res) {
        const result = await this.soumissionService.deleteSoumission(req.params.id);
        if (!result) {
            throw new NotFoundError('Soumission non trouvée');
        }
        res.json({ message: 'Soumission supprimée' });
    }
}

module.exports = SoumissionController;
