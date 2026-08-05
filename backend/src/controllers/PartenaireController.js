const PartenaireService = require('../services/PartenaireService');

class PartenaireController {
    constructor() {
        this.partenaireService = PartenaireService;
    }

    async getAll(req, res) {
        try {
            const partenaires = await this.partenaireService.getAllPartenaires();
            res.json(partenaires);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const partenaire = await this.partenaireService.getPartenaireById(req.params.id);
            res.json(partenaire);
        } catch (error) {
            if (error.message === 'Partenaire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByEntreprise(req, res) {
        try {
            const partenaires = await this.partenaireService.getPartenairesByEntreprise(req.params.entreprise);
            res.json(partenaires);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByType(req, res) {
        try {
            const partenaires = await this.partenaireService.getPartenairesByType(req.params.type);
            res.json(partenaires);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const partenaire = await this.partenaireService.createPartenaire(req.body);
            res.status(201).json(partenaire);
        } catch (error) {
            if (error.message === 'Email déjà utilisé') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async update(req, res) {
        try {
            const partenaire = await this.partenaireService.updatePartenaire(req.params.id, req.body);
            res.json(partenaire);
        } catch (error) {
            if (error.message === 'Partenaire non trouvé' || error.message === 'Email déjà utilisé') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.partenaireService.deletePartenaire(req.params.id);
            res.json({ message: 'Partenaire supprimé' });
        } catch (error) {
            if (error.message === 'Partenaire non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = PartenaireController;
