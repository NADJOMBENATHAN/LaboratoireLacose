const ProfesseurService = require('../services/ProfesseurService');
const { NotFoundError, ConflictError } = require('../middleware/errorHandler');

class ProfesseurController {
    constructor() {
        this.professeurService = ProfesseurService;
    }

    async getAll(req, res) {
        const professeurs = await this.professeurService.getAllProfesseurs();
        res.json(professeurs);
    }

    async getById(req, res) {
        const professeur = await this.professeurService.getProfesseurById(req.params.id);
        if (!professeur) {
            throw new NotFoundError('Professeur non trouvé');
        }
        res.json(professeur);
    }

    async getBySpecialite(req, res) {
        const professeurs = await this.professeurService.getProfesseursBySpecialite(req.params.specialite);
        res.json(professeurs);
    }

    async getByDepartement(req, res) {
        const professeurs = await this.professeurService.getProfesseursByDepartement(req.params.departement);
        res.json(professeurs);
    }

    async getByGrade(req, res) {
        const professeurs = await this.professeurService.getProfesseursByGrade(req.params.grade);
        res.json(professeurs);
    }

    async create(req, res) {
        const professeur = await this.professeurService.createProfesseur(req.body);
        res.status(201).json(professeur);
    }

    async update(req, res) {
        const professeur = await this.professeurService.updateProfesseur(req.params.id, req.body);
        if (!professeur) {
            throw new NotFoundError('Professeur non trouvé');
        }
        res.json(professeur);
    }

    async delete(req, res) {
        const result = await this.professeurService.deleteProfesseur(req.params.id);
        if (!result) {
            throw new NotFoundError('Professeur non trouvé');
        }
        res.json({ message: 'Professeur supprimé' });
    }
}

module.exports = ProfesseurController;
