const ExperienceService = require('../services/ExperienceService');
const { NotFoundError } = require('../middleware/errorHandler');

/**
 * Classe ExperienceController
 * Contrôleur pour la gestion des requêtes HTTP liées aux expériences
 * Gère les routes CRUD et les réponses HTTP appropriées
 */
class ExperienceController {
    constructor() {
        this.experienceService = ExperienceService;
    }

    /**
     * Méthode getAll
     * Récupère toutes les expériences
     * @param {Object} req - Requête HTTP
     * @param {Object} res - Réponse HTTP
     */
    async getAll(req, res) {
        const experiences = await this.experienceService.getAllExperiences();
        res.json(experiences);
    }

    /**
     * Méthode getById
     * Récupère une expérience par son ID
     * @param {Object} req - Requête HTTP avec paramètre id
     * @param {Object} res - Réponse HTTP
     */
    async getById(req, res) {
        const experience = await this.experienceService.getExperienceById(req.params.id);
        if (!experience) {
            throw new NotFoundError('Expérience non trouvée');
        }
        res.json(experience);
    }

    /**
     * Méthode getByTravailPratique
     * Récupère les expériences par travail pratique
     * @param {Object} req - Requête HTTP avec paramètre tpId
     * @param {Object} res - Réponse HTTP
     */
    async getByTravailPratique(req, res) {
        const experiences = await this.experienceService.getExperiencesByTravailPratique(req.params.tpId);
        res.json(experiences);
    }

    /**
     * Méthode getByDifficulte
     * Récupère les expériences par niveau de difficulté
     * @param {Object} req - Requête HTTP avec paramètre difficulte
     * @param {Object} res - Réponse HTTP
     */
    async getByDifficulte(req, res) {
        const experiences = await this.experienceService.getExperiencesByDifficulte(req.params.difficulte);
        res.json(experiences);
    }

    /**
     * Méthode create
     * Crée une nouvelle expérience
     * @param {Object} req - Requête HTTP avec corps de données
     * @param {Object} res - Réponse HTTP
     */
    async create(req, res) {
        const experience = await this.experienceService.createExperience(req.body);
        res.status(201).json(experience);
    }

    /**
     * Méthode update
     * Met à jour une expérience existante
     * @param {Object} req - Requête HTTP avec paramètre id et corps de données
     * @param {Object} res - Réponse HTTP
     */
    async update(req, res) {
        const experience = await this.experienceService.updateExperience(req.params.id, req.body);
        if (!experience) {
            throw new NotFoundError('Expérience non trouvée');
        }
        res.json(experience);
    }

    /**
     * Méthode delete
     * Supprime une expérience
     * @param {Object} req - Requête HTTP avec paramètre id
     * @param {Object} res - Réponse HTTP
     */
    async delete(req, res) {
        const result = await this.experienceService.deleteExperience(req.params.id);
        if (!result) {
            throw new NotFoundError('Expérience non trouvée');
        }
        res.json({ message: 'Expérience supprimée' });
    }
}

module.exports = ExperienceController;
