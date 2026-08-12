const EvaluationService = require('../services/EvaluationService');
const { NotFoundError, ValidationError } = require('../middleware/errorHandler');

/**
 * Classe EvaluationController
 * Contrôleur pour la gestion des requêtes HTTP liées aux évaluations
 * Gère les routes CRUD et les réponses HTTP appropriées
 */
class EvaluationController {
    constructor() {
        this.evaluationService = EvaluationService;
    }

    /**
     * Méthode getAll
     * Récupère toutes les évaluations
     * @param {Object} req - Requête HTTP
     * @param {Object} res - Réponse HTTP
     */
    async getAll(req, res) {
        const evaluations = await this.evaluationService.getAllEvaluations();
        res.json(evaluations);
    }

    /**
     * Méthode getById
     * Récupère une évaluation par son ID
     * @param {Object} req - Requête HTTP avec paramètre id
     * @param {Object} res - Réponse HTTP
     */
    async getById(req, res) {
        const evaluation = await this.evaluationService.getEvaluationById(req.params.id);
        if (!evaluation) {
            throw new NotFoundError('Évaluation non trouvée');
        }
        res.json(evaluation);
    }

    /**
     * Méthode getBySoumission
     * Récupère les évaluations par soumission
     * @param {Object} req - Requête HTTP avec paramètre soumissionId
     * @param {Object} res - Réponse HTTP
     */
    async getBySoumission(req, res) {
        const evaluations = await this.evaluationService.getEvaluationsBySoumission(req.params.soumissionId);
        res.json(evaluations);
    }

    /**
     * Méthode getByProfesseur
     * Récupère les évaluations par professeur
     * @param {Object} req - Requête HTTP avec paramètre professeurId
     * @param {Object} res - Réponse HTTP
     */
    async getByProfesseur(req, res) {
        const evaluations = await this.evaluationService.getEvaluationsByProfesseur(req.params.professeurId);
        res.json(evaluations);
    }

    /**
     * Méthode create
     * Crée une nouvelle évaluation
     * @param {Object} req - Requête HTTP avec corps de données
     * @param {Object} res - Réponse HTTP
     */
    async create(req, res) {
        const evaluation = await this.evaluationService.createEvaluation(req.body);
        res.status(201).json(evaluation);
    }

    /**
     * Méthode update
     * Met à jour une évaluation existante
     * @param {Object} req - Requête HTTP avec paramètre id et corps de données
     * @param {Object} res - Réponse HTTP
     */
    async update(req, res) {
        const evaluation = await this.evaluationService.updateEvaluation(req.params.id, req.body);
        if (!evaluation) {
            throw new NotFoundError('Évaluation non trouvée');
        }
        res.json(evaluation);
    }

    /**
     * Méthode delete
     * Supprime une évaluation
     * @param {Object} req - Requête HTTP avec paramètre id
     * @param {Object} res - Réponse HTTP
     */
    async delete(req, res) {
        const result = await this.evaluationService.deleteEvaluation(req.params.id);
        if (!result) {
            throw new NotFoundError('Évaluation non trouvée');
        }
        res.json({ message: 'Évaluation supprimée' });
    }
}

module.exports = EvaluationController;
