const LaboratoireService = require('../services/LaboratoireService');
const { NotFoundError } = require('../middleware/errorHandler');

class LaboratoireController {
    constructor() {
        this.laboratoireService = new LaboratoireService();
    }

    async getAll(req, res) {
        const laboratoires = await this.laboratoireService.getAllLaboratoires();
        res.json(laboratoires);
    }

    async getById(req, res) {
        const laboratoire = await this.laboratoireService.getLaboratoireById(req.params.id);
        if (!laboratoire) {
            throw new NotFoundError('Laboratoire non trouvé');
        }
        res.json(laboratoire);
    }

    async create(req, res) {
        const laboratoire = await this.laboratoireService.createLaboratoire(req.body);
        res.status(201).json(laboratoire);
    }

    async update(req, res) {
        const laboratoire = await this.laboratoireService.updateLaboratoire(req.params.id, req.body);
        if (!laboratoire) {
            throw new NotFoundError('Laboratoire non trouvé');
        }
        res.json(laboratoire);
    }

    async delete(req, res) {
        const result = await this.laboratoireService.deleteLaboratoire(req.params.id);
        if (!result) {
            throw new NotFoundError('Laboratoire non trouvé');
        }
        res.json({ message: 'Laboratoire supprimé' });
    }
}

module.exports = LaboratoireController;
