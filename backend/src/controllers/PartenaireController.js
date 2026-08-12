const PartenaireService = require('../services/PartenaireService');
const { NotFoundError, ConflictError } = require('../middleware/errorHandler');

class PartenaireController {
    constructor() {
        this.partenaireService = PartenaireService;
    }

    async getAll(req, res) {
        const partenaires = await this.partenaireService.getAllPartenaires();
        res.json(partenaires);
    }

    async getById(req, res) {
        const partenaire = await this.partenaireService.getPartenaireById(req.params.id);
        if (!partenaire) {
            throw new NotFoundError('Partenaire non trouvé');
        }
        res.json(partenaire);
    }

    async getByEntreprise(req, res) {
        const partenaires = await this.partenaireService.getPartenairesByEntreprise(req.params.entreprise);
        res.json(partenaires);
    }

    async getByType(req, res) {
        const partenaires = await this.partenaireService.getPartenairesByType(req.params.type);
        res.json(partenaires);
    }

    async create(req, res) {
        const partenaire = await this.partenaireService.createPartenaire(req.body);
        res.status(201).json(partenaire);
    }

    async update(req, res) {
        const partenaire = await this.partenaireService.updatePartenaire(req.params.id, req.body);
        if (!partenaire) {
            throw new NotFoundError('Partenaire non trouvé');
        }
        res.json(partenaire);
    }

    async delete(req, res) {
        const result = await this.partenaireService.deletePartenaire(req.params.id);
        if (!result) {
            throw new NotFoundError('Partenaire non trouvé');
        }
        res.json({ message: 'Partenaire supprimé' });
    }
}

module.exports = PartenaireController;
