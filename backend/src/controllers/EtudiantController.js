const EtudiantService = require('../services/EtudiantService');
const { NotFoundError, ConflictError } = require('../middleware/errorHandler');

class EtudiantController {
    constructor() {
        this.etudiantService = EtudiantService;
    }

    async getAll(req, res) {
        const etudiants = await this.etudiantService.getAllEtudiants();
        res.json(etudiants);
    }

    async getById(req, res) {
        const etudiant = await this.etudiantService.getEtudiantById(req.params.id);
        if (!etudiant) {
            throw new NotFoundError('Étudiant non trouvé');
        }
        res.json(etudiant);
    }

    async getByNumero(req, res) {
        const etudiant = await this.etudiantService.getEtudiantByNumero(req.params.numero);
        if (!etudiant) {
            throw new NotFoundError('Étudiant non trouvé');
        }
        res.json(etudiant);
    }

    async getByFiliere(req, res) {
        const etudiants = await this.etudiantService.getEtudiantsByFiliere(req.params.filiere);
        res.json(etudiants);
    }

    async getByNiveau(req, res) {
        const etudiants = await this.etudiantService.getEtudiantsByNiveau(req.params.niveau);
        res.json(etudiants);
    }

    async create(req, res) {
        const etudiant = await this.etudiantService.createEtudiant(req.body);
        res.status(201).json(etudiant);
    }

    async update(req, res) {
        const etudiant = await this.etudiantService.updateEtudiant(req.params.id, req.body);
        if (!etudiant) {
            throw new NotFoundError('Étudiant non trouvé');
        }
        res.json(etudiant);
    }

    async delete(req, res) {
        const result = await this.etudiantService.deleteEtudiant(req.params.id);
        if (!result) {
            throw new NotFoundError('Étudiant non trouvé');
        }
        res.json({ message: 'Étudiant supprimé' });
    }
}

module.exports = new EtudiantController();
