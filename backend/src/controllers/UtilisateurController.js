const UtilisateurService = require('../services/UtilisateurService');

class UtilisateurController {
    constructor() {
        this.utilisateurService = new UtilisateurService();
    }

    async getAll(req, res) {
        try {
            const utilisateurs = await this.utilisateurService.getAllUtilisateurs();
            res.json(utilisateurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const utilisateur = await this.utilisateurService.getUtilisateurById(req.params.id);
            res.json(utilisateur);
        } catch (error) {
            if (error.message === 'Utilisateur non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const utilisateur = await this.utilisateurService.createUtilisateur(req.body);
            res.status(201).json(utilisateur);
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
            const utilisateur = await this.utilisateurService.updateUtilisateur(req.params.id, req.body);
            res.json(utilisateur);
        } catch (error) {
            if (error.message === 'Utilisateur non trouvé' || error.message === 'Email déjà utilisé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.utilisateurService.deleteUtilisateur(req.params.id);
            res.json({ message: 'Utilisateur supprimé' });
        } catch (error) {
            if (error.message === 'Utilisateur non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getProfesseurs(req, res) {
        try {
            const professeurs = await this.utilisateurService.getProfesseurs();
            res.json(professeurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getEtudiants(req, res) {
        try {
            const etudiants = await this.utilisateurService.getEtudiants();
            res.json(etudiants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UtilisateurController;
