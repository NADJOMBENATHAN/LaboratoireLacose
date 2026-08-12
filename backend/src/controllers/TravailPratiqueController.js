const TravailPratiqueService = require('../services/TravailPratiqueService');
const { NotFoundError } = require('../middleware/errorHandler');

class TravailPratiqueController {
    constructor() {
        this.travailPratiqueService = new TravailPratiqueService();
    }

    async getAll(req, res) {
        const travaux = await this.travailPratiqueService.getAllTravauxPratiques();
        res.json(travaux);
    }

    async getById(req, res) {
        const tp = await this.travailPratiqueService.getTravailPratiqueById(req.params.id);
        if (!tp) {
            throw new NotFoundError('Travail pratique non trouvé');
        }
        res.json(tp);
    }

    async create(req, res) {
        const tp = await this.travailPratiqueService.createTravailPratique(req.body);
        res.status(201).json(tp);
    }

    async update(req, res) {
        const tp = await this.travailPratiqueService.updateTravailPratique(req.params.id, req.body);
        if (!tp) {
            throw new NotFoundError('Travail pratique non trouvé');
        }
        res.json(tp);
    }

    async delete(req, res) {
        const result = await this.travailPratiqueService.deleteTravailPratique(req.params.id);
        if (!result) {
            throw new NotFoundError('Travail pratique non trouvé');
        }
        res.json({ message: 'Travail pratique supprimé' });
    }

    async getByStatut(req, res) {
        const travaux = await this.travailPratiqueService.getTravauxPratiquesByStatut(req.params.statut);
        res.json(travaux);
    }

    async getByProfesseur(req, res) {
        const travaux = await this.travailPratiqueService.getTravauxPratiquesByProfesseur(req.params.professeurId);
        res.json(travaux);
    }
}

module.exports = TravailPratiqueController;
