const AdministrateurService = require('../services/AdministrateurService');

class AdministrateurController {
    constructor() {
        this.administrateurService = AdministrateurService;
    }

    async getAll(req, res) {
        try {
            const administrateurs = await this.administrateurService.getAllAdministrateurs();
            res.json(administrateurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const utilisateur = await this.administrateurService.getAdministrateurById(req.params.id);
            res.json(utilisateur);
        } catch (error) {
            if (error.message === 'Administrateur non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByNiveau(req, res) {
        try {
            const administrateurs = await this.administrateurService.getAdministrateursByNiveau(req.params.niveau);
            res.json(administrateurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const administrateur = await this.administrateurService.createAdministrateur(req.body);
            res.status(201).json(administrateur);
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
            const administrateur = await this.administrateurService.updateAdministrateur(req.params.id, req.body);
            res.json(administrateur);
        } catch (error) {
            if (error.message === 'Administrateur non trouvé' || error.message === 'Email déjà utilisé') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.administrateurService.deleteAdministrateur(req.params.id);
            res.json({ message: 'Administrateur supprimé' });
        } catch (error) {
            if (error.message === 'Administrateur non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = new AdministrateurController();
