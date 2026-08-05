const EvaluationService = require('../services/EvaluationService');

class EvaluationController {
    constructor() {
        this.evaluationService = EvaluationService;
    }

    async getAll(req, res) {
        try {
            const evaluations = await this.evaluationService.getAllEvaluations();
            res.json(evaluations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const evaluation = await this.evaluationService.getEvaluationById(req.params.id);
            res.json(evaluation);
        } catch (error) {
            if (error.message === 'Évaluation non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getBySoumission(req, res) {
        try {
            const evaluations = await this.evaluationService.getEvaluationsBySoumission(req.params.soumissionId);
            res.json(evaluations);
        } catch (error) {
            if (error.message === 'Soumission non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getByProfesseur(req, res) {
        try {
            const evaluations = await this.evaluationService.getEvaluationsByProfesseur(req.params.professeurId);
            res.json(evaluations);
        } catch (error) {
            if (error.message === 'Professeur non trouvé') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async create(req, res) {
        try {
            const evaluation = await this.evaluationService.createEvaluation(req.body);
            res.status(201).json(evaluation);
        } catch (error) {
            if (error.message === 'Soumission non trouvée' || error.message === 'Professeur non trouvé' || error.message === 'La note doit être entre 0 et 20' || error.message === 'Évaluation déjà existante pour cette soumission') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async update(req, res) {
        try {
            const evaluation = await this.evaluationService.updateEvaluation(req.params.id, req.body);
            res.json(evaluation);
        } catch (error) {
            if (error.message === 'Évaluation non trouvée' || error.message === 'La note doit être entre 0 et 20') {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res) {
        try {
            await this.evaluationService.deleteEvaluation(req.params.id);
            res.json({ message: 'Évaluation supprimée' });
        } catch (error) {
            if (error.message === 'Évaluation non trouvée') {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = EvaluationController;
