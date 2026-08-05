const EtudiantService = require('../services/EtudiantService');

class EtudiantController {
    constructor() {
        this.etudiantService = EtudiantService;
    }

    async getAll(req, res) {
        try {
            const etudiants = await this.etudiantService.getAllEtudiants();
            res.json(etudiants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const etudiant = await this.etudiantService.getEtudiantById(req.params.id);
            res.json(etudiant);
        } catch (error) {
            if (error.message === 'Étudiant non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByNumero(req, res) {
        try {
            const etudiant = await this.etudiantService.getEtudiantByNumero(req.params.numero);
            res.json(etudiant);
        } catch (error) {
            if (error.message === 'Étudiant non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByFiliere(req, res) {
        try {
            const etudiants = await this.etudiantService.getEtudiantsByFiliere(req.params.filiere);
            res.json(etudiants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByNiveau(req, res) {
        try {
            const etudiants = await this.etudiantService.getEtudiantsByNiveau(req.params.niveau);
            res.json(etudiants);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const etudiant = await this.etudiantService.createEtudiant(req.body);
            res.status(201).json(etudiant);
        } catch (error) {
            if (error.message === 'Email déjà utilisé' || error.message === 'Numéro étudiant déjà utilisé') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async update(req, res) {
        try {
            const etudiant = await this.etudiantService.updateEtudiant(req.params.id, req.body);
            res.json(etudiant);
        } catch (error) {
            if (error.message === 'Étudiant non trouvé' || error.message === 'Email déjà utilisé' || error.message === 'Numéro étudiant déjà utilisé') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.etudiantService.deleteEtudiant(req.params.id);
            res.json({ message: 'Étudiant supprimé' });
        } catch (error) {
            if (error.message === 'Étudiant non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = new EtudiantController();
