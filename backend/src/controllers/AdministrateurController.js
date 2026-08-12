const AdministrateurService = require('../services/AdministrateurService');
const { NotFoundError, ConflictError } = require('../middleware/errorHandler');

class AdministrateurController {
    constructor() {
        this.administrateurService = AdministrateurService;
    }

    async getAll(req, res) {
        const administrateurs = await this.administrateurService.getAllAdministrateurs();
        res.json(administrateurs);
    }

    async getById(req, res) {
        const utilisateur = await this.administrateurService.getAdministrateurById(req.params.id);
        if (!utilisateur) {
            throw new NotFoundError('Administrateur non trouvé');
        }
        res.json(utilisateur);
    }

    async getByNiveau(req, res) {
        const administrateurs = await this.administrateurService.getAdministrateursByNiveau(req.params.niveau);
        res.json(administrateurs);
    }

    async create(req, res) {
        const administrateur = await this.administrateurService.createAdministrateur(req.body);
        res.status(201).json(administrateur);
    }

    async update(req, res) {
        const administrateur = await this.administrateurService.updateAdministrateur(req.params.id, req.body);
        if (!administrateur) {
            throw new NotFoundError('Administrateur non trouvé');
        }
        res.json(administrateur);
    }

    async delete(req, res) {
        const result = await this.administrateurService.deleteAdministrateur(req.params.id);
        if (!result) {
            throw new NotFoundError('Administrateur non trouvé');
        }
        res.json({ message: 'Administrateur supprimé' });
    }
}

module.exports = new AdministrateurController();
