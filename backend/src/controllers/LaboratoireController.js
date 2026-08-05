const LaboratoireService = require('../services/LaboratoireService');

class LaboratoireController {
    constructor() {
        this.laboratoireService = new LaboratoireService();
    }

    async getAll(req, res) {
        try {
            const laboratoires = await this.laboratoireService.getAllLaboratoires();
            res.json(laboratoires);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const laboratoire = await this.laboratoireService.getLaboratoireById(req.params.id);
            res.json(laboratoire);
        } catch (error) {
            if (error.message === 'Laboratoire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const laboratoire = await this.laboratoireService.createLaboratoire(req.body);
            res.status(201).json(laboratoire);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const laboratoire = await this.laboratoireService.updateLaboratoire(req.params.id, req.body);
            res.json(laboratoire);
        } catch (error) {
            if (error.message === 'Laboratoire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.laboratoireService.deleteLaboratoire(req.params.id);
            res.json({ message: 'Laboratoire supprimé' });
        } catch (error) {
            if (error.message === 'Laboratoire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = LaboratoireController;
