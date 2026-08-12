const UtilisateurService = require('../services/UtilisateurService');
const { NotFoundError, ConflictError } = require('../middleware/errorHandler');

class UtilisateurController {
    constructor() {
        this.utilisateurService = new UtilisateurService();
    }

    async getAll(req, res) {
        const utilisateurs = await this.utilisateurService.getAllUtilisateurs();
        res.json(utilisateurs);
    }

    async getById(req, res) {
        const utilisateur = await this.utilisateurService.getUtilisateurById(req.params.id);
        if (!utilisateur) {
            throw new NotFoundError('Utilisateur non trouvé');
        }
        res.json(utilisateur);
    }

    async create(req, res) {
        const utilisateur = await this.utilisateurService.createUtilisateur(req.body);
        res.status(201).json(utilisateur);
    }

    async update(req, res) {
        const utilisateur = await this.utilisateurService.updateUtilisateur(req.params.id, req.body);
        if (!utilisateur) {
            throw new NotFoundError('Utilisateur non trouvé');
        }
        res.json(utilisateur);
    }

    async delete(req, res) {
        const result = await this.utilisateurService.deleteUtilisateur(req.params.id);
        if (!result) {
            throw new NotFoundError('Utilisateur non trouvé');
        }
        res.json({ message: 'Utilisateur supprimé' });
    }

    async getProfesseurs(req, res) {
        const professeurs = await this.utilisateurService.getProfesseurs();
        res.json(professeurs);
    }

    async getEtudiants(req, res) {
        const etudiants = await this.utilisateurService.getEtudiants();
        res.json(etudiants);
    }

    async getEtudiantsByFiliere(req, res) {
        const etudiants = await this.utilisateurService.getEtudiantsByFiliere(req.params.filiere);
        res.json(etudiants);
    }

    async getEtudiantsByNiveau(req, res) {
        const etudiants = await this.utilisateurService.getEtudiantsByNiveau(req.params.niveau);
        res.json(etudiants);
    }

    async getProfesseursBySpecialite(req, res) {
        const professeurs = await this.utilisateurService.getProfesseursBySpecialite(req.params.specialite);
        res.json(professeurs);
    }

    async getProfesseursByDepartement(req, res) {
        const professeurs = await this.utilisateurService.getProfesseursByDepartement(req.params.departement);
        res.json(professeurs);
    }
}

module.exports = UtilisateurController;
