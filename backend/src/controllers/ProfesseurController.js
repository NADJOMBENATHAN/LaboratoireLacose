const ProfesseurService = require('../services/ProfesseurService');

class ProfesseurController {
    constructor() {
        this.professeurService = ProfesseurService;
    }

    async getAll(req, res) {
        try {
            const professeurs = await this.professeurService.getAllProfesseurs();
            res.json(professeurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const professeur = await this.professeurService.getProfesseurById(req.params.id);
            res.json(professeur);
        } catch (error) {
            if (error.message === 'Professeur non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getBySpecialite(req, res) {
        try {
            const professeurs = await this.professeurService.getProfesseursBySpecialite(req.params.specialite);
            res.json(professeurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByDepartement(req, res) {
        try {
            const professeurs = await this.professeurService.getProfesseursByDepartement(req.params.departement);
            res.json(professeurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByGrade(req, res) {
        try {
            const professeurs = await this.professeurService.getProfesseursByGrade(req.params.grade);
            res.json(professeurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const professeur = await this.professeurService.createProfesseur(req.body);
            res.status(201).json(professeur);
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
            const professeur = await this.professeurService.updateProfesseur(req.params.id, req.body);
            res.json(professeur);
        } catch (error) {
            if (error.message === 'Professeur non trouvé' || error.message === 'Email déjà utilisé') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.professeurService.deleteProfesseur(req.params.id);
            res.json({ message: 'Professeur supprimé' });
        } catch (error) {
            if (error.message === 'Professeur non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = ProfesseurController;
